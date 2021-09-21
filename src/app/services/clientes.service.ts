import { Injectable,EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Clientes } from '../models/cliente.module';
import { BehaviorSubject, Observable } from 'rxjs';
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

  getById(pId: number): Promise<any> { // UN UNICO OBJETO
    return this.httpClient.get<any>(`${this.baseUrl}/${pId}`).toPromise();

  }

  create(cliente: any): Promise<any[]>{
    const bodyRequest = cliente;
    return this.httpClient.post<any>(this.baseUrl, bodyRequest).toPromise();
  }

  update(cliente: any): Promise<any[]>{
    const bodyRequest = cliente;
    const id = cliente.id;
    return this.httpClient.put<any>(`${this.baseUrl}/${id}`, bodyRequest).toPromise();
  }


  delete(pId: number): Promise<any[]>{
    return this.httpClient.delete<any>(`${this.baseUrl}/${pId}`).toPromise();
  }

  callMyMethod(params: any) {
    this.invokeMyMethod.emit(params);
  }

  callMyNewMethod() {
    this.invokeMyNewMethod.emit();
  }
}
