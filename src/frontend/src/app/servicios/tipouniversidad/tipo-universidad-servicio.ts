import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoUniversidad } from './TipoUniversidad';

@Injectable({
  providedIn: 'root',
})
export class TipoUniversidadServicio {
  private baseUrl="http://localhost:8080/api/v1/public/tipo-universidad";

  constructor(private HttpClient: HttpClient){}

  obtenerListaDeTipoDeUniversidad(): Observable<TipoUniversidad[]>{
    return this.HttpClient.get<TipoUniversidad[]>(`${this.baseUrl}`);
  }
}
