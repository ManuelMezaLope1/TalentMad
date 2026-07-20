import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TipoUniversidad } from '../../../servicios/tipouniversidad/TipoUniversidad';
import { OrigenBecaServicio } from '../../../servicios/origen-beca/origen-beca-servicio';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-origen-beca',
  imports: [CommonModule, FormsModule],
  templateUrl: './registro-origen-beca.html',
  styleUrl: './registro-origen-beca.css',
})
export class RegistroOrigenBeca {
  origenBeca: TipoUniversidad = new TipoUniversidad();

  constructor(private origenBecaServicio: OrigenBecaServicio, private router: Router) { }

  guardarOrigenBeca() {
    this.origenBecaServicio.registrarOrigenBeca(this.origenBeca).pipe(
      tap(dato => {
        console.log(dato);
        this.irALaListaDeCategorias();
      }),
      catchError(err => {
        console.log("ERROR COMPLETO:", err);
        console.log("STATUS:", err.status);
        console.log("BODY:", err.error);
        return throwError(() => err);
      })
    ).subscribe()
  }

  irALaListaDeCategorias() {
    Swal.fire({
      title: 'Origen registrada',
      text: `El origen de la beca ha sido registrado con éxito`,
      icon: `success`,
      confirmButtonText: 'Ok'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/origen-beca']);
      }
    })
  }

  onSubmit() {
    this.guardarOrigenBeca();
  }
}
