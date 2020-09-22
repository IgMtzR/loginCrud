import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inventario } from '../models/Inventario';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  private API_URL = "http://localhost:8080/api/inventario";
   
  constructor(private http: HttpClient) { }

  getAll(): Observable<Inventario[]>{
    return this.http.get<Inventario[]>(`${this.API_URL}/getAllInventario`);
  }

  getOne( id: number|string): Observable<Inventario>{
    return this.http.get<Inventario>(`${this.API_URL}/getOneByIdInventario/${id}`);
  }

  getOneByCode(code: string): Observable<Inventario>{
    return this.http.get<Inventario>(`${this.API_URL}/getOneByCodeInventario${code}`);
  }

  save(inventario: Inventario): Observable<any>{
    return this.http.post<any>(`${this.API_URL}/create-Inventario`, inventario);
  }

  update(id: number|string, inventario: Inventario): Observable<any>{
    return this.http.put<any>(`${this.API_URL}/update-Inventario/${id}`, inventario);
  }

  delete(id: number|string): Observable<any>{
    return this.http.delete<any>(`${this.API_URL}/delete-Inventario/${id}`);
  }

}
