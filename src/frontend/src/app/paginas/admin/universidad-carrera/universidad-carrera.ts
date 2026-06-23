import { ChangeDetectorRef, Component } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { UniversidadServicio } from '../../../servicios/universidad/universidad-servicio';
import { CarreraServicio } from '../../../servicios/carrera/carrera-servicio';
import { IUniversidad } from '../../../servicios/universidad/IUniversidad';
import { map, Observable } from 'rxjs';
import { ICarrera } from '../../../servicios/carrera/ICarrera';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { UniversidadCarreraServicio } from '../../../servicios/universidad-carrera/universidad-carrera-servicio';
import { Router } from '@angular/router';

@Component({
  selector: 'app-universidad-carrera',
  imports: [CommonModule, FormsModule],
  templateUrl: './universidad-carrera.html',
  styleUrl: './universidad-carrera.css',
})
export class UniversidadCarrera {
  carreras: ICarrera[] = [];
  carreras$!: Observable<ICarrera[]>;

  universidades: IUniversidad[] = [];
  universidades$!: Observable<IUniversidad[]>;

  universidadSeleccionada: any = null;
  carreraSeleccionada: any = null;

  constructor(private universidadServicio: UniversidadServicio, private carreraServicio: CarreraServicio, private universidadCarreraServicio: UniversidadCarreraServicio, private cd: ChangeDetectorRef, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.carreras$ = this.carreraServicio.obtenerListaDeCarrera().pipe(
      map(carreras =>
        carreras.sort((a, b) => a.nombre.localeCompare(b.nombre))
      )
    );

    this.universidades$ = this.universidadServicio.obtenerListaDeUniversidad().pipe(
      map(universidades =>
        universidades.sort((a, b) => a.nombre.localeCompare(b.nombre))
      )
    );
  }

  volverDashboard() {
    this.router.navigate(['/dashboard'])
  }

  universidadAgregada: any = null;
  carreraAgregada: any[] = [];

  agregarUniversidad() {
    if (!this.universidadSeleccionada) return;

    this.universidadAgregada = {
      id: this.universidadSeleccionada.id,
      nombre: this.universidadSeleccionada.nombre,
      departamento: this.universidadSeleccionada.departamento.nombre,
      costoMensualMinimo: this.universidadSeleccionada.costoMensualMinimo,
      costoMensualMaximo: this.universidadSeleccionada.costoMensualMaximo
    };
  }

  agregarCarrera() {
    if (!this.universidadAgregada) {
      Swal.fire('Oops...', 'Primero seleccione una universidad', 'warning');
      return;
    }

    if (!this.carreraSeleccionada) return;

    const carreraExistente = this.carreraAgregada.find(
      p => p.id === this.carreraSeleccionada.id
    );

    if (carreraExistente) {
      Swal.fire('Oops...', 'Ya se agregó la carrera', 'warning')
    } else {
      this.carreraAgregada.push({
        id: this.carreraSeleccionada.id,
        nombre: this.carreraSeleccionada.nombre,
        descripcion: this.carreraSeleccionada.descripcion,
        duracion: this.carreraSeleccionada.duracion,
        tipoCarrera: this.carreraSeleccionada.tipoCarrera
      });
    }
  }

  quitarCarrera(index: number) {
    this.carreraAgregada.splice(index, 1);
  }

  guardarRelaciones() {
    if (!this.universidadAgregada) {
      Swal.fire(
        'Oops...',
        'Seleccione una universidad',
        'warning'
      );

      return;
    }

    if (this.carreraAgregada.length === 0) {
      Swal.fire(
        'Oops...',
        'Debe agregar al menos una carrera',
        'warning'
      );

      return;
    }

    const relaciones = this.carreraAgregada.map(carrera => ({
      universidadId: this.universidadAgregada.id,
      carreraId: carrera.id
    }));

    console.log(relaciones);

    this.universidadCarreraServicio
      .guardarLote(relaciones)
      .subscribe({

        next: (resp: any) => {

          if (resp.insertados > 0 && resp.duplicados.length === 0) {

            Swal.fire(
              'Felicidades',
              `Se registraron ${resp.insertados} relaciones correctamente.`,
              'success'
            );

            return;
          }

          if (resp.insertados === 0 && resp.duplicados.length > 0) {

            let mensaje = 'Todas las relaciones ya estaban registradas:\n\n';

            resp.duplicados.forEach((d: string) => {
              mensaje += `• ${d}\n`;
            });

            Swal.fire(
              'Advertencia',
              mensaje,
              'warning'
            );

            return;
          }

          if (resp.insertados > 0 && resp.duplicados.length > 0) {

            let mensaje =
              `Se registraron ${resp.insertados} relaciones.\n\n` +
              'Las siguientes ya existían:\n\n';

            resp.duplicados.forEach((d: string) => {
              mensaje += `• ${d}\n`;
            });

            Swal.fire(
              'Proceso completado',
              mensaje,
              'info'
            );

          }

        },

        error: () => {

          Swal.fire(
            'Error',
            'No se pudieron guardar las relaciones',
            'error'
          );

        }

      });
  }
}