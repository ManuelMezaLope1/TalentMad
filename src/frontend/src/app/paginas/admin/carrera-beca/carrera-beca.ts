import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { ICarrera } from '../../../servicios/carrera/ICarrera';
import { Router } from '@angular/router';
import { CarreraServicio } from '../../../servicios/carrera/carrera-servicio';
import { IBeca } from '../../../servicios/beca/IBeca';
import { BecaServicio } from '../../../servicios/beca/beca-servicio';
import Swal from 'sweetalert2';
import { CarreraBecaServicio } from '../../../servicios/carrera-beca/carrera-beca-servicio';

@Component({
  selector: 'app-carrera-beca',
  imports: [CommonModule, FormsModule],
  templateUrl: './carrera-beca.html',
  styleUrl: './carrera-beca.css',
})
export class CarreraBeca {
  carreras: ICarrera[] = [];
  carreras$!: Observable<ICarrera[]>;
  becas: IBeca[] = [];
  becas$: Observable<IBeca[]>;

  constructor(private carreraServicio: CarreraServicio, private becaServicio: BecaServicio, private carreraBecaServicio: CarreraBecaServicio, private router: Router) { }

  ngOnInit(): void {
    this.carreras$ = this.carreraServicio.obtenerListaDeCarrera().pipe(
      map(carreras =>
        carreras.sort((a, b) => a.nombre.localeCompare(b.nombre))
      )
    );

    this.becas$ = this.becaServicio.obtenerListaDeBeca().pipe(
      map(becas =>
        becas.sort((a, b) => a.nombre.localeCompare(b.nombre))
      )
    );
  }

  volverDashboard() {
    this.router.navigate(['/dashboard']);
  }

  becaSeleccionada: any = null;
  carreraSeleccionada: any = null;

  carreraAgregada: any = null;
  becaAgregada: any[] = [];

  agregarCarrera() {
    if (!this.carreraSeleccionada) return;

    this.carreraAgregada = {
      id: this.carreraSeleccionada.id,
      nombre: this.carreraSeleccionada.nombre,
      descripcion: this.carreraSeleccionada.descripcion,
      duracion: this.carreraSeleccionada.duracion,
      tipoCarrera: this.carreraSeleccionada.tipoCarrera
    };
  }

  agregarBeca() {
    if (!this.carreraAgregada) {
      Swal.fire('Oops...', 'Primero seleccione una carrera', 'warning');
      return;
    }

    if (!this.becaSeleccionada) return;

    const becaExistente = this.becaAgregada.find(
      p => p.id === this.becaSeleccionada.id
    );

    if (becaExistente) {
      Swal.fire('Oops...', 'Ya se agregó la beca', 'warning');
    } else {
      this.becaAgregada.push({
        id: this.becaSeleccionada.id,
        nombre: this.becaSeleccionada.nombre,
        descripcion: this.becaSeleccionada.descripcion,
        duracion: this.becaSeleccionada.duracion,
        beneficio: this.becaSeleccionada.beneficio,
        requisito: this.becaSeleccionada.requisito,
        restriccion: this.becaSeleccionada.restriccion,
      });
    }
  }

  quitarBeca(index: number) {
    this.becaAgregada.splice(index, 1);
  }

  guardarRelaciones() {
    if (!this.carreraAgregada) {
      Swal.fire(
        'Oops...',
        'Seleccione una carrera',
        'warning'
      );

      return;
    }

    if (this.becaAgregada.length === 0) {
      Swal.fire(
        'Oops...',
        'Debe agregar al menos una beca',
        'warning'
      );

      return;
    }

    const relaciones = this.becaAgregada.map(carrera => ({
      carreraId: this.carreraAgregada.id,
      becaId: carrera.id
    }));

    console.log(relaciones);

    this.carreraBecaServicio
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
