import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';
import { Usuario } from './Usuario';
import { Cantidad } from '../dto/Cantidad';

@Injectable({
  providedIn: 'root',
})
export class UsuarioServicio {
  private usuPerfilUrl = "http://localhost:8080/api/v1/private/perfil";
  private baseUrl="http://localhost:8080/api/v1/public/usuarios";

  constructor(private HttpClient: HttpClient) {
    axios.defaults.baseURL = 'http://localhost:8080';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
  }

  obtenerPerfil(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.HttpClient.get(
      `${this.usuPerfilUrl}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }

  obtenerCantidadUniversidad(): Observable<Cantidad> {
      return this.HttpClient.get<Cantidad>(this.baseUrl + '-cantidad');
    }

  actualizarUsuario(usuario: Usuario): Observable<Usuario> {
    const token = localStorage.getItem('token');
    return this.HttpClient.put<Usuario>(this.usuPerfilUrl, usuario, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
