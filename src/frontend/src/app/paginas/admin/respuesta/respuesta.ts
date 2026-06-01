import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PreguntasServicio } from '../../../servicios/preguntas/preguntas-servicio';
import { RespuestaServicio } from '../../../servicios/respuesta/respuesta-servicio';
import { Router } from '@angular/router';
import { IRespuesta } from '../../../servicios/respuesta/IRespuesta';
import { Observable } from 'rxjs';
import { IPreguntas } from '../../../servicios/preguntas/IPreguntas';

@Component({
  selector: 'app-respuesta',
  imports: [CommonModule, FormsModule],
  templateUrl: './respuesta.html',
  styleUrl: './respuesta.css',
})
export class Respuesta {
  data: string[]=[];

  constructor(private preguntasServicio: PreguntasServicio, private respuestaServicio: RespuestaServicio, private router: Router){}

  respuestas: IRespuesta[]=[];
  respuestas$!: Observable<IRespuesta[]>;

  preguntas: IPreguntas[]=[];
  preguntas$!: Observable<IPreguntas[]>;

  ngOnInit(): void{
    this.respuestas$=this.respuestaServicio.obtenerListaDeRespuestas();
    this.preguntas$=this.preguntasServicio.obtenerListaDePreguntas();
  }

  registrarRespuesta(){
    this.router.navigate(['creacion-respuesta']);
  }

  volverDashboard(){
    this.router.navigate(['/dashboard']);
  }
}
