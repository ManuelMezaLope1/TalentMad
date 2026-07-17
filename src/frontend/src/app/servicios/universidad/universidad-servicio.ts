import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUniversidad } from './IUniversidad';
import { UniversidadImagen } from './UniversidadImagen';
import { UniversidadSedes } from './UniversidadSedes';
import { Cantidad } from '../dto/Cantidad';
import { NombreCantidad } from '../dto/NombreCantidad';

@Injectable({
  providedIn: 'root',
})
export class UniversidadServicio {
  private baseURL = "http://localhost:8080/api/v1/public/universidad";

  constructor(private HttpClient: HttpClient) { }

  obtenerListaDeUniversidad(): Observable<IUniversidad[]> {
    return this.HttpClient.get<IUniversidad[]>(`${this.baseURL}`);
  }

  obtenerImagenDeUniversidad(nombre: string): Observable<UniversidadImagen> {
    return this.HttpClient.get<UniversidadImagen>(this.baseURL + '-imagen',
      {
        params: {
          nombre: nombre
        }
      });
  }

  obtenerSedes(nombre: string, id: number): Observable<UniversidadSedes[]> {
    return this.HttpClient.get<UniversidadSedes[]>(this.baseURL + '-sedes',
      {
        params: {
          nombre: nombre,
          id: id
        }
      }
    );
  }

  obtenerCantidadUniversidad(): Observable<Cantidad> {
    return this.HttpClient.get<Cantidad>(this.baseURL + '-cantidad');
  }

  obtenerUniversidadSedesCantidad(): Observable<NombreCantidad[]> {
    return this.HttpClient.get<NombreCantidad[]>(this.baseURL + '-sedes-cantidad');
  }

  obtenerUniversidadDepartamentoCantidad(): Observable<NombreCantidad[]> {
    return this.HttpClient.get<NombreCantidad[]>(this.baseURL + '-departamento-cantidad');
  }

  obtenerUniversidadCarreraCantidad(): Observable<NombreCantidad[]> {
    return this.HttpClient.get<NombreCantidad[]>(this.baseURL + '-carrera-cantidad');
  }

  obtenerUniversidadBecaCantidad(): Observable<NombreCantidad[]> {
    return this.HttpClient.get<NombreCantidad[]>(this.baseURL + '-beca-cantidad');
  }

  registrarUniversidad(formData: FormData): Observable<Object> {
    return this.HttpClient.post(`${this.baseURL}`, formData);
  }

  actualizarUniversidad(id: number, formData: FormData): Observable<Object> {
    return this.HttpClient.put(`${this.baseURL}/${id}`, formData);
  }

  obtenerUniversidadPorId(id: number): Observable<IUniversidad> {
    return this.HttpClient.get<IUniversidad>(`${this.baseURL}/${id}`);
  }

  eliminarUniversidad(id: number): Observable<Object> {
    return this.HttpClient.delete(`${this.baseURL}/${id}`);
  }
}
