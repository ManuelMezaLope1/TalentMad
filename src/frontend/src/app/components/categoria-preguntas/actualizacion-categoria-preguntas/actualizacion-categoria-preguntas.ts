import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoriaPreguntas } from '../../../servicios/categoria-preguntas/categoria-preguntas';
import { CategoriaPreguntasServicio } from '../../../servicios/categoria-preguntas/categoria-preguntas-servicio';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizacion-categoria-preguntas',
  imports: [FormsModule, CommonModule],
  templateUrl: './actualizacion-categoria-preguntas.html',
  styleUrl: './actualizacion-categoria-preguntas.css',
})
export class ActualizacionCategoriaPreguntas {
  id: number;
  categoria: CategoriaPreguntas=new CategoriaPreguntas();

  constructor(private categoriaPreguntasServicio: CategoriaPreguntasServicio, private router: Router, private route: ActivatedRoute, private cd: ChangeDetectorRef){}

  ngOnInit(): void{
    this.id=this.route.snapshot.params['id'];

    this.categoriaPreguntasServicio.obtenerCategoriaPorId(this.id).pipe(
      tap(dato=>{
        Object.assign(this.categoria, dato);
        this.cd.detectChanges();
      }),
      catchError(err=>{
        console.error(err);
        return of(null);
      })
    ).subscribe()
  }

  irALaListaDeCategoria(){
    this.router.navigate(['/preguntas-admin']);
    Swal.fire('Categoría actualizada','La categoría ha sido actualizada éxitosamente','success');
  }

  onSubmit(): void{
    if(this.categoria){
      this.categoriaPreguntasServicio.actualizarCategoria(this.id, this.categoria).pipe(
        tap(dato=>{
          this.irALaListaDeCategoria();
        }),
        catchError(err=>{
          console.error(err);
          return of(null);
        })
      ).subscribe()
    }
  }
}
