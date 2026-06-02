import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UniversidadBecaServicio {
  private url = "http://localhost:8080/api/v1/public/universidad-beca";

  constructor(private http: HttpClient) { }

  guardarLote(relaciones: any[]) {
    console.log(this.url + '/lote');
    return this.http.post(
      this.url + '/lote',
      relaciones
    );
  }
}
