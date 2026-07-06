import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { BecaServicio } from '../../../servicios/beca/beca-servicio';
import { IBeca } from '../../../servicios/beca/IBeca';
import { UniversidadBecaServicio } from '../../../servicios/universidad-beca/universidad-beca-servicio';
import { IUniversidad } from '../../../servicios/universidad/IUniversidad';
import { UniversidadServicio } from '../../../servicios/universidad/universidad-servicio';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IUniversidadBeca } from '../../../servicios/universidad-beca/IUniversidadBeca';

@Component({
  selector: 'app-actualizacion-universidad-beca',
  imports: [CommonModule, FormsModule],
  templateUrl: './actualizacion-universidad-beca.html',
  styleUrl: './actualizacion-universidad-beca.css',
})
export class ActualizacionUniversidadBeca {
  id: number;
  universidad: IUniversidad = new IUniversidad();
  universidades: IUniversidad[] = [];
  universidades$!: Observable<IUniversidad[]>;

  becas: IBeca[] = [];
  becas$: Observable<IBeca[]>;

  universidadBeca: IUniversidadBeca[] = [];
  becasUniversidad: any[];

  universidadSeleccionada: any = null;
  becaSeleccionada: any = null;

  constructor(private universidadServicio: UniversidadServicio, private becaServicio: BecaServicio, private universidadBecaServicio: UniversidadBecaServicio, private router: Router, private route: ActivatedRoute, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.universidades$ = this.universidadServicio.obtenerListaDeUniversidad();
    this.becas$ = this.becaServicio.obtenerListaDeBeca();

    this.universidadBecaServicio.obtenerPorUniversidadId(this.id).pipe(
      tap(dato => {
        Object.assign(this.universidadBeca, dato)

        this.becasUniversidad = this.universidadBeca.map(({ beca }) => ({
          beca
        }))

        this.becaAgregada.push(
          ...this.becasUniversidad.map(op => ({
            id: op.beca.id,
            nombre: op.beca.nombre,
            descripcion: op.beca.descripcion,
            duracion: op.beca.duracion,
            beneficio: op.beca.beneficio,
            requisito: op.beca.requisito,
            restriccion: op.beca.restriccion,
            tipoBeca: op.beca.tipoBeca,
            url: op.beca.url,
            origenBeca: op.beca.origenBeca.nombre
          }))
        )
        this.cd.detectChanges();
      }),
      catchError(err => {
        console.error(err)
        return of(null)
      })
    ).subscribe()

    this.universidadServicio.obtenerUniversidadPorId(this.id).pipe(
      tap(dato => {
        Object.assign(this.universidad, dato);
        this.universidadSeleccionada = this.universidad;

        this.universidadAgregada = this.universidadSeleccionada
        this.cd.detectChanges();
      }), catchError(err => {
        console.error(err);
        return of(null);
      }
      )).subscribe()
  }

  volverDashboard() {
    this.router.navigate(['/dashboard'])
  }

  volverBeca() {
    this.router.navigate(['/elegir-universidad-beca']);
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

  idBeca: any;
  beca: any;

  actualizarBeca(id: number) {
    this.idBeca = id;

    this.becaServicio.obtenerBecaPorId(this.idBeca).pipe(
      tap(dato => {
        this.beca = dato;

        this.becaSeleccionada = {
          id: this.beca.id,
          nombre: this.beca.nombre,
          descripcion: this.beca.descripcion,
          duracion: this.beca.duracion,
          beneficio: this.beca.beneficio,
          requisito: this.beca.requisito,
          restriccion: this.beca.restriccion,
          tipoBeca: this.beca.tipoBeca,
          url: this.beca.url,
          origenBeca: this.beca.origenBeca
        }

        this.cd.detectChanges()
      }),
      catchError(err => {
        console.error(err)
        return of(null)
      })
    ).subscribe()
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

  quitarBeca(index: number) {
    this.becaAgregada.splice(index, 1);
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
