import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TipoUniversidad } from '../../../servicios/tipouniversidad/TipoUniversidad';
import { Departamento } from '../../../servicios/departamento/Departamento';
import { UniversidadServicio } from '../../../servicios/universidad/universidad-servicio';
import { TipoUniversidadServicio } from '../../../servicios/tipouniversidad/tipo-universidad-servicio';
import { DepartamentoServicio } from '../../../servicios/departamento/departamento-servicio';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { IUniversidad } from '../../../servicios/universidad/IUniversidad';

@Component({
  selector: 'app-actualizacion-universidad',
  imports: [FormsModule, CommonModule],
  templateUrl: './actualizacion-universidad.html',
  styleUrl: './actualizacion-universidad.css',
})
export class ActualizacionUniversidad {
  id: number;
  universidad: IUniversidad=new IUniversidad();
  tipoUniversidades: TipoUniversidad[]=[];
  departamentos: Departamento[]=[];

  constructor(private cd: ChangeDetectorRef, private universidadServicio: UniversidadServicio, private tipoUniversidadServicio: TipoUniversidadServicio, private departamentoServicio: DepartamentoServicio, private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void{
    this.id=this.route.snapshot.params['id'];

    this.universidadServicio.obtenerUniversidadPorId(this.id).pipe(
      tap(dato=>{
        Object.assign(this.universidad, dato);
        this.cd.detectChanges();
      }),
      catchError(err=>{
        console.error(err);
        return of(null);
      })
    ).subscribe()

    this.tipoUniversidadServicio.obtenerListaDeTipoDeUniversidad().subscribe(dato=>{
      this.tipoUniversidades=dato;
      this.cd.detectChanges();
    })

    this.departamentoServicio.obtenerListaDeTipoDeDepartamento().subscribe(dato=>{
      this.departamentos=dato;
      this.cd.detectChanges();
    })
  }

  compararDepartamento(c1: any, c2: any): boolean{
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  compararTipoUniversidad(c1: any, c2: any): boolean{
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  irALaListaDeUniversidad(){
    this.router.navigate(['/universidad']);
    Swal.fire('Universidad actualizada','La universidad ha sido actualizada con éxito','success');
  }

  onSubmit(): void{
    if(this.universidad){
      this.universidadServicio.actualizarUniversidad(this.id, this.universidad).pipe(
        tap(dato=>{
          this.irALaListaDeUniversidad();
        }),
        catchError(err=>{
          console.error(err);
          return of(null);
        })
      ).subscribe()
    }
  }
}
