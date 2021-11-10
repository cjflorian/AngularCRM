
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formNewLogin: FormGroup;

  constructor(private loginService: LoginService, private router: Router) { 
    
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
    let session = localStorage.getItem('user');
    console.log(session);
    if(session!==null)
    {
      let datos =  JSON.parse(session);
      alert('logeado como '+ datos.username)
      this.router.navigate(['/principal']);
    }
    else
      alert('bienvenido logueate')
  }

  onClickIngresar(): void{
    console.log(this.formNewLogin.value);
    let username = this.formNewLogin.value.username;
    let login = false;
    Swal.showLoading();
    this.loginService.login(this.formNewLogin.value).then(function(res:any){
      console.log(res);
      Swal.hideLoading();
      Swal.fire('Login Exitoso','Dato', 'success');
      localStorage.setItem('user', JSON.stringify({ token: res.token, username: username}));
      login = true;
    })
    .catch(error => {
      console.log(error);
      Swal.fire('Error: '+error.error.mensaje,error.error.error, 'error');
    });
    if(login){
      this.router.navigate(['principal']);
    }

          
  }


}
