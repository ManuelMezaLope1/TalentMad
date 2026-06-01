import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRespuesta } from './IRespuesta';

@Injectable({
  providedIn: 'root',
})
export class RespuestaServicio {
  private baseURL="http://localhost:8080/api/v1/public/respuestas";

  constructor(private HttpClient: HttpClient){}

  obtenerListaDeRespuestas(): Observable<IRespuesta[]>{
    return this.HttpClient.get<IRespuesta[]>(`${this.baseURL}`);
  }

  registrarRespuesta(respuesta: IRespuesta): Observable<Object>{
    return this.HttpClient.post(`${this.baseURL}`,respuesta);
  }

  actualizarRespuesta(id: number, respuesta: IRespuesta): Observable<Object>{
    return this.HttpClient.put(`${this.baseURL}/${id}`,respuesta);
  }

  obtenerRespuestaPorId(id: number): Observable<IRespuesta>{
    return this.HttpClient.get<IRespuesta>(`${this.baseURL}/${id}`);
  }

  eliminarRespuesta(id: number): Observable<Object>{
    return this.HttpClient.delete(`${this.baseURL}/${id}`);
  }
}
