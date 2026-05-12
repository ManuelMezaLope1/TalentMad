import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IPreguntas } from '../../../servicios/preguntas/IPreguntas';
import { CategoriaPreguntas } from '../../../servicios/categoria-preguntas/categoria-preguntas';
import { PreguntasServicio } from '../../../servicios/preguntas/preguntas-servicio';
import { CategoriaPreguntasServicio } from '../../../servicios/categoria-preguntas/categoria-preguntas-servicio';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizacion-preguntas',
  imports: [FormsModule, CommonModule],
  templateUrl: './actualizacion-preguntas.html',
  styleUrl: './actualizacion-preguntas.css',
})
export class ActualizacionPreguntas {
  id: number;
  pregunta: IPreguntas=new IPreguntas();
  categorias: CategoriaPreguntas[]=[];

  constructor(private preguntaServicio: PreguntasServicio, private categoriaPreguntasServicio: CategoriaPreguntasServicio, private router: Router, private route: ActivatedRoute, private cd: ChangeDetectorRef){}

  ngOnInit(): void{
    this.id=this.route.snapshot.params['id'];

    this.preguntaServicio.obtenerPreguntaPorId(this.id).pipe(
      tap(dato=>{
        Object.assign(this.pregunta, dato);
        this.cd.detectChanges();
      }),
      catchError(err=>{
        console.error(err);
        return of(null);
      })
    ).subscribe()

    this.categoriaPreguntasServicio.obtenerListaDeCategorias().subscribe(dato=>{
      this.categorias=dato;
    })
  }

  compararCategoria(c1: any, c2: any): boolean{
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  irALaListaDePregunta(){
    this.router.navigate(['/preguntas-admin'])
    Swal.fire('Pregunta actualizada','La pregunta ha sido actualizada éxitosamente','success');
  }

  onSubmit(): void{
    if(this.pregunta){
      this.preguntaServicio.actualizarPregunta(this.id, this.pregunta).pipe(
        tap(dato=>{
          this.irALaListaDePregunta();
        }),
        catchError(err=>{
          console.error(err);
          return of(null);
        })
      ).subscribe()
    }
  }
}
