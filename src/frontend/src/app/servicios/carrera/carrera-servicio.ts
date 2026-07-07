import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICarrera } from './ICarrera';

@Injectable({
  providedIn: 'root',
})
export class CarreraServicio {
  private baseURL="http://localhost:8080/api/v1/public/carreras";

  constructor(private HttpClient: HttpClient){}

  obtenerListaDeCarrera(): Observable<ICarrera[]>{
    return this.HttpClient.get<ICarrera[]>(`${this.baseURL}`);
  }

  registrarCarrera(formData: FormData): Observable<Object>{
    return this.HttpClient.post(`${this.baseURL}`,formData);
  }

  actualizarCarrera(id: number, formData: FormData): Observable<Object>{
    return this.HttpClient.put(`${this.baseURL}/${id}`, formData);
  }

  obtenerCarreraPorId(id: number): Observable<ICarrera>{
    return this.HttpClient.get<ICarrera>(`${this.baseURL}/${id}`);
  }

  eliminarCarrera(id: number): Observable<Object>{
    return this.HttpClient.delete(`${this.baseURL}/${id}`);
  }
}
