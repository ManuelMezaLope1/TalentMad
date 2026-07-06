import { ChangeDetectorRef, Component } from '@angular/core';
import { TipoUniversidad } from '../../../servicios/tipouniversidad/TipoUniversidad';
import { OrigenBecaServicio } from '../../../servicios/origen-beca/origen-beca-servicio';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-actualizacion-origen-beca',
  imports: [CommonModule, FormsModule],
  templateUrl: './actualizacion-origen-beca.html',
  styleUrl: './actualizacion-origen-beca.css',
})
export class ActualizacionOrigenBeca {
  id: number;
  origenBeca: TipoUniversidad = new TipoUniversidad();

  constructor(private origenBecaServicio: OrigenBecaServicio, private router: Router, private route: ActivatedRoute, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.origenBecaServicio.obtenerOrigenBecaPorId(this.id).pipe(
      tap(dato => {
        Object.assign(this.origenBeca, dato);
        this.cd.detectChanges();
      }),
      catchError(err => {
        console.error(err)
        return of(null)
      })
    ).subscribe()
  }

  irALaListaDeCategoria() {
    this.router.navigate(['/origen-beca']);
    Swal.fire('Origen actualizado', 'El origen de la beca ha sido actualizado éxitosamente', 'success');
  }

  onSubmit(): void {
    if (this.origenBeca) {
      this.origenBecaServicio.actualizarOrigenBeca(this.id, this.origenBeca).pipe(
        tap(dato => {
          this.irALaListaDeCategoria();
        }),
        catchError(err => {
          console.error(err);
          return of(null);
        })
      ).subscribe()
    }
  }
}
