import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './clientes/cliente.component';
import { ClienteFormularioComponent } from './clientes/formulario/cliente-formulario.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { PersonajesComponent } from './personajes/personajes.component';
import { PrincipalComponent } from './principal/principal.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/principal'},
  {path: 'principal', component:PrincipalComponent},
  {path: 'login', component:LoginComponent},
  {path: 'clientes', component:ClienteComponent},
  {path: 'clientesformulario', component:ClienteFormularioComponent},
  {path: 'personajes', component:PersonajesComponent},
  {path: 'logout', component:LogoutComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  isLogin: boolean = false; // hidden by default
  
  ngOnInit(): void {
    let session = localStorage.getItem('user');
    console.log("comp"+session);
    if(session!==null)
    {
      this.isLogin==true 
    }
    else
    this.isLogin==false 
    }
}
