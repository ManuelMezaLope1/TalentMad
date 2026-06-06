import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioServicio } from '../../../servicios/usuario/usuario-servicio';
import { tap, catchError, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import Swal from 'sweetalert2';
import { Departamento } from '../../../servicios/departamento/Departamento';
import { DepartamentoServicio } from '../../../servicios/departamento/departamento-servicio';

@Component({
  selector: 'app-perfil',
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil {
  usuario: any;
  username: string;
  departamento: Departamento[] = [];

  constructor(private usuarioServicio: UsuarioServicio, private departamentoServicio: DepartamentoServicio, private cd: ChangeDetectorRef, private router: Router) { }

  active: string = "informacion";

  onInformacionTab(): void {
    this.active = "informacion";
  }

  onHistorialTab(): void {
    this.active = "historial";
  }

  ngOnInit(): void {
    this.usuarioServicio.obtenerPerfil().pipe(
      tap(data => {
        this.usuario = data;
        this.cd.detectChanges();
      }),
      catchError(error => {
        console.error(error);
        return of(null);
      })
    ).subscribe();

    this.departamentoServicio.obtenerListaDeTipoDeDepartamento().subscribe(dato => {
      this.departamento = dato
      this.cd.detectChanges();
    });
  }

  compararDepartamento(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  irALaCuenta() {
    this.router.navigate(['/perfil']);
    Swal.fire('Usuario actualizado', 'El usuario se actualizó correctamente', 'success');
  }

  onSubmit(): void {
    if (this.usuario) {
      this.usuarioServicio.actualizarUsuario(this.usuario).pipe(
        tap(dato => {
          this.irALaCuenta();
        }),
        catchError(error => {
          console.error("Error al actualizar el usuario: ", error);
          return of(null);
        })
      ).subscribe()
    }
  }
}
