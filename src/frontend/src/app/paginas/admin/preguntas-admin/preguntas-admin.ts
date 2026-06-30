import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { CategoriaPreguntasServicio } from '../../../servicios/categoria-preguntas/categoria-preguntas-servicio';
import { CategoriaPreguntas } from '../../../servicios/categoria-preguntas/categoria-preguntas';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { IPreguntas } from '../../../servicios/preguntas/IPreguntas';
import { PreguntasServicio } from '../../../servicios/preguntas/preguntas-servicio';
import { FormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-preguntas-admin',
  imports: [CommonModule, FormsModule, MatPaginatorModule, MatTableModule],
  templateUrl: './preguntas-admin.html',
  styleUrl: './preguntas-admin.css',
})
export class PreguntasAdmin {
  data: string[] = [];
  abierto = false;

  constructor(private categoriaPreguntasServicio: CategoriaPreguntasServicio, private preguntaServicio: PreguntasServicio, private router: Router, private cd: ChangeDetectorRef) { }

  @ViewChild('btnInfo')
  btnInfo!: ElementRef;

  @ViewChild('btnInfoAgregarCategoria')
  btnInfoAgregarCategoria!: ElementRef;

  @ViewChild('btnInfoDashboard')
  btnInfoDashboard!: ElementRef;

  @ViewChild('btnInfoAgregarPregunta')
  btnInfoAgregarPregunta!: ElementRef;

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

  mostrarTooltipAgregarCategoria() {
    if (!this.btnInfoAgregarCategoria?.nativeElement) {
      return;
    }

    const tooltipAgregarCategoria = bootstrap.Tooltip.getOrCreateInstance(
      this.btnInfoAgregarCategoria.nativeElement
    );

    tooltipAgregarCategoria.show();

    setTimeout(() => {
      try {
        tooltipAgregarCategoria.hide();
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

  mostrarTooltipAgregarPregunta() {
    if (!this.btnInfoAgregarPregunta?.nativeElement) {
      return;
    }
    
    const tooltipAgregarPregunta = bootstrap.Tooltip.getOrCreateInstance(
      this.btnInfoAgregarPregunta.nativeElement
    );

    tooltipAgregarPregunta.show();

    setTimeout(() => {
      try {
        tooltipAgregarPregunta.hide();
      } catch (e) {
        console.error(e);
      }
    }, 1000);
  }

  ngOnInit(): void {
    this.categoriaPreguntasServicio.obtenerListaDeCategorias().subscribe(dato => {
      this.dataSourceCategoria.data = dato;

      this.dataSourceCategoria.data.forEach(cate => {
        cate.preguntas = cate.preguntas?.sort((a, b) =>
          a.preguntas.localeCompare(b.preguntas)
        );
      });

      this.cd.detectChanges();
    });

    this.preguntas$ = this.preguntaServicio.obtenerListaDePreguntas();
    this.preguntaServicio.obtenerListaDePreguntas().subscribe(dato => {
      this.dataSourcePregunta.data = dato;
      this.cd.detectChanges();
    })
  }

  ngAfterViewInit() {
    this.dataSourceCategoria.paginator = this.paginadorCategoria;
    this.dataSourcePregunta.paginator = this.paginadorPregunta;
  }

  volverDashboard() {
    this.router.navigate(['dashboard']);
  }

  /*=====================================================================================*/
  /*                              Para Categoria Preguntas                               */
  /*=====================================================================================*/
  categoriaPreguntas: CategoriaPreguntas[] = [];
  categoriaPreguntas$!: Observable<CategoriaPreguntas[]>;

  displayedColumnsCategoria: string[] = ['nombre', 'platos', 'acciones'];

  dataSourceCategoria = new MatTableDataSource<CategoriaPreguntas>();

  @ViewChild('paginadorCategoria')
  paginadorCategoria!: MatPaginator;

  columnasCategoria: string[] = [
    'nombre',
    'preguntas',
    'acciones'
  ];

  registrarCategoriaPregunta() {
    this.router.navigate(['creacion-categoria-preguntas']);
  }

  actualizarCategoriaPregunta(id: number) {
    this.router.navigate(['actualizacion-categoria-preguntas', id]);
  }

  private obtenerCategoriaPregunta() {
    this.categoriaPreguntasServicio.obtenerListaDeCategorias().subscribe(dato => {
      this.categoriaPreguntas = dato;
    })
  }

  eliminarCategoriaPregunta(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Confirma si deseas eliminar la categoría",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimínalo',
      cancelButtonText: 'No, cancelar',
      buttonsStyling: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriaPreguntasServicio.eliminarCategoria(id).subscribe(dato => {
          console.log(dato);
          this.obtenerCategoriaPregunta();
          Swal.fire(
            'Categoría eliminada',
            'La categoría ha sido eliminada con exito',
            'success'
          )
        })
      }
    });
  }

  /*=====================================================================================*/
  /*                                   Para Preguntas                                    */
  /*=====================================================================================*/
  preguntas: IPreguntas[] = [];
  preguntas$!: Observable<IPreguntas[]>;

  displayedColumnsPregunta: string[] = ['pregunta', 'categoria', 'acciones'];

  dataSourcePregunta = new MatTableDataSource<IPreguntas>();

  @ViewChild('paginadorPregunta')
  paginadorPregunta!: MatPaginator;

  columnasPregunta: string[] = [
    'pregunta',
    'categoria',
    'acciones'
  ];

  registrarPregunta() {
    this.router.navigate(['creacion-preguntas']);
  }

  actualizarPregunta(id: number) {
    this.router.navigate(['actualizacion-preguntas', id]);
  }

  private obtenerPregunta() {
    this.preguntaServicio.obtenerListaDePreguntas().subscribe(data => {
      this.preguntas = data;
    })
  }

  eliminarPregunta(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Confirma si deseas eliminar la pregunta",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimínalo',
      cancelButtonText: 'No, cancelar',
      buttonsStyling: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.preguntaServicio.eliminarPregunta(id).subscribe(dato => {
          console.log(dato);
          this.obtenerPregunta();
          Swal.fire(
            'Pregunta eliminada',
            'La pregunta ha sido eliminada con exito',
            'success'
          )
        })
      }
    });
  }
}
