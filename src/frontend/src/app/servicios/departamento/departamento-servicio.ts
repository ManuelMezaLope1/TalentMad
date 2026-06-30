import { Injectable } from '@angular/core';
import { Departamento } from './Departamento';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DepartamentoRegion } from './DepartamentoRegion';

@Injectable({
  providedIn: 'root',
})
export class DepartamentoServicio {
  private baseUrl="http://localhost:8080/api/v1/public/departamento";

  constructor(private HttpClient: HttpClient){}

  obtenerListaDeTipoDeDepartamento(): Observable<Departamento[]>{
    return this.HttpClient.get<Departamento[]>(`${this.baseUrl}`);
  }

  obtenerDepartamentoCosta(): Observable<DepartamentoRegion[]>{
    return this.HttpClient.get<DepartamentoRegion[]>(this.baseUrl+'-costa');
  }

  obtenerDepartamentoSierra(): Observable<DepartamentoRegion[]>{
    return this.HttpClient.get<DepartamentoRegion[]>(this.baseUrl+'-sierra');
  }

  obtenerDepartamentoSelva(): Observable<DepartamentoRegion[]>{
    return this.HttpClient.get<DepartamentoRegion[]>(this.baseUrl+'-selva');
  }
}
