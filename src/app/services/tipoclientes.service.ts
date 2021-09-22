import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoClientes } from '../models/tipoclientes.module';

@Injectable({
  providedIn: 'root'
})
export class TipoclientesService {
  baseUrl: string;
  tipocliente: TipoClientes[];

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'https://api-rest-spring01.herokuapp.com/api/tipoclientes';
    this.tipocliente =[]; 
   }

   getAll(): Promise<any[]>{
    return this.httpClient.get<any[]>(this.baseUrl).toPromise();
  }

  //observable
  getById(pId: number): Promise<any> { // UN UNICO OBJETO
    return this.httpClient.get<any>(`${this.baseUrl}/${pId}`).toPromise();

  }

  create(tipocliente: any): Promise<any[]>{
    const bodyRequest = tipocliente;
    return this.httpClient.post<any>(this.baseUrl, bodyRequest).toPromise();
  }

  update(tipocliente: any): Promise<any[]>{
    const bodyRequest = tipocliente;
    const id = tipocliente.id;
    const result = this.httpClient.put<any>(`${this.baseUrl}/${id}`, bodyRequest).toPromise();
    return result;
  }


  delete(pId: number): Promise<any[]>{
    debugger;
    return this.httpClient.delete<any>(`${this.baseUrl}/${pId}`).toPromise();
  }
}
