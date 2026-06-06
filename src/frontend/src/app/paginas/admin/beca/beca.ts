import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BecaServicio } from '../../../servicios/beca/beca-servicio';
import { CarreraServicio } from '../../../servicios/carrera/carrera-servicio';
import { IBeca } from '../../../servicios/beca/IBeca';
import { map, Observable } from 'rxjs';
import { ICarrera } from '../../../servicios/carrera/ICarrera';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-beca',
  imports: [CommonModule, FormsModule],
  templateUrl: './beca.html',
  styleUrl: './beca.css',
})
export class Beca {
  abierto = false;

  constructor(private becaServicio: BecaServicio, private carreraServicio: CarreraServicio, private router: Router) { }

  becas: IBeca[] = [];
  becas$!: Observable<IBeca[]>;

  carreras: ICarrera[] = [];
  carreras$!: Observable<ICarrera[]>;

  @ViewChild('btnInfo')
  btnInfo!: ElementRef;

  @ViewChild('btnInfoAgregar')
  btnInfoAgregar!: ElementRef;

  @ViewChild('btnInfoDashboard')
  btnInfoDashboard!: ElementRef;

  @ViewChild('btnInfoTipo')
  btnInfoTipo!: ElementRef;

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

  mostrarTooltipTipo() {
    if (!this.btnInfoTipo?.nativeElement) {
      return;
    }

    const tooltipTipo = bootstrap.Tooltip.getOrCreateInstance(
      this.btnInfoTipo.nativeElement
    );

    tooltipTipo.show();

    setTimeout(() => {
      try {
        tooltipTipo.hide();
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

  private obtenerBeca() {
    this.becaServicio.obtenerListaDeBeca().subscribe(dato => {
      this.becas = dato;
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

  tipoFiltro: 'nombre' | 'tipo' = 'nombre';

  obtenerBecasOrdenadas(becas: any[] | null): any[] {

    if (!becas) return [];

    const resultado = [...becas];

    switch (this.tipoFiltro) {

      case 'tipo':
        return resultado.sort((a, b) =>
          a.tipoBeca.localeCompare(b.tipoBeca)
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
