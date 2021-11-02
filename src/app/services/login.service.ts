import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Authorities } from '../models/authorities.module';
import { Users } from '../models/user.module';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl: string;
  user: Users[];
  autorithies: Authorities[];

  constructor(private httpClient: HttpClient) { 
    this.baseUrl = 'https://api-rest-spring01.herokuapp.com/api/login';
    this.user = [];
    this.autorithies = [];

  }

  login(user: any): Promise<any[]>{
    const bodyRequest = user;
    return this.httpClient.post<any>(this.baseUrl, bodyRequest).toPromise();
  }
}
