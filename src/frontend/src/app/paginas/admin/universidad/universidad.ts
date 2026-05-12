import { Component } from '@angular/core';
import { UniversidadServicio } from '../../../servicios/universidad/universidad-servicio';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUniversidad } from '../../../servicios/universidad/IUniversidad';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DepartamentoServicio } from '../../../servicios/departamento/departamento-servicio';
import { Departamento } from '../../../servicios/departamento/Departamento';

@Component({
  selector: 'app-universidad',
  imports: [CommonModule, FormsModule],
  templateUrl: './universidad.html',
  styleUrl: './universidad.css',
})
export class Universidad {
  constructor(private universidadServicio: UniversidadServicio, private departamentoServicio: DepartamentoServicio, private router: Router){}

  universidades: IUniversidad[]=[];
  universidades$!: Observable<IUniversidad[]>;

  departamentos: Departamento[]=[];
  departamentos$!: Observable<Departamento[]>;

  ngOnInit(): void{
    this.universidades$=this.universidadServicio.obtenerListaDeUniversidad();
    this.departamentos$=this.departamentoServicio.obtenerListaDeTipoDeDepartamento();
    console.log(this.universidades)
  }

  volverDashboard(){
    this.router.navigate(['dashboard']);
  }

  actualizarUniversidad(id: number){
    this.router.navigate(['actualizacion-universidad',id])
  }

  registrarUniversidad(){
    this.router.navigate(['creacion-universidad']);
  }

  private obtenerUniversidad(){
    this.universidadServicio.obtenerListaDeUniversidad().subscribe(dato=>{
      this.universidades=dato;
    })
  }

  eliminarUniversidad(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Confirma si deseas eliminar la universidad",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimínalo',
      cancelButtonText: 'No, cancelar',
      buttonsStyling: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.universidadServicio.eliminarUniversidad(id).subscribe(dato => {
          console.log(dato);
          this.obtenerUniversidad();
          Swal.fire(
            'Universidad eliminada',
            'La universidad ha sido eliminada con exito',
            'success'
          )
        })
      }
    });
  }
}
