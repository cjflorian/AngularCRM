
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formNewLogin: FormGroup;

  constructor(private loginService: LoginService) { 
    
    this.formNewLogin =  new FormGroup({
      id: new FormControl(''),
      username: new FormControl('',[
        Validators.required
      ]),
      password: new FormControl('',[
        Validators.required
      ])
    });
    
  }

  ngOnInit(): void {
    alert("HOLA");
  }

  onClickIngresar(): void{
    console.log(this.formNewLogin.value);
    this.loginService.login(this.formNewLogin.value).then(function(res:any){
      console.log(res);
      Swal.fire('Login Exitoso','Dato', 'success');
      
    })
    .catch(error => {
      console.log(error);
      Swal.fire('Error: '+error.error.mensaje,error.error.error, 'error');
    });
  }


}
