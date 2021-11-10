import { Component, Input, OnInit } from '@angular/core';
import { Clientes } from '../models/cliente.module';
import { ClientesService } from '../services/clientes.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClienteFormularioComponent } from './formulario/cliente-formulario.component';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
 
})
export class ClienteComponent implements OnInit {
  message: string;
  arrClientes: any[];
  closeResult = '';
  cliente: Clientes[];
  @Input () id: number;
  @Input () nombre: string;
  @Input () apellido: string;
  @Input () email: string;
  @Input () createAt: Date;
  @Input () tipoClienteId: number;
  @Input () nombreCliente: string;
  myNewMethodSubs: Subscription = new Subscription;
  isLogin: boolean = false; // hidden by default

  constructor(private clienteService: ClientesService, private modalService: NgbModal,  private router: Router) { 
    this.arrClientes = [];
    this.cliente = [];
    this.id = 0;
    this.nombre = "";
    this.apellido = "";
    this.email = "";
    this.createAt = new Date;
    this.tipoClienteId = 0;
    this.nombreCliente = "";
    this.message = "";

    this.clienteService.currentMessage.subscribe(message => this.message = message);
  }

  async ngOnInit(){

    let session = localStorage.getItem('user');
    console.log("comp"+session);
      if(session!==null)
      {
        this.isLogin==true;
        await this.ngLoad();

        this.myNewMethodSubs = this.clienteService.invokeMyNewMethod.subscribe(res => {
          this.ngLoad();
        });
      }
      else
      {
        this.isLogin==false 
        this.router.navigate(['login']);
      } 
    
  }

  async ngLoad() {
    await this.clienteService.getAll()
    .then(clientes => {
      console.log(clientes);
      this.arrClientes = clientes
    })
    .catch(error => console.log(console.error(error)));
  }


  onClickEliminar(id:any){
    if(confirm("Are you sure to delete" + id)) {
      this.clienteService.delete(id);
      this.ngLoad();
    }
    
  }

  onClickModificar(id:any){
    this.clienteService.callMyMethod(id);
  }

  async onClickDetalle(id:any){
    try{
      const cliente = await this.clienteService.getById(id);
      console.log(cliente);
      this.id = cliente.id;
      this.nombre = cliente.nombre;
      this.apellido = cliente.apellido;
      this.email = cliente.email;
      this.createAt = cliente.createAt;
      this.tipoClienteId = cliente.tipocliente.nombre;
        }
    catch(error){
      console.log(error);
      }
    }

    open() {
      const modalRef = this.modalService.open(ClienteFormularioComponent, { windowClass: 'dark-modal' });
      modalRef.componentInstance.name = 'World';
    }

}
