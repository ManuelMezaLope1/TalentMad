import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UniversidadCarreraServicio {
  private url = "http://localhost:8080/api/v1/public/universidad-carrera";

  constructor(private http: HttpClient) { }

  guardarLote(relaciones: any[]) {
    return this.http.post(
      this.url + '/lote',
      relaciones
    );
  }
}
