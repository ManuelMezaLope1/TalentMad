import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IRespuesta } from '../../../servicios/respuesta/IRespuesta';
import { IPreguntas } from '../../../servicios/preguntas/IPreguntas';
import { RespuestaServicio } from '../../../servicios/respuesta/respuesta-servicio';
import { PreguntasServicio } from '../../../servicios/preguntas/preguntas-servicio';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-respuesta',
  imports: [FormsModule, CommonModule],
  templateUrl: './registro-respuesta.html',
  styleUrl: './registro-respuesta.css',
})
export class RegistroRespuesta {
  respuesta: IRespuesta = new IRespuesta();
  preguntas: IPreguntas[] = [];

  constructor(private respuestaServicio: RespuestaServicio, private preguntaServicio: PreguntasServicio, private router: Router, private cd: ChangeDetectorRef) {
    this.respuesta.respuestaPreguntas=null;
  }

  ngOnInit(): void {
    this.preguntaServicio.obtenerListaDePreguntas().subscribe(dato => {
      this.preguntas = dato;
      this.cd.detectChanges();
    })
  }

  guardarRespuesta() {
    this.respuestaServicio.registrarRespuesta(this.respuesta).pipe(
      tap(dato => {
        this.irALaListaDeRespuestas();
      }),
      catchError(err => {
        console.log("ERROR COMPLETO:", err);
        console.log("STATUS:", err.status);
        console.log("BODY:", err.error);
        return throwError(() => err);
      })
    ).subscribe()
  }

  irALaListaDeRespuestas() {
    Swal.fire({
      title: 'Respuesta registrada',
      text: `La respuestas ha sido registrada con éxito`,
      icon: `success`,
      confirmButtonText: 'Ok'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/respuesta']);
      }
    })
  }

  onSubmit(){
    this.guardarRespuesta();
  }
}
