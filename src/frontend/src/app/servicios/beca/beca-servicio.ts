import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBeca } from './IBeca';
import { Cantidad } from '../dto/Cantidad';
import { NombreCantidad } from '../dto/NombreCantidad';

@Injectable({
  providedIn: 'root',
})
export class BecaServicio {
  private baseURL="http://localhost:8080/api/v1/public/becas";

  constructor(private HttpClient: HttpClient){}

  obtenerListaDeBeca(): Observable<IBeca[]>{
    return this.HttpClient.get<IBeca[]>(`${this.baseURL}`);
  }

  obtenerCantidadBeca(): Observable<Cantidad>{
    return this.HttpClient.get<Cantidad>(this.baseURL+'-cantidad');
  }

  obtenerTipoBecaCantidad(): Observable<NombreCantidad[]>{
    return this.HttpClient.get<NombreCantidad[]>(this.baseURL+'-tipo-cantidad');
  }

  obtenerOrigenBecaCantidad(): Observable<NombreCantidad[]>{
    return this.HttpClient.get<NombreCantidad[]>(this.baseURL+'-origen-cantidad');
  }

  obtenerBecaUniversidadCantidad(): Observable<NombreCantidad[]>{
    return this.HttpClient.get<NombreCantidad[]>(this.baseURL+'-universidad-cantidad');
  }

  registrarBeca(beca: IBeca): Observable<Object>{
    return this.HttpClient.post(`${this.baseURL}`,beca);
  }

  actualizarBeca(id: number, beca: IBeca): Observable<Object>{
    return this.HttpClient.put(`${this.baseURL}/${id}`,beca);
  }

  obtenerBecaPorId(id: number): Observable<IBeca>{
    return this.HttpClient.get<IBeca>(`${this.baseURL}/${id}`);
  }

  eliminarBeca(id: number): Observable<Object>{
    return this.HttpClient.delete(`${this.baseURL}/${id}`);
  }
}
