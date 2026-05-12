import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CarreraServicio } from '../../../servicios/carrera/carrera-servicio';
import { map, Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { ICarrera } from '../../../servicios/carrera/ICarrera';
import { IUniversidad } from '../../../servicios/universidad/IUniversidad';
import { UniversidadServicio } from '../../../servicios/universidad/universidad-servicio';

@Component({
  selector: 'app-carrera',
  imports: [CommonModule, FormsModule],
  templateUrl: './carrera.html',
  styleUrl: './carrera.css',
})
export class Carrera {

  constructor(private carreraServicio: CarreraServicio, private universidadServicio: UniversidadServicio, private router: Router) { }

  carreras: ICarrera[] = [];
  carreras$!: Observable<ICarrera[]>;

  universidades: IUniversidad[] = [];
  universidades$!: Observable<IUniversidad[]>;

  ngOnInit(): void {
    this.carreras$ = this.carreraServicio.obtenerListaDeCarrera();
    this.universidades$ = this.universidadServicio.obtenerListaDeUniversidad().pipe(
      map(universidades =>
        universidades.sort((a, b) =>
          a.nombre.localeCompare(b.nombre)
        )
      )
    );
  }

  volverDashboard() {
    this.router.navigate(['dashboard'])
  }

  registrarCarrera() {
    this.router.navigate(['creacion-carrera']);
  }

  actualizarCarrera(id: number) {
    this.router.navigate(['actualizacion-carrera', id])
  }

  private obtenerCarrera() {
    this.carreraServicio.obtenerListaDeCarrera().subscribe(dato => {
      this.carreras = dato;
    })
  }

  eliminarCarrera(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Confirma si deseas eliminar la carrera",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimínalo',
      cancelButtonText: 'No, cancelar',
      buttonsStyling: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.carreraServicio.eliminarCarrera(id).subscribe(dato => {
          console.log(dato);
          this.obtenerCarrera();
          Swal.fire(
            'Carrera eliminada',
            'La carrera ha sido eliminada con exito',
            'success'
          )
        })
      }
    });
  }
}
