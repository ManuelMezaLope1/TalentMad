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
  universidades: IUniversidad[] = [];
  universidadSeleccionada: IUniversidad | null = null;

  constructor(private carreraServicio: CarreraServicio, private universidadServicio: UniversidadServicio, private router: Router, private route: ActivatedRoute, private cd: ChangeDetectorRef) {
    this.carrera.universidad = [];
  }

  ngOnInit(): void {
    this.universidadServicio.obtenerListaDeUniversidad().subscribe(dato => {
      this.universidades = dato;
      this.cd.detectChanges();
    })
  }

  tipos = [
    'Arquitectura','Carreras Artísticas', 'Ciencias de la Salud', 'Ciencias Puras',
    'Ciencias Sociales y Humanidades', 'Comunicaciones', 'Derecho',
    'Educación', 'Ingeniería', 'Negocios', 'Tecnología'
  ];

  actualizarTipoCarrera(event: any) {
    const tipoSeleccionado = event.target.value;
    this.carrera.tipoCarrera = tipoSeleccionado || '';
  }

  actualizarUniversidad(event: any) {
    this.universidadSeleccionada = event.target.value;
    this.carrera.universidad = this.universidadSeleccionada ? [this.universidadSeleccionada] : [];
  }

  guardarCarrera() {
    this.carrera.universidad = this.universidadSeleccionada ? [this.universidadSeleccionada] : [];

    this.carreraServicio.registrarCarrera(this.carrera).pipe(
      tap(dato => {
        this.irALaListaDeCarreras();
      }),
      catchError(err => {
        console.log(this.carrera);
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
