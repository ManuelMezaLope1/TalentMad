import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BecaServicio } from '../../../servicios/beca/beca-servicio';
import { CarreraServicio } from '../../../servicios/carrera/carrera-servicio';
import { IBeca } from '../../../servicios/beca/IBeca';
import { map, Observable } from 'rxjs';
import { ICarrera } from '../../../servicios/carrera/ICarrera';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-beca',
  imports: [CommonModule, FormsModule],
  templateUrl: './beca.html',
  styleUrl: './beca.css',
})
export class Beca {
  constructor(private becaServicio: BecaServicio, private carreraServicio: CarreraServicio, private router: Router) { }

  becas: IBeca[] = [];
  becas$!: Observable<IBeca[]>;

  carreras: ICarrera[] = [];
  carreras$!: Observable<ICarrera[]>;

  ngOnInit(): void {
    this.becas$ = this.becaServicio.obtenerListaDeBeca();
    this.carreras$ = this.carreraServicio.obtenerListaDeCarrera().pipe(
      map(carreras =>
        carreras.sort((a, b) =>
          a.nombre.localeCompare(b.nombre))
      )
    )
  }

  volverDashboard() {
    this.router.navigate(['dashboard']);
  }

  registrarBeca() {
    this.router.navigate(['creacion-beca']);
  }

  private obtenerBeca(){
    this.becaServicio.obtenerListaDeBeca().subscribe(dato=>{
      this.becas=dato;
    })
  }

  actualizarBeca(id: number) {
    this.router.navigate(['actualizacion-beca', id]);
  }

  eliminarBeca(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Confirma si deseas eliminar la beca",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimínalo',
      cancelButtonText: 'No, cancelar',
      buttonsStyling: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.becaServicio.eliminarBeca(id).subscribe(dato => {
          console.log(dato);
          this.obtenerBeca();
          Swal.fire(
            'Beca eliminada',
            'La beca ha sido eliminada con exito',
            'success'
          )
        })
      }
    });
  }
}
