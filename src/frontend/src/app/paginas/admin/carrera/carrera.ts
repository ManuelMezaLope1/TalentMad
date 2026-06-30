import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CarreraServicio } from '../../../servicios/carrera/carrera-servicio';
import { map, Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { ICarrera } from '../../../servicios/carrera/ICarrera';
import { IUniversidad } from '../../../servicios/universidad/IUniversidad';
import { UniversidadServicio } from '../../../servicios/universidad/universidad-servicio';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-carrera',
  imports: [CommonModule, FormsModule],
  templateUrl: './carrera.html',
  styleUrl: './carrera.css',
})
export class Carrera {
  abierto = false;

  constructor(private carreraServicio: CarreraServicio, private universidadServicio: UniversidadServicio, private router: Router) { }

  carreras: ICarrera[] = [];
  carreras$!: Observable<ICarrera[]>;

  universidades: IUniversidad[] = [];
  universidades$!: Observable<IUniversidad[]>;

  @ViewChild('btnInfo')
  btnInfo!: ElementRef;

  @ViewChild('btnInfoAgregar')
  btnInfoAgregar!: ElementRef;

  @ViewChild('btnInfoDashboard')
  btnInfoDashboard!: ElementRef;

  @ViewChild('btnInfoFacultad')
  btnInfoFacultad!: ElementRef;

  @ViewChild('btnInfoNombre')
  btnInfoNombre!: ElementRef;

  mostrarTooltip() {
    if (!this.btnInfo?.nativeElement) {
      return;
    }

    const tooltip = bootstrap.Tooltip.getOrCreateInstance(
      this.btnInfo.nativeElement
    );

    tooltip.show();

    setTimeout(() => {
      try {
        tooltip.hide();
      } catch (e) {
        console.error(e);
      }
    }, 1000);
  }

  mostrarTooltipAgregar() {
    if (!this.btnInfoAgregar?.nativeElement) {
      return;
    }

    const tooltipAgregar = bootstrap.Tooltip.getOrCreateInstance(
      this.btnInfoAgregar.nativeElement
    );

    tooltipAgregar.show();

    setTimeout(() => {
      try {
        tooltipAgregar.hide();
      } catch (e) {
        console.error(e);
      }
    }, 1000);
  }

  mostrarTooltipDashboard() {
    if (!this.btnInfoDashboard?.nativeElement) {
      return;
    }

    const tooltipDashboard = bootstrap.Tooltip.getOrCreateInstance(
      this.btnInfoDashboard.nativeElement
    );

    tooltipDashboard.show();

    setTimeout(() => {
      try {
        tooltipDashboard.hide();
      } catch (e) {
        console.error(e);
      }
    }, 1000);
  }

  mostrarTooltipFacultad() {
    if (!this.btnInfoFacultad?.nativeElement) {
      return;
    }

    const tooltipFacultad = bootstrap.Tooltip.getOrCreateInstance(
      this.btnInfoFacultad.nativeElement
    );

    tooltipFacultad.show();

    setTimeout(() => {
      try {
        tooltipFacultad.hide();
      } catch (e) {
        console.error(e);
      }
    }, 1000);
  }

  mostrarTooltipNombre() {
    if (!this.btnInfoNombre?.nativeElement) {
      return;
    }

    const tooltipNombre = bootstrap.Tooltip.getOrCreateInstance(
      this.btnInfoNombre.nativeElement
    );

    tooltipNombre.show();

    setTimeout(() => {
      try {
        tooltipNombre.hide();
      } catch (e) {
        console.error(e);
      }
    }, 1000);
  }

  ngOnInit(): void {
    this.carreras$ = this.carreraServicio.obtenerListaDeCarrera().pipe(
      map(carreras =>
        carreras.sort((a, b,) =>
          a.nombre.localeCompare(b.nombre))
      )
    );

    this.universidades$ = this.universidadServicio.obtenerListaDeUniversidad().pipe(
      map(universidades =>
        universidades.sort((a, b) =>
          a.nombre.localeCompare(b.nombre)
        )
      )
    );
  }

  volverDashboard() {
    this.router.navigate(['dashboard'])
  }

  registrarCarrera() {
    this.router.navigate(['creacion-carrera']);
  }

  actualizarCarrera(id: number) {
    this.router.navigate(['actualizacion-carrera', id])
  }

  private obtenerCarrera() {
    this.carreraServicio.obtenerListaDeCarrera().subscribe(dato => {
      this.carreras = dato;
    })
  }

  eliminarCarrera(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Confirma si deseas eliminar la carrera",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimínalo',
      cancelButtonText: 'No, cancelar',
      buttonsStyling: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.carreraServicio.eliminarCarrera(id).subscribe(dato => {
          this.obtenerCarrera();
          Swal.fire({
            title: 'Carrera eliminada',
            text: 'La carrera ha sido eliminada con exito',
            icon: 'success',
            confirmButtonText: 'Ok',
          }).then((result2)=>{
            if(result2.isConfirmed){
              window.location.reload();
            }
          })
        })
      }
    });
  }

  tipoFiltro: 'facultad' | 'nombre' = 'facultad';

  obtenerCarrerasOrdenadas(carreras: any[] | null): any[] {

    if (!carreras) return [];

    const resultado = [...carreras];

    switch (this.tipoFiltro) {

      case 'facultad':
        return resultado.sort((a, b) =>
          a.tipoCarrera.localeCompare(b.tipoCarrera)
        );

      case 'nombre':
        return resultado.sort((a, b) =>
          a.nombre.localeCompare(b.nombre)
        );

      default:
        return resultado;
    }
  }
}
