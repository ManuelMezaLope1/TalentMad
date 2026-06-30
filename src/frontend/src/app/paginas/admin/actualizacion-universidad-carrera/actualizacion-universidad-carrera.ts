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

  rankingSeleccionado: any=null;
  totalSeleccionado: any=null;

  constructor(private universidadServicio: UniversidadServicio, private carreraServicio: CarreraServicio, private universidadCarreraServicio: UniversidadCarreraServicio, private router: Router, private route: ActivatedRoute, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.universidadServicio.obtenerUniversidadPorId(this.id).pipe(
      tap(dato => {
        Object.assign(this.universidad, dato);
        console.log(this.universidad)
        this.universidadSeleccionada=this.universidad;
        this.universidadAgregada=this.universidad;

        this.carreraAgregada.push(
          ...this.universidad.carrera.map(op => ({
            id: op.id,
            nombre: op.nombre,
            descripcion: op.descripcion,
            duracion: op.duracion,
            tipoCarrera: op.tipoCarrera,
            ranking: op.ranking,
            total: op.total
          }))
        )
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

  agregarCarrera() {
    if (!this.universidadAgregada) {
      Swal.fire('Oops...', 'Primero seleccione una universidad', 'warning');
      return;
    }

    if(this.rankingSeleccionado===null){
      Swal.fire('Oops...','El ranking no puede estar vacio','warning')
      return;
    }

    if(this.totalSeleccionado===null){
      Swal.fire('Oops...','El total no puede estar vacio','warning')
      return;
    }

    if (!this.carreraSeleccionada) return;

    const carreraExistente = this.carreraAgregada.find(
      p => p.id === this.carreraSeleccionada.id
    );

    this.carreraSeleccionada.ranking=this.rankingSeleccionado;
    this.carreraSeleccionada.total=this.totalSeleccionado;

    if (carreraExistente) {
      Swal.fire('Oops...', 'Ya se agregó la carrera', 'warning')
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

  rankingAgregado: any=null;

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

    /*this.universidadCarreraServicio
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
      });*/
  }
}
