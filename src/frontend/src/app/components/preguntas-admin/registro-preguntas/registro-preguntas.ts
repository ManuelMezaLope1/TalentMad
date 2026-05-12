import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IPreguntas } from '../../../servicios/preguntas/IPreguntas';
import { PreguntasServicio } from '../../../servicios/preguntas/preguntas-servicio';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { CategoriaPreguntas } from '../../../servicios/categoria-preguntas/categoria-preguntas';
import { CategoriaPreguntasServicio } from '../../../servicios/categoria-preguntas/categoria-preguntas-servicio';

@Component({
  selector: 'app-registro-preguntas',
  imports: [FormsModule, CommonModule],
  templateUrl: './registro-preguntas.html',
  styleUrl: './registro-preguntas.css',
})
export class RegistroPreguntas {
  pregunta: IPreguntas = new IPreguntas();
  categorias: CategoriaPreguntas[] = [];

  constructor(private preguntaServicio: PreguntasServicio, private categoriaPreguntasServicio: CategoriaPreguntasServicio, private router: Router, private cd: ChangeDetectorRef) {
    this.pregunta.categoriaPreguntas = null;
  }

  ngOnInit(): void {
    this.categoriaPreguntasServicio.obtenerListaDeCategorias().subscribe(dato => {
      this.categorias = dato;
      this.cd.detectChanges();
    })
  }

  guardarPregunta() {
    this.preguntaServicio.registrarPregunta(this.pregunta).pipe(
      tap(dato => {
        this.irALaListaDePreguntas();
      }),
      catchError(err => {
        console.log("ERROR COMPLETO:", err);
        console.log("STATUS:", err.status);
        console.log("BODY:", err.error);
        return throwError(() => err);
      })
    ).subscribe()
  }

  irALaListaDePreguntas() {
    Swal.fire({
      title: 'Pregunta registrada',
      text: `La pregunta ha sido registrada con éxito`,
      icon: `success`,
      confirmButtonText: 'Ok'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/preguntas-admin']);
      }
    })
  }

  onSubmit() {
    this.guardarPregunta();
  }
}
