import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Interes } from './Interes';

@Injectable({
  providedIn: 'root',
})
export class NivelinteresServicio {
  private baseUrl="http://localhost:8080/api/v1/public/nivelinteres";

  constructor(private httpClient: HttpClient){}

  obtenerListaDeNivelesDeInteres(): Observable<Interes[]>{
    return this.httpClient.get<Interes[]>(`${this.baseUrl}`);
  }
}
