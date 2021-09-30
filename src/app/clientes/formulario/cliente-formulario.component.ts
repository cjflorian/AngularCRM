import { Component, Directive, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientesService } from 'src/app/services/clientes.service';
import Swal from 'sweetalert2';
import {  Subscription } from 'rxjs';
import { TipoclientesService } from 'src/app/services/tipoclientes.service';

declare var $: any;

@Component({
  selector: 'app-cliente-formulario',
  templateUrl: './cliente-formulario.component.html',
  styleUrls: ['./cliente-formulario.component.css'],
})



export class ClienteFormularioComponent implements OnInit {
  formNewCliente: FormGroup;
  myMethodSubs: Subscription = new Subscription;
  myNewMethodSubs: Subscription = new Subscription;
  isShowCreate: boolean = true ; // hidden by default
  isShowEdit: boolean = false ; // hidden by default
  arrClientes: any[];
  arrTipoClientes: any[];
  


  constructor(private clienteService: ClientesService, private tipoclienteService: TipoclientesService, private router: Router) { 
    this.arrClientes = [];
    this.arrTipoClientes = [];
    this.isShowCreate = true;
    this.isShowEdit = false;
    
    this.formNewCliente =  new FormGroup({
      id: new FormControl(''),
      nombre: new FormControl('',[
        Validators.required
      ]),
      apellido: new FormControl('',[
        Validators.required
      ]),
      email: new FormControl('',[
        Validators.required
      ]),
      tipo_cliente_id: new FormControl('',[
        Validators.required
      ])
    });
    
  }


  ngOnInit(): void {
    this.myMethodSubs = this.clienteService.invokeMyMethod.subscribe(res => {
      console.log(res);
      this.methodToBeCalled(res);
    });
    
    this.tipoclienteService.getAll()
    .then(clientes => this.arrTipoClientes = clientes)
    .catch(error => console.log(console.error(error)));
  }

  async methodToBeCalled(id:any){
    //what needs to done
    this.isShowCreate = false;
    this.isShowEdit = true;
    try{
      const cliente = await this.clienteService.getById(id);
      
      this.formNewCliente = new FormGroup({
        id: new FormControl(cliente.id,[
          Validators.required
        ]),
        nombre: new FormControl(cliente.nombre,[
          Validators.required
        ]),
        apellido: new FormControl(cliente.apellido),
        email: new FormControl(cliente.email,[
          Validators.required
        ]),
        tipo_cliente_id: new FormControl(cliente.tipo_cliente_id,[
          Validators.required
        ])
      });
     console.log(cliente);
        }
    catch(error){
      console.log(error);
      }
    }

  
  public onSubmit(): void{
    console.log(this.formNewCliente.value);
    this.clienteService.create(this.formNewCliente.value).then(function(res:any){
      Swal.fire('Creado con exito','Dato', 'success');
      
    })
    .catch(error => {
      console.log(error);
      Swal.fire('Error: '+error.error.mensaje,error.error.error, 'error');
    });
    this.clienteService.callMyNewMethod();
    //this.formNewCliente.reset();
    //$('#myModalInsert').modal('hide');
    this.router.navigate(['/clientes']);
  }

  keyword = 'name';
  
 
  public countries = [
    {
      id: 1,
      name: 'Albania',
    },
    {
      id: 2,
      name: 'Belgium',
    },
    {
      id: 3,
      name: 'Denmark',
    },
    {
      id: 4,
      name: 'Montenegro',
    },
    {
      id: 5,
      name: 'Turkey',
    },
    {
      id: 6,
      name: 'Ukraine',
    },
    {
      id: 7,
      name: 'Macedonia',
    },
    {
      id: 8,
      name: 'Slovenia',
    },
    {
      id: 9,
      name: 'Georgia',
    },
    {
      id: 10,
      name: 'India',
    },
    {
      id: 11,
      name: 'Russia',
    },
    {
      id: 12,
      name: 'Switzerland',
    }
  ];
    selectEvent(item:any) {
    // do something with selected item
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e:any) {
    // do something
  }


  onClickModificar(){
    console.log(this.formNewCliente.value);
    this.clienteService.update(this.formNewCliente.value).then(function(res:any){
      Swal.fire('Modificado con exito','Dato', 'success');
    })
    .catch(error => {
      console.log(error);
      Swal.fire('Error: '+error.error.mensaje,error.error.error, 'error');
    });
    this.clienteService.callMyNewMethod();
    this.formNewCliente.reset();
    $('#myModalInsert').modal('hide');
    
    
  }


}
