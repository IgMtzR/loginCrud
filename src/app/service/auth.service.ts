import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtDto } from '../models/JwtDto';
import { Login } from '../models/Login';
import { Usuario } from '../models/Usuario';

const AUTH_URL = "http://localhost:8080/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public addUser(usuario: Usuario): Observable<any>{
    return this.http.post<any>(`${AUTH_URL}/create-user`, usuario);
  }

  public LoginUser(login: Login): Observable<JwtDto>{
    return this.http.post<JwtDto>(`${AUTH_URL}/login`, login);
  }
}