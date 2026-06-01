import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPreguntas } from './IPreguntas';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PreguntasServicio {
  private baseURL="http://localhost:8080/api/v1/public/preguntas";

  constructor(private HttpClient: HttpClient){}

  obtenerListaDePreguntas(): Observable<IPreguntas[]>{
    return this.HttpClient.get<IPreguntas[]>(`${this.baseURL}`);
  }

  registrarPregunta(pregunta: IPreguntas): Observable<Object>{
    return this.HttpClient.post(`${this.baseURL}`, pregunta);
  }

  actualizarPregunta(id: number, pregunta: IPreguntas): Observable<Object>{
    return this.HttpClient.put(`${this.baseURL}/${id}`, pregunta);
  }

  obtenerPreguntaPorId(id: number): Observable<IPreguntas>{
    return this.HttpClient.get<IPreguntas>(`${this.baseURL}/${id}`);
  }

  eliminarPregunta(id: number): Observable<Object>{
    return this.HttpClient.delete(`${this.baseURL}/${id}`);
  }
}
