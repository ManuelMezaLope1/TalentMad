import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IUniversidad } from '../../../servicios/universidad/IUniversidad';
import { UniversidadServicio } from '../../../servicios/universidad/universidad-servicio';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { TipoUniversidadServicio } from '../../../servicios/tipouniversidad/tipo-universidad-servicio';
import { TipoUniversidad } from '../../../servicios/tipouniversidad/TipoUniversidad';
import { DepartamentoServicio } from '../../../servicios/departamento/departamento-servicio';
import { Departamento } from '../../../servicios/departamento/Departamento';

@Component({
  selector: 'app-registro-universidad',
  imports: [FormsModule, CommonModule],
  templateUrl: './registro-universidad.html',
  styleUrl: './registro-universidad.css',
})
export class RegistroUniversidad {
  universidad: IUniversidad=new IUniversidad();
  tipoUniversidades: TipoUniversidad[]=[];
  departamentos: Departamento[]=[];

  constructor(private tipoUniversidadServicio: TipoUniversidadServicio, private departamentoServicio: DepartamentoServicio, private universidadServicio: UniversidadServicio, private router: Router, private cd: ChangeDetectorRef){
    this.universidad.tipoUniversidad=null;
    this.universidad.departamento=null;
  }

  ngOnInit(): void{
    this.tipoUniversidadServicio.obtenerListaDeTipoDeUniversidad().subscribe(dato=>{
      this.tipoUniversidades=dato;
      this.cd.detectChanges();
    });

    this.departamentoServicio.obtenerListaDeTipoDeDepartamento().subscribe(dato=>{
      this.departamentos=dato;
      this.cd.detectChanges();
    })
  }

  guardarUniversidad(){
    this.universidadServicio.registrarUniversidad(this.universidad).pipe(
      tap(dato=>{
        this.irALaListaDeUniversidad();
      }),
      catchError(err=>{
        console.log("ERROR COMPLETO:", err);
        console.log("STATUS:", err.status);
        console.log("BODY:", err.error);
        return throwError(() => err);
      })
    ).subscribe()
  }

  irALaListaDeUniversidad(){
    Swal.fire({
      title: 'Universidad registrada',
      text: `La universidad ha sido registrada con éxito`,
      icon: `success`,
      confirmButtonText: 'Ok'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/universidad']);
      }
    })
  }

  onSubmit(){
    this.guardarUniversidad();
  }
}
