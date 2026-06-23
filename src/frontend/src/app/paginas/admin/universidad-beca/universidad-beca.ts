import { Component } from '@angular/core';
import { UniversidadServicio } from '../../../servicios/universidad/universidad-servicio';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUniversidad } from '../../../servicios/universidad/IUniversidad';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarreraBecaServicio } from '../../../servicios/carrera-beca/carrera-beca-servicio';
import { BecaServicio } from '../../../servicios/beca/beca-servicio';
import { IBeca } from '../../../servicios/beca/IBeca';
import Swal from 'sweetalert2';
import { UniversidadBecaServicio } from '../../../servicios/universidad-beca/universidad-beca-servicio';

@Component({
  selector: 'app-universidad-beca',
  imports: [CommonModule, FormsModule],
  templateUrl: './universidad-beca.html',
  styleUrl: './universidad-beca.css',
})
export class UniversidadBeca {
  universidades: IUniversidad[] = [];
  universidades$!: Observable<IUniversidad[]>;

  becas: IBeca[] = [];
  becas$: Observable<IBeca[]>;

  universidadSeleccionada: any = null;
  becaSeleccionada: any = null;

  constructor(private universidadServicio: UniversidadServicio, private becaServicio: BecaServicio, private universidadBecaServicio: UniversidadBecaServicio, private router: Router) { }

  ngOnInit(): void {
    this.universidades$ = this.universidadServicio.obtenerListaDeUniversidad();
    this.becas$ = this.becaServicio.obtenerListaDeBeca();
  }

  volverDashboard() {
    this.router.navigate(['/dashboard'])
  }

  universidadAgregada: any = null;
  becaAgregada: any[] = [];

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

  agregarBeca() {
    if (!this.universidadAgregada) {
      Swal.fire('Oops...', 'Primero seleccione una universidad', 'warning');
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

  guardarRelaciones() {
    if (!this.universidadAgregada) {
      Swal.fire(
        'Oops...',
        'Seleccione una universidad',
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

    const relaciones = this.becaAgregada.map(beca => ({
      universidadId: this.universidadAgregada.id,
      becaId: beca.id
    }));

    console.log(relaciones);

    this.universidadBecaServicio
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

        error: (err) => {

          console.log('ERROR COMPLETO', err);
          console.log('STATUS', err.status);
          console.log('BODY', err.error);
          console.log('HEADERS', err.headers);

          Swal.fire(
            'Error',
            'No se pudieron guardar las relaciones',
            'error'
          );

        }

      });
  }
}
