import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { TipoUniversidad } from '../../../servicios/tipouniversidad/TipoUniversidad';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { OrigenBecaServicio } from '../../../servicios/origen-beca/origen-beca-servicio';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-origen-beca',
  imports: [CommonModule, MatPaginatorModule, MatTableModule],
  templateUrl: './origen-beca.html',
  styleUrl: './origen-beca.css',
})
export class OrigenBeca {
  data: string[] = [];
  abierto = false;

  constructor(private origenBecaServicio: OrigenBecaServicio, private router: Router, private cd: ChangeDetectorRef) { }

  @ViewChild('btnInfo')
  btnInfo!: ElementRef;

  @ViewChild('btnInfoAgregar')
  btnInfoAgregar!: ElementRef;

  @ViewChild('btnInfoDashboard')
  btnInfoDashboard!: ElementRef;

  @ViewChild('btnInfoVolver')
  btnInfoVolver!: ElementRef;

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

  mostrarTooltipVolver() {
    if (!this.btnInfoVolver?.nativeElement) {
      return;
    }

    const tooltipVolver = bootstrap.Tooltip.getOrCreateInstance(
      this.btnInfoVolver.nativeElement
    );

    tooltipVolver.show();

    setTimeout(() => {
      try {
        tooltipVolver.hide();
      } catch (e) {
        console.error(e);
      }
    }, 1000);
  }

  ngOnInit(): void{
    this.origenBecaServicio.obtenerTodosLosOrigenesBeca().subscribe(dato=>{
      this.dataSource.data=dato;
      this.cd.detectChanges();
    })
  }

  registrarOrigenBeca() {
    this.router.navigate(['creacion-origen-beca']);
  }
  
  actualizarOrigenBeca(id: number){
    this.router.navigate(['actualizacion-origen-beca',id]);
  }

  volverDashboard() {
    this.router.navigate(['/dashboard'])
  }

  regresarBeca(){
    this.router.navigate(['/beca']);
  }

  origenBeca: TipoUniversidad[] = [];
  origenBeca$!: Observable<TipoUniversidad[]>;

  displayedColumns: string[] = ['nombre', 'becas', 'acciones'];

  dataSource = new MatTableDataSource<TipoUniversidad>();

  columnas: string[] = [
    'nombre',
    'becas',
    'acciones'
  ];
}
