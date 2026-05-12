import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ICarrera } from '../../../servicios/carrera/ICarrera';
import { IUniversidad } from '../../../servicios/universidad/IUniversidad';
import { CarreraServicio } from '../../../servicios/carrera/carrera-servicio';
import { UniversidadServicio } from '../../../servicios/universidad/universidad-servicio';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizacion-carrera',
  imports: [FormsModule, CommonModule],
  templateUrl: './actualizacion-carrera.html',
  styleUrl: './actualizacion-carrera.css',
})
export class ActualizacionCarrera {
  id: number;
  carrera: ICarrera = new ICarrera();
  universidades: IUniversidad[] = [];
  universidadSeleccionada: IUniversidad | null = null;

  constructor(private carreraServicio: CarreraServicio, private universidadServicio: UniversidadServicio, private router: Router, private route: ActivatedRoute, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.universidadSeleccionada = this.carrera.universidad;

    this.universidadServicio.obtenerListaDeUniversidad().subscribe(dato => {
      this.universidades = dato;

      this.carreraServicio.obtenerCarreraPorId(this.id).subscribe(carrera => {
        this.carrera = carrera;
        this.universidadSeleccionada = carrera.universidad?.[0] || null;

        this.cd.detectChanges();
      });
    });
  }

  compararUniversidad(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
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

  irALaListaDeCarrera() {
    this.router.navigate(['/carrera'])
    Swal.fire('Carrera actualizada', 'La carrera ha sido actualizada éxitosamente', 'success');
  }

  onSubmit(): void {
    if (this.carrera) {
      this.carreraServicio.actualizarCarrera(this.id, this.carrera).pipe(
        tap(dato => {
          this.irALaListaDeCarrera();
        }),
        catchError(err => {
          console.error(err);
          return of(null);
        })
      ).subscribe()
    }
  }
}
