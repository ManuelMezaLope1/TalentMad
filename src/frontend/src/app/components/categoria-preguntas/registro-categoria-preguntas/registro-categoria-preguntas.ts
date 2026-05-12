import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoriaPreguntas } from '../../../servicios/categoria-preguntas/categoria-preguntas';
import { CategoriaPreguntasServicio } from '../../../servicios/categoria-preguntas/categoria-preguntas-servicio';
import { Router } from '@angular/router';
import { tap, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-categoria-preguntas',
  imports: [FormsModule, CommonModule],
  templateUrl: './registro-categoria-preguntas.html',
  styleUrl: './registro-categoria-preguntas.css',
})
export class RegistroCategoriaPreguntas {
  categoria: CategoriaPreguntas = new CategoriaPreguntas();

  constructor(private categoriaPreguntasServicio: CategoriaPreguntasServicio, private router: Router){}

  guardarCategoriaPregunta(){
    this.categoriaPreguntasServicio.registrarCategoria(this.categoria).pipe(
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

  irALaListaDeCategorias(){
    Swal.fire({
      title: 'Categoria registrada',
      text: `La categoría ha sido registrada con éxito`,
      icon: `success`,
      confirmButtonText: 'Ok'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/preguntas-admin']);
      }
    })
  }

  onSubmit(){
    this.guardarCategoriaPregunta();
  }
}
