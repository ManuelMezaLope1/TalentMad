import { ChangeDetectorRef, Component } from '@angular/core';
import { IBeca } from '../../../servicios/beca/IBeca';
import { ICarrera } from '../../../servicios/carrera/ICarrera';
import { BecaServicio } from '../../../servicios/beca/beca-servicio';
import { CarreraServicio } from '../../../servicios/carrera/carrera-servicio';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, tap, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TipoUniversidad } from '../../../servicios/tipouniversidad/TipoUniversidad';
import { OrigenBecaServicio } from '../../../servicios/origen-beca/origen-beca-servicio';

@Component({
  selector: 'app-registro-beca',
  imports: [FormsModule, CommonModule],
  templateUrl: './registro-beca.html',
  styleUrl: './registro-beca.css',
})
export class RegistroBeca {
  beca: IBeca = new IBeca();
  origenBecas: TipoUniversidad[]=[];

  constructor(private becaServicio: BecaServicio, private origenBecaServicio: OrigenBecaServicio, private router: Router, private route: ActivatedRoute, private cd: ChangeDetectorRef) {
    this.beca.origenBeca=null;
  }

  ngOnInit(): void{
    this.origenBecaServicio.obtenerTodosLosOrigenesBeca().pipe(
      tap(dato=>{
        this.origenBecas=dato;
        this.cd.detectChanges();
      }),
      catchError(err=>{
        console.error(err)
        return of(null)
      })
    ).subscribe()
  }

  tipos = ['Deportiva','Excelencia Académica','Socioeconómica'];

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
