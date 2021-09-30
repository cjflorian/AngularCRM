import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersonajesService {

  baseUrl: string;

  constructor(private httpClient: HttpClient) { 
    this.baseUrl = 'https://rickandmortyapi.com/api'
  }
  getAll(pPage = 1): Promise<any>{
    return this.httpClient.get<any>(`${this.baseUrl}/character?page=${pPage}`).toPromise();
  }
}
