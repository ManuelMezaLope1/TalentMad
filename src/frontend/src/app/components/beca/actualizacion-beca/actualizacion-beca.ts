import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IBeca } from '../../../servicios/beca/IBeca';
import { ICarrera } from '../../../servicios/carrera/ICarrera';
import { BecaServicio } from '../../../servicios/beca/beca-servicio';
import { CarreraServicio } from '../../../servicios/carrera/carrera-servicio';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { tap, catchError, of } from 'rxjs';

@Component({
  selector: 'app-actualizacion-beca',
  imports: [FormsModule, CommonModule],
  templateUrl: './actualizacion-beca.html',
  styleUrl: './actualizacion-beca.css',
})
export class ActualizacionBeca {
  id: number;
  beca: IBeca = new IBeca();
  carreras: ICarrera[] = [];
  carreraSeleccionada: ICarrera | null = null;

  constructor(private becaServicio: BecaServicio, private carreraServicio: CarreraServicio, private router: Router, private route: ActivatedRoute, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.carreraSeleccionada = this.beca.carrera;

    this.carreraServicio.obtenerListaDeCarrera().subscribe(dato => {
      this.carreras = dato;

      this.becaServicio.obtenerBecaPorId(this.id).subscribe(beca => {
        this.beca = beca;
        this.carreraSeleccionada = beca.carrera?.[0] || null;

        this.cd.detectChanges();
      })
    })
  }

  compararCarrera(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  tipos = ['Excelencia Académica', 'Deportiva'];

  actualizarTipoBeca(event: any) {
    const tipoSeleccionado = event.target.value;
    this.beca.tipoBeca = tipoSeleccionado || '';
  }

  irALaListaDeBeca() {
    this.router.navigate(['/beca']);
    Swal.fire('Beca actualizada', 'La beca ha sido actualizada éxitosamente', 'success');
  }

  onSubmit(): void {
    if (this.beca) {
      this.becaServicio.actualizarBeca(this.id, this.beca).pipe(
        tap(dato => {
          this.irALaListaDeBeca();
        }),
        catchError(err => {
          console.error(err);
          return of(null);
        })
      ).subscribe()
    }
  }
}
