import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUniversidad } from './IUniversidad';

@Injectable({
  providedIn: 'root',
})
export class UniversidadServicio {
  private baseURL="http://localhost:8080/api/v1/public/universidad";

  constructor(private HttpClient: HttpClient){}

  obtenerListaDeUniversidad(): Observable<IUniversidad[]>{
    return this.HttpClient.get<IUniversidad[]>(`${this.baseURL}`);
  }

  registrarUniversidad(universidad: IUniversidad): Observable<Object>{
    return this.HttpClient.post(`${this.baseURL}`,universidad);
  }

  actualizarUniversidad(id: number, universidad: IUniversidad): Observable<Object>{
    return this.HttpClient.put(`${this.baseURL}/${id}`,universidad);
  }

  obtenerUniversidadPorId(id: number): Observable<IUniversidad>{
    return this.HttpClient.get<IUniversidad>(`${this.baseURL}/${id}`);
  }

  eliminarUniversidad(id: number): Observable<Object>{
    return this.HttpClient.delete(`${this.baseURL}/${id}`);
  }
}
