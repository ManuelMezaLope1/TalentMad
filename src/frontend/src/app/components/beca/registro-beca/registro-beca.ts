import { ChangeDetectorRef, Component } from '@angular/core';
import { IBeca } from '../../../servicios/beca/IBeca';
import { ICarrera } from '../../../servicios/carrera/ICarrera';
import { BecaServicio } from '../../../servicios/beca/beca-servicio';
import { CarreraServicio } from '../../../servicios/carrera/carrera-servicio';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro-beca',
  imports: [FormsModule, CommonModule],
  templateUrl: './registro-beca.html',
  styleUrl: './registro-beca.css',
})
export class RegistroBeca {
  beca: IBeca = new IBeca();

  constructor(private becaServicio: BecaServicio, private router: Router, private route: ActivatedRoute, private cd: ChangeDetectorRef) { }

  tipos = ['Excelencia Académica','Deportiva'];

  actualizarTipoBeca(event: any) {
    const tipoSeleccionado = event.target.value;
    this.beca.tipoBeca = tipoSeleccionado || '';
  }

  guardarBeca() {
    this.becaServicio.registrarBeca(this.beca).pipe(
      tap(dato => {
        this.irALaListaDeBecas();
      }),
      catchError(err => {
        console.log("ERROR COMPLETO:", err);
        console.log("STATUS:", err.status);
        console.log("BODY:", err.error);
        return throwError(() => err);
      })
    ).subscribe()
  }

  irALaListaDeBecas() {
    Swal.fire({
      title: 'Beca registrada',
      text: 'La beca ha sido registrada con éxito',
      icon: 'success',
      confirmButtonText: 'Ok'
    }).then((result) => {
      this.router.navigate(['/beca'])
    })
  }

  onSubmit() {
    this.guardarBeca();
  }
}
