import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUniversidadCarrera } from './IUniversidadCarrera';
import { IUniversidad } from '../universidad/IUniversidad';

@Injectable({
  providedIn: 'root',
})
export class UniversidadCarreraServicio {
  private url = "http://localhost:8080/api/v1/public/universidad-carrera";
  private urlLote="http://localhost:8080/api/v1/public/universidad-carrera/lote";
  private urlCarrera="http://localhost:8080/api/v1/public/carrera-universidad/lote";

  constructor(private http: HttpClient) { }

  guardarLote(relaciones: any[]) {
    return this.http.post(
      this.url + '/lote',
      relaciones
    );
  }

  obtenerPorUniversidadId(id: number): Observable<IUniversidadCarrera[]>{
    return this.http.get<IUniversidadCarrera[]>(`${this.urlLote}/${id}`);
  }

  obtenerPorCarreraId(id: number): Observable<IUniversidadCarrera[]>{
    return this.http.get<IUniversidadCarrera[]>(`${this.urlCarrera}/${id}`);
  }
}
