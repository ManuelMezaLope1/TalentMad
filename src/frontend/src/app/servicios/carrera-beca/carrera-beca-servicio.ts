import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CarreraBecaServicio {
  private url = "http://localhost:8080/api/v1/public/carrera-beca";

  constructor(private http: HttpClient) { }

  guardarLote(relaciones: any[]) {
    return this.http.post(
      this.url + '/lote',
      relaciones
    );
  }
}
