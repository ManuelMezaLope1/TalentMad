import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoriaPreguntas } from './categoria-preguntas';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriaPreguntasServicio {
  private baseURL="http://localhost:8080/api/v1/public/categoria-preguntas";

  constructor(private HttpClient: HttpClient){}

  obtenerListaDeCategorias(): Observable<CategoriaPreguntas[]>{
    return this.HttpClient.get<CategoriaPreguntas[]>(`${this.baseURL}`);
  }

  registrarCategoria(categoria: CategoriaPreguntas): Observable<Object>{
    return this.HttpClient.post(`${this.baseURL}`, categoria);
  }

  actualizarCategoria(id:number, categoria: CategoriaPreguntas): Observable<Object>{
    return this.HttpClient.put(`${this.baseURL}/${id}`, categoria);
  }

  obtenerCategoriaPorId(id:number): Observable<CategoriaPreguntas>{
    return this.HttpClient.get<CategoriaPreguntas>(`${this.baseURL}/${id}`);
  }

  eliminarCategoria(id:number): Observable<Object>{
    return this.HttpClient.delete(`${this.baseURL}/${id}`);
  }
}
