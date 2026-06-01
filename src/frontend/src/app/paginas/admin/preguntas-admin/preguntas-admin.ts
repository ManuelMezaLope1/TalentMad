import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CategoriaPreguntasServicio } from '../../../servicios/categoria-preguntas/categoria-preguntas-servicio';
import { CategoriaPreguntas } from '../../../servicios/categoria-preguntas/categoria-preguntas';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { IPreguntas } from '../../../servicios/preguntas/IPreguntas';
import { PreguntasServicio } from '../../../servicios/preguntas/preguntas-servicio';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-preguntas-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './preguntas-admin.html',
  styleUrl: './preguntas-admin.css',
})
export class PreguntasAdmin {
  data: string[] = [];

  constructor(private categoriaPreguntasServicio: CategoriaPreguntasServicio, private preguntaServicio: PreguntasServicio, private router: Router) { }

  ngOnInit(): void {
    this.categoriaPreguntas$ = this.categoriaPreguntasServicio.obtenerListaDeCategorias();
    this.preguntas$ = this.preguntaServicio.obtenerListaDePreguntas();
  }

  volverDashboard() {
    this.router.navigate(['dashboard']);
  }

  /*=====================================================================================*/
  /*                              Para Categoria Preguntas                               */
  /*=====================================================================================*/
  categoriaPreguntas: CategoriaPreguntas[] = [];
  categoriaPreguntas$!: Observable<CategoriaPreguntas[]>;

  registrarCategoriaPregunta() {
    this.router.navigate(['creacion-categoria-preguntas']);
  }

  actualizarCategoriaPregunta(id: number) {
    this.router.navigate(['actualizacion-categoria-preguntas', id]);
  }

  private obtenerCategoriaPregunta() {
    this.categoriaPreguntasServicio.obtenerListaDeCategorias().subscribe(dato => {
      this.categoriaPreguntas = dato;
    })
  }

  eliminarCategoriaPregunta(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Confirma si deseas eliminar la categoría",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimínalo',
      cancelButtonText: 'No, cancelar',
      buttonsStyling: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriaPreguntasServicio.eliminarCategoria(id).subscribe(dato => {
          console.log(dato);
          this.obtenerCategoriaPregunta();
          Swal.fire(
            'Categoría eliminada',
            'La categoría ha sido eliminada con exito',
            'success'
          )
        })
      }
    });
  }

  /*=====================================================================================*/
  /*                                   Para Preguntas                                    */
  /*=====================================================================================*/
  preguntas: IPreguntas[] = [];
  preguntas$!: Observable<IPreguntas[]>;

  registrarPregunta() {
    this.router.navigate(['creacion-preguntas']);
  }

  actualizarPregunta(id: number) {
    this.router.navigate(['actualizacion-preguntas',id]);
  }

  private obtenerPregunta() {
    this.preguntaServicio.obtenerListaDePreguntas().subscribe(data => {
      this.preguntas = data;
    })
  }

  eliminarPregunta(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Confirma si deseas eliminar la pregunta",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimínalo',
      cancelButtonText: 'No, cancelar',
      buttonsStyling: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.preguntaServicio.eliminarPregunta(id).subscribe(dato => {
          console.log(dato);
          this.obtenerPregunta();
          Swal.fire(
            'Pregunta eliminada',
            'La pregunta ha sido eliminada con exito',
            'success'
          )
        })
      }
    });
  }
}
