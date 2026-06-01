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

  constructor(private carreraServicio: CarreraServicio, private router: Router, private route: ActivatedRoute, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.carreraServicio.obtenerCarreraPorId(this.id).subscribe(carrera => {
      this.carrera = carrera;

      this.cd.detectChanges();
    });
  }

  compararUniversidad(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  tipos = [
    'Administración', 'Arquitectura', 'Arte y Diseño', 'Artes Escénicas', 'Ciencias Básicas', 'Ciencias de la Salud',
    'Ciencias Económicas', 'Ciencias Sociales', 'Computación', 'Comunicaciones',  'Derecho', 'Educación', 'Gastronomía, Hotelería y Turismo',
    'Gestión y Alta Dirección', 'Ingeniería', 'Letras y Ciencias Humanas', 'Medicina', 'Negocios', 'Psicología'
  ];

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
