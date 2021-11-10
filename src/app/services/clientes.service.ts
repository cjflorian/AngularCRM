import { Injectable,EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Clientes } from '../models/cliente.module';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  invokeMyMethod = new EventEmitter();
  invokeMyNewMethod = new EventEmitter();
  baseUrl: string;
  cliente: Clientes[];
  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'https://api-rest-spring01.herokuapp.com/api/clientes';
    //this.baseUrl = 'http://localhost:8080/api/clientes';
    this.cliente =[]; 
   }//inyeccion de cliente

   changeMessage(message: string) {
    this.messageSource.next(message)
  }


   getAll(): Promise<any[]>{
    return this.httpClient.get<any[]>(this.baseUrl).toPromise();
  }

  //observable
  getById(pId: number): Promise<any> { // UN UNICO OBJETO
    return this.httpClient.get<any>(`${this.baseUrl}/${pId}`).toPromise();

  }


  create(cliente: any): Promise<any[]>{
    const bodyRequest = cliente;
    let session:any = localStorage.getItem('user');
    let token = JSON.parse(session);
    let tokenFormat = 'Bearer '+token["token"]
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':tokenFormat
      })
    }
    return this.httpClient.post<any>(this.baseUrl, bodyRequest, httpOptions).toPromise();
  }

  update(cliente: any): Promise<any[]>{
    const bodyRequest = cliente;
    let session:any = localStorage.getItem('user');
    let token = JSON.parse(session);
    let tokenFormat = 'Bearer '+token["token"]
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':tokenFormat
      })
    }
    const id = cliente.id;
    const result = this.httpClient.put<any>(`${this.baseUrl}/${id}`, bodyRequest,  httpOptions).toPromise();
    return result;
  }


  delete(pId: number): Promise<any[]>{
    let session:any = localStorage.getItem('user');
    let token = JSON.parse(session);
    let tokenFormat = 'Bearer '+token["token"]
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':tokenFormat
      })
    }
    return this.httpClient.delete<any>(`${this.baseUrl}/${pId}`,  httpOptions).toPromise();
  }

  callMyMethod(params: any) {
    this.invokeMyMethod.emit(params);
  }

  callMyNewMethod() {
    this.invokeMyNewMethod.emit();
  }
}
function catchError(arg0: (e: any) => void): import("rxjs").OperatorFunction<Clientes, Clientes> {
  throw new Error('Function not implemented.');
}

