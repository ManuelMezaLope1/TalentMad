import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Historial } from './Historial';

@Injectable({
  providedIn: 'root',
})
export class HistorialServicio {
  private baseUrl = "http://localhost:8080/api/v1/private/historial";

  token = localStorage.getItem('token');

  constructor(private http: HttpClient) { }

  registrarHistorial(historial: Historial): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, historial,
      {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      });
  }

  obtenerHistoriales(): Observable<Historial[]> {
    return this.http.get<Historial[]>(`${this.baseUrl}`,
      {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      });
  }

  obtenerHistorialPorId(id: number): Observable<Historial> {
    return this.http.get<Historial>(`${this.baseUrl}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      });
  }
}
