import { Component, ElementRef, ViewChild } from '@angular/core';
import { UniversidadServicio } from '../../../servicios/universidad/universidad-servicio';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUniversidad } from '../../../servicios/universidad/IUniversidad';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DepartamentoServicio } from '../../../servicios/departamento/departamento-servicio';
import { Departamento } from '../../../servicios/departamento/Departamento';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-universidad',
  imports: [CommonModule, FormsModule],
  templateUrl: './universidad.html',
  styleUrl: './universidad.css',
})
export class Universidad {
  abierto = false;

  constructor(private universidadServicio: UniversidadServicio, private departamentoServicio: DepartamentoServicio, private router: Router) { }

  universidades: IUniversidad[] = [];
  universidades$!: Observable<IUniversidad[]>;

  departamentos: Departamento[] = [];
  departamentos$!: Observable<Departamento[]>;

  @ViewChild('btnInfo')
  btnInfo!: ElementRef;

  @ViewChild('btnInfoAgregar')
  btnInfoAgregar!: ElementRef;

  @ViewChild('btnInfoDashboard')
  btnInfoDashboard!: ElementRef;

  @ViewChild('btnInfoNombre')
  btnInfoNombre!: ElementRef;

  @ViewChild('btnInfoUnico')
  btnInfoUnico!: ElementRef;

  @ViewChild('btnInfoSedes')
  btnInfoSedes!: ElementRef;

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

  mostrarTooltipUnico() {
    if (!this.btnInfoUnico?.nativeElement) {
      return;
    }

    const tooltipUnico = bootstrap.Tooltip.getOrCreateInstance(
      this.btnInfoUnico.nativeElement
    );

    tooltipUnico.show();

    setTimeout(() => {
      try {
        tooltipUnico.hide();
      } catch (e) {
        console.error(e);
      }
    }, 1000);
  }

  mostrarTooltipSedes() {
    if (!this.btnInfoSedes?.nativeElement) {
      return;
    }

    const tooltipSedes = bootstrap.Tooltip.getOrCreateInstance(
      this.btnInfoSedes.nativeElement
    );

    tooltipSedes.show();

    setTimeout(() => {
      try {
        tooltipSedes.hide();
      } catch (e) {
        console.error(e);
      }
    }, 1000);
  }

  ngOnInit(): void {
    this.universidades$ = this.universidadServicio.obtenerListaDeUniversidad();
    this.departamentos$ = this.departamentoServicio.obtenerListaDeTipoDeDepartamento();
  }

  volverDashboard() {
    this.router.navigate(['dashboard']);
  }

  actualizarUniversidad(id: number) {
    this.router.navigate(['actualizacion-universidad', id])
  }

  registrarUniversidad() {
    this.router.navigate(['creacion-universidad']);
  }

  private obtenerUniversidad() {
    this.universidadServicio.obtenerListaDeUniversidad().subscribe(dato => {
      this.universidades = dato;
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

  tipoFiltro: 'nombre' | 'unico' | 'sedes' = 'sedes';

  obtenerUniversidadesOrdenadas(universidades: any[] | null | undefined): any[] {

    if (!universidades) return [];

    switch (this.tipoFiltro) {

      case 'nombre':
        return [...universidades].sort((a, b) =>
          a.nombre.localeCompare(b.nombre)
        );

      case 'unico':

        const mapa = new Map<string, any>();

        universidades.forEach(uni => {

          const nombrePrincipal = uni.nombre
            .split(' - ')[0]
            .trim();

          if (!mapa.has(nombrePrincipal)) {

            mapa.set(nombrePrincipal, {
              ...uni,
              nombre: nombrePrincipal
            });

          }

        });

        return Array.from(mapa.values())
          .sort((a, b) => a.nombre.localeCompare(b.nombre));

      case 'sedes':
        return [...universidades].sort((a, b) =>
          a.nombre.localeCompare(b.nombre)
        );

      default:
        return universidades;

    }
  }
}
