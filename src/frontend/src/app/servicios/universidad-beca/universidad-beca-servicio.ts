import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBeca } from '../beca/IBeca';
import { Observable } from 'rxjs';
import { IUniversidadBeca } from './IUniversidadBeca';

@Injectable({
  providedIn: 'root',
})
export class UniversidadBecaServicio {
  private url = "http://localhost:8080/api/v1/public/universidad-beca";
  private urlId="http://localhost:8080/api/v1/public/universidad-beca/lote"

  constructor(private http: HttpClient) { }

  guardarLote(relaciones: any[]) {
    console.log(this.url + '/lote');
    return this.http.post(
      this.url + '/lote',
      relaciones
    );
  }

  obtenerBecasPorUniversidad(nombre: string): Observable<IBeca[]>{
    return this.http.get<IBeca[]>(`${this.url}`,
      {
        params: {
          nombre: nombre
        }
      }
    );
  }

  obtenerPorUniversidadId(id: number): Observable<IUniversidadBeca[]>{
    return this.http.get<IUniversidadBeca[]>(`${this.urlId}/${id}`);
  }
}
