import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ICarrera } from '../../../servicios/carrera/ICarrera';
import { CarreraServicio } from '../../../servicios/carrera/carrera-servicio';
import { UniversidadServicio } from '../../../servicios/universidad/universidad-servicio';
import { ActivatedRoute, Router } from '@angular/router';
import { IUniversidad } from '../../../servicios/universidad/IUniversidad';
import { catchError, tap, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-carrera',
  imports: [FormsModule, CommonModule],
  templateUrl: './registro-carrera.html',
  styleUrl: './registro-carrera.css',
})
export class RegistroCarrera {
  carrera: ICarrera = new ICarrera();

  constructor(private carreraServicio: CarreraServicio, private router: Router, private route: ActivatedRoute, private cd: ChangeDetectorRef) {
    this.carrera.universidad = [];
  }

  tipos = [
    'Administración', 'Arquitectura','Arte y Diseño','Artes Escénicas', 'Ciencias Básicas', 'Ciencias de la Salud', 
    'Ciencias Económicas', 'Ciencias Sociales', 'Computación', 'Comunicaciones','Derecho', 'Educación', 'Gastronomía, Hotelería y Turismo', 
    'Gestión y Alta Dirección', 'Ingeniería', 'Letras y Ciencias Humanas', 'Medicina', 'Negocios', 'Psicología'
  ];

  actualizarTipoCarrera(event: any) {
    const tipoSeleccionado = event.target.value;
    this.carrera.tipoCarrera = tipoSeleccionado || '';
  }

  guardarCarrera() {
    this.carreraServicio.registrarCarrera(this.carrera).pipe(
      tap(dato => {
        this.irALaListaDeCarreras();
      }),
      catchError(err => {
        console.log("ERROR COMPLETO:", err);
        console.log("STATUS:", err.status);
        console.log("BODY:", err.error);
        return throwError(() => err);
      })
    ).subscribe();
  }

  irALaListaDeCarreras() {
    Swal.fire({
      title: 'Carrera registrada',
      text: `La carrera ha sido registrada con éxito`,
      icon: `success`,
      confirmButtonText: 'Ok'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/carrera']);
      }
    });
  }

  onSubmit() {
    this.guardarCarrera();
  }
}
