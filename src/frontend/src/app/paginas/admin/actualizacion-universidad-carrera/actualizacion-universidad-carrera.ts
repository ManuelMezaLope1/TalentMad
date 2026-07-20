import { ChangeDetectorRef, Component } from '@angular/core';
import { UniversidadServicio } from '../../../servicios/universidad/universidad-servicio';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { IUniversidad } from '../../../servicios/universidad/IUniversidad';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ICarrera } from '../../../servicios/carrera/ICarrera';
import { CarreraServicio } from '../../../servicios/carrera/carrera-servicio';
import Swal from 'sweetalert2';
import { UniversidadCarreraServicio } from '../../../servicios/universidad-carrera/universidad-carrera-servicio';
import { IUniversidadCarrera } from '../../../servicios/universidad-carrera/IUniversidadCarrera';

@Component({
  selector: 'app-actualizacion-universidad-carrera',
  imports: [CommonModule, FormsModule],
  templateUrl: './actualizacion-universidad-carrera.html',
  styleUrl: './actualizacion-universidad-carrera.css',
})
export class ActualizacionUniversidadCarrera {
  id: number;
  universidad: IUniversidad = new IUniversidad();
  universidadSeleccionada: any = null;
  carreraSeleccionada: any = null;

  carreras: ICarrera[] = [];
  carreras$!: Observable<ICarrera[]>;

  universidades: IUniversidad[] = [];
  universidades$!: Observable<IUniversidad[]>;

  universidadCarrera: IUniversidadCarrera[] = [];
  carrerasUniversidad: any[];

  rankingSeleccionado: any = null;
  totalSeleccionado: any = null;

  constructor(private universidadServicio: UniversidadServicio, private carreraServicio: CarreraServicio, private universidadCarreraServicio: UniversidadCarreraServicio, private router: Router, private route: ActivatedRoute, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.universidadCarreraServicio.obtenerPorUniversidadId(this.id).pipe(
      tap(dato => {
        Object.assign(this.universidadCarrera, dato)

        this.carrerasUniversidad = this.universidadCarrera.map(({ carrera, ranking, total }) => ({
          carrera,
          ranking,
          total
        }));

        this.carreraAgregada.push(
          ...this.carrerasUniversidad.map(op => ({
            id: op.carrera.id,
            nombre: op.carrera.nombre,
            descripcion: op.carrera.descripcion,
            duracion: op.carrera.duracion,
            tipoCarrera: op.carrera.tipoCarrera,
            ranking: op.ranking,
            total: op.total
          }))
        )
        this.cd.detectChanges();
      }),
      catchError(err => {
        console.error(err);
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
    this.router.navigate(['/dashboard']);
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

  idCar: any;
  carre: any;
  carreRanking: any;
  carreTotal: any;

  actualizarCarrera(id: number) {
    this.idCar = id;

    this.carreraServicio.obtenerCarreraPorId(this.idCar).pipe(
      tap(dato => {
        this.carre = dato;

        this.carreRanking = this.carreraAgregada.find(
          c => c.id === this.idCar
        )?.ranking;

        this.carreTotal = this.carreraAgregada.find(
          t => t.id === this.idCar
        )?.total;

        this.carreraSeleccionada = {
          id: this.carre.id,
          nombre: this.carre.nombre,
          descripcion: this.carre.descripcion,
          duracion: this.carre.duracion,
          tipoCarrera: this.carre.tipoCarrera,
          ranking: this.carreRanking,
          total: this.carreTotal
        }

        this.rankingSeleccionado = this.carreraSeleccionada.ranking
        this.totalSeleccionado = this.carreraSeleccionada.total

        this.cd.detectChanges();
      }),
      catchError(err => {
        console.error(err)
        return of(null)
      })
    ).subscribe()
  }

  agregarCarrera() {
    if (!this.universidadAgregada) {
      Swal.fire('Oops...', 'Primero seleccione una universidad', 'warning');
      return;
    }

    if (this.rankingSeleccionado === null) {
      Swal.fire('Oops...', 'El ranking no puede estar vacio', 'warning')
      return;
    } else if (this.rankingSeleccionado <= 0 || this.rankingSeleccionado >= 6) {
      Swal.fire('Oops...', 'El ranking debe estar entre 1 y 5', 'warning')
      return;
    }

    if (this.totalSeleccionado === null) {
      Swal.fire('Oops...', 'El total no puede estar vacio', 'warning')
      return;
    } else if (this.totalSeleccionado <= 0) {
      Swal.fire('Oops...', 'El total no puede ser menor o igual que cero', 'warning')
      return;
    }

    if (!this.carreraSeleccionada) return;

    const carreraExistente = this.carreraAgregada.findIndex(
      p => p.id === this.carreraSeleccionada.id
    );

    this.carreraSeleccionada.ranking = this.rankingSeleccionado;
    this.carreraSeleccionada.total = this.totalSeleccionado;

    if (carreraExistente !== -1) {
      this.carreraAgregada[carreraExistente] = this.carreraSeleccionada;

      Swal.fire(
        'Actualizado',
        'La carrera fue actualizada.',
        'success'
      );
    } else {
      this.carreraAgregada.push({
        id: this.carreraSeleccionada.id,
        nombre: this.carreraSeleccionada.nombre,
        descripcion: this.carreraSeleccionada.descripcion,
        duracion: this.carreraSeleccionada.duracion,
        tipoCarrera: this.carreraSeleccionada.tipoCarrera,
        ranking: this.carreraSeleccionada.ranking,
        total: this.carreraSeleccionada.total
      });
    }
  }

  quitarCarrera(index: number) {
    this.carreraAgregada.splice(index, 1);
  }

  volver(): void {
    this.router.navigate(['/elegir-universidad']);
  }

  rankingAgregado: any = null;

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
      carreraId: carrera.id,
      ranking: carrera.ranking,
      total: carrera.total
    }));

    console.log(relaciones)

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
