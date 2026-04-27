import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthServicio {
  private url = "http://localhost:8080/auth";

  constructor(private http: HttpClient) { }

  login(data: any) {
    return this.http.post<any>(`${this.url}/login`, data);
  }

  guardarToken(token: string) {
    localStorage.setItem('token', token);
  }

  obtenerToken() {
    return localStorage.getItem('token');
  }

  getPayload() {
    const token = localStorage.getItem('token');
    if (!token) return null;

    return JSON.parse(atob(token.split('.')[1]));
  }

  hasRole(role: string): boolean {
    const payload = this.getPayload();
    if (!payload || !payload.roles) return false;

    return payload.roles.some((r: any) =>
      r.authority ? r.authority === role : r === role
    )
  }

  logueado(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
}
