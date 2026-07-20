import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICarrera } from './ICarrera';
import { Cantidad } from '../dto/Cantidad';
import { NombreCantidad } from '../dto/NombreCantidad';
import { RankingCantidad } from '../dto/RankingCantidad';
import { UniversidadCarreraPromedio } from '../dto/UniversidadCarreraPromedio';
import { NombreTipoCantidad } from '../dto/NombreTipoCantidad';

@Injectable({
  providedIn: 'root',
})
export class CarreraServicio {
  private baseURL = "http://localhost:8080/api/v1/public/carreras";

  constructor(private HttpClient: HttpClient) { }

  obtenerListaDeCarrera(): Observable<ICarrera[]> {
    return this.HttpClient.get<ICarrera[]>(`${this.baseURL}`);
  }

  obtenerCantidadCarrera(): Observable<Cantidad> {
    return this.HttpClient.get<Cantidad>(this.baseURL + '-cantidad');
  }

  obtenerTipoCarreraCantidad(): Observable<NombreCantidad[]> {
    return this.HttpClient.get<NombreCantidad[]>(this.baseURL + '-tipo-cantidad');
  }

  obtenerCarreraUniversidadCantidad(): Observable<NombreTipoCantidad[]> {
    return this.HttpClient.get<NombreTipoCantidad[]>(this.baseURL + '-universidad-cantidad');
  }

  obtenerTipoCarreraUniversidadCantidad(): Observable<NombreCantidad[]> {
    return this.HttpClient.get<NombreCantidad[]>(this.baseURL + '-tipo-universidad-cantidad');
  }

  obtenerCarrerasRankingCantidad(): Observable<RankingCantidad[]> {
    return this.HttpClient.get<RankingCantidad[]>(this.baseURL + '-ranking-cantidad');
  }

  obtenerRankingPromedio(carrera: string): Observable<UniversidadCarreraPromedio[]> {
    return this.HttpClient.get<UniversidadCarreraPromedio[]>(this.baseURL + '-universidad-ranking-promedio',
      {
        params: {
          carrera: carrera
        }
      });
  }

  obtenerTotalPromedio(carrera: string): Observable<UniversidadCarreraPromedio[]> {
    return this.HttpClient.get<UniversidadCarreraPromedio[]>(this.baseURL + '-universidad-total-promedio',
      {
        params: {
          carrera: carrera
        }
      });
  }

  registrarCarrera(formData: FormData): Observable<Object> {
    return this.HttpClient.post(`${this.baseURL}`, formData);
  }

  actualizarCarrera(id: number, formData: FormData): Observable<Object> {
    return this.HttpClient.put(`${this.baseURL}/${id}`, formData);
  }

  obtenerCarreraPorId(id: number): Observable<ICarrera> {
    return this.HttpClient.get<ICarrera>(`${this.baseURL}/${id}`);
  }

  eliminarCarrera(id: number): Observable<Object> {
    return this.HttpClient.delete(`${this.baseURL}/${id}`);
  }
}
