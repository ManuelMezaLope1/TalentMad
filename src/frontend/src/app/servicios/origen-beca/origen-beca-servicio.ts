import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoUniversidad } from '../tipouniversidad/TipoUniversidad';

@Injectable({
  providedIn: 'root',
})
export class OrigenBecaServicio {
  private baseUrl="http://localhost:8080/api/v1/public/origen-beca"

  constructor(private http: HttpClient){}

  obtenerTodosLosOrigenesBeca(): Observable<TipoUniversidad[]>{
    return this.http.get<TipoUniversidad[]>(`${this.baseUrl}`);
  }

  registrarOrigenBeca(origenBeca: TipoUniversidad): Observable<Object>{
    return this.http.post(`${this.baseUrl}`, origenBeca);
  }

  obtenerOrigenBecaPorId(id: number): Observable<TipoUniversidad>{
    return this.http.get<TipoUniversidad>(`${this.baseUrl}/${id}`);
  }

  actualizarOrigenBeca(id: number, origenBeca: TipoUniversidad): Observable<Object>{
    return this.http.put(`${this.baseUrl}/${id}`,origenBeca);
  }
}
