import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { catchError, takeUntil, tap } from 'rxjs/operators';
import { CarreraServicio } from '../../../servicios/carrera/carrera-servicio';
import { ICarrera } from '../../../servicios/carrera/ICarrera';
import { IUniversidad } from '../../../servicios/universidad/IUniversidad';
import { obtenerImagenCarrera } from '../../../servicios/carrera/imagenes-carrera';
import Swal from 'sweetalert2';
import { Departamento } from '../../../servicios/departamento/Departamento';
import { UsuarioServicio } from '../../../servicios/usuario/usuario-servicio';
import { DepartamentoServicio } from '../../../servicios/departamento/departamento-servicio';
import { UniversidadCarreraServicio } from '../../../servicios/universidad-carrera/universidad-carrera-servicio';
import { OrigenBecaServicio } from '../../../servicios/origen-beca/origen-beca-servicio';
import { UniversidadBecaServicio } from '../../../servicios/universidad-beca/universidad-beca-servicio';
import { IBeca } from '../../../servicios/beca/IBeca';
import { IUniversidadBeca } from '../../../servicios/universidad-beca/IUniversidadBeca';

@Component({
  selector: 'app-detalle-carrera',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detallecarrera.html',
  styleUrls: ['./detallecarrera.css']
})
export class DetalleCarrera implements OnInit, OnDestroy {
  id: number;
  universidadCarrera: any[] = [];
  universidades: any[] = [];
  universidadNombre: any;
  carrera: ICarrera | null = null;
  becas: any[] = [];
  isLoading = true;
  private destroy$ = new Subject<void>();

  costoDesde: number | null = null;
  costoHasta: number | null = null;

  costoDesdeTemp: number | null = null;
  costoHastaTemp: number | null = null;

  rankingDesde: number | null = null;
  rankingHasta: number | null = null;

  rankingDesdeTemp: number | null = null;
  rankingHastaTemp: number | null = null;

  departamento: any | null = null;
  departamentoTemp: any;
  departamentoUsuario: any;
  usuario: any;
  regionActual: any = 'costa';

  costoDropdownOpen = false;
  rankingDropdownOpen = false;
  departamentoDropdownOpen = false;

  opcionesCostoDesde: number[] = [500, 1000, 1500, 2000, 3000, 5000];
  opcionesCostoHasta: number[] = [500, 1000, 1500, 2000, 3000, 5000];

  opcionesRankingDesde: number[] = [1, 2, 3, 4, 5];
  opcionesRankingHasta: number[] = [1, 2, 3, 4, 5];

  departamentos: Departamento[] = [];
  opcionesDepartamento: string[] = [];
  departamentosCosta: any[] = []
  departamentosSierra: any[] = []
  departamentosSelva: any[] = []

  // ── Filtro de beca ───────────────────────────────────────────────────────────
  origenBecas: any[] = [];
  becaFiltro: string = '';
  entidadesBeca: string[] = [];

  // ── Modal de becas ───────────────────────────────────────────────────────────
  modalBecasAbierto = false;
  universidadModal: IUniversidad | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private carreraServicio: CarreraServicio,
    private usuarioServicio: UsuarioServicio,
    private universidadCarreraServicio: UniversidadCarreraServicio,
    private universidadBecaServicio: UniversidadBecaServicio,
    private departamentoServicio: DepartamentoServicio,
    private origenBecaServicio: OrigenBecaServicio,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if (!this.id) { this.router.navigate(['/resultado']); return; }

    this.carreraServicio.obtenerCarreraPorId(this.id).pipe(
      tap(dato => {
        this.carrera = dato;
        this.cd.detectChanges();
      }),
      catchError(err => {
        console.error(err);
        return of(null)
      })
    ).subscribe()

    this.universidadCarreraServicio.obtenerPorCarreraId(this.id).pipe(
      tap(dato => {
        this.universidadCarrera = dato;

        this.universidades = this.universidadCarrera.map(x => ({
          ...x.universidad,
          ranking: x.ranking,
          origen: x.universidad.universidadBeca
            ?.map((ub: IUniversidadBeca) => ub.beca?.origenBeca?.nombre)
            .filter(Boolean)
            .join(', ') ?? 'Sin beca'
        }));

        this.cd.detectChanges();
      }),
      catchError(err => {
        console.error(err)
        return of(null)
      })
    ).subscribe()

    this.usuarioServicio.obtenerPerfil().pipe(
      tap(data => {
        this.usuario = data;
        this.departamentoUsuario = this.usuario.departamento.nombre;
        this.cd.detectChanges();
      }),
      catchError(error => {
        console.error(error);
        return of(null);
      })
    ).subscribe();

    this.origenBecaServicio.obtenerTodosLosOrigenesBeca().pipe(
      tap(dato => {
        this.origenBecas = dato;
        this.entidadesBeca = this.origenBecas.map(b =>
          b.nombre
        )
        this.cd.detectChanges();
      }),
      catchError(err => {
        console.error(err)
        return of(null)
      })
    ).subscribe()

    this.departamentoServicio.obtenerDepartamentoCosta().pipe(
      tap(dato => {
        this.departamentosCosta = dato;
        this.departamentosCosta = this.departamentosCosta.map(
          departamento => departamento.nombre
        )
        this.cd.detectChanges();
      }),
      catchError(err => {
        console.error(err);
        return of(null)
      })
    ).subscribe();

    this.departamentoServicio.obtenerDepartamentoSierra().pipe(
      tap(dato => {
        this.departamentosSierra = dato;
        this.departamentosSierra = this.departamentosSierra.map(
          departamento => departamento.nombre
        )
        this.cd.detectChanges();
      }),
      catchError(err => {
        console.error(err);
        return of(null)
      })
    ).subscribe();

    this.departamentoServicio.obtenerDepartamentoSelva().pipe(
      tap(dato => {
        this.departamentosSelva = dato;
        this.departamentosSelva = this.departamentosSelva.map(
          departamento => departamento.nombre
        )
        this.cd.detectChanges();
      }),
      catchError(err => {
        console.error(err);
        return of(null)
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next(); this.destroy$.complete();
  }

  // ── Datos filtrados ───────────────────────────────────────────────────────

  get universidadesFiltradas(): IUniversidad[] {
    if (!this.universidades) return [];

    return this.obtenerUniversidadesUnicas(this.universidades).filter(u => {
      const costoMin = parseFloat(u.costoMensualMinimo);
      const costoMax = parseFloat(u.costoMensualMaximo);
      const departamento = u.departamento.nombre;
      const ranking = u.ranking;
      const origen = u.origen;

      const promedio = Math.round((costoMin + costoMax) / 2)

      const cumpleDesde = this.costoDesde == null || promedio >= this.costoDesde;
      const cumpleHasta = this.costoHasta == null || promedio <= this.costoHasta;
      const tieneBeca = this.becaFiltro === '';

      this.universidades = this.universidadCarrera
        .map(x => ({
          ...x.universidad,
          ranking: x.ranking,
          origen: x.universidad.universidadBeca
            ?.map((ub:IUniversidadBeca) => ub.beca?.origenBeca?.nombre)
            .filter(Boolean)
            .join(', ') ?? 'Sin beca'
        }))
        .filter(u =>
          tieneBeca || u.origen.includes(this.becaFiltro)
        );

      const cumpleDepartamento = this.departamento == null || departamento === this.departamento;

      const cumpleRankingDesde = this.rankingDesde == null || ranking >= this.rankingDesde;
      const cumpleRankingHasta = this.rankingHasta == null || ranking <= this.rankingHasta;

      return cumpleDesde && cumpleHasta && cumpleDepartamento && cumpleRankingDesde && cumpleRankingHasta;
    });
  }

  // ── Métodos del filtro de costo ───────────────────────────────────────────

  toggleCostoDropdown(): void {
    if (!this.costoDropdownOpen) {
      this.costoDesdeTemp = this.costoDesde;
      this.costoHastaTemp = this.costoHasta;
    }
    this.costoDropdownOpen = !this.costoDropdownOpen;
  }

  seleccionarPresetCostoDesde(valor: number): void {
    this.costoDesdeTemp = valor;
  }

  seleccionarPresetCostoHasta(valor: number): void {
    this.costoHastaTemp = valor;
  }

  aplicarCosto(): void {
    if (this.costoDesdeTemp === null) {
      Swal.fire('Oops..', 'Añada un costo mínimo', 'warning');
      return;
    }

    if (this.costoHastaTemp === null) {
      Swal.fire('Oops..', 'Añada un costo máximo', 'warning');
      return;
    }

    if (this.costoDesdeTemp > this.costoHastaTemp) {
      Swal.fire('Oops..', 'El costo mínimo no puede ser mayor al costo máximo', 'warning');
      return;
    }

    this.costoDesde = this.costoDesdeTemp;
    this.costoHasta = this.costoHastaTemp;
    this.costoDropdownOpen = false;
  }

  limpiarCosto(): void {
    this.costoDesdeTemp = null;
    this.costoHastaTemp = null;
    this.costoDesde = null;
    this.costoHasta = null;
    this.costoDropdownOpen = false;
  }

  get costoFiltroLabel(): string {
    if (this.costoDesde == null && this.costoHasta == null) return 'Cualquier costo';
    if (this.costoDesde != null && this.costoHasta != null) {
      return `${this.formatCosto(this.costoDesde)} – ${this.formatCosto(this.costoHasta)}`;
    }
    if (this.costoHasta != null) return `Hasta ${this.formatCosto(this.costoHasta)}`;
    return `Desde ${this.formatCosto(this.costoDesde as number)}`;
  }

  toggleRankingDropdown() {
    if (!this.rankingDropdownOpen) {
      this.costoDesdeTemp = this.costoDesde;
      this.costoHastaTemp = this.costoHasta;
    }
    this.rankingDropdownOpen = !this.rankingDropdownOpen;
  }

  seleccionarPresetRankingDesde(valor: number): void {
    this.rankingDesdeTemp = valor;
  }

  seleccionarPresetRankingHasta(valor: number): void {
    this.rankingHastaTemp = valor;
  }

  aplicarRanking(): void {
    if (this.rankingDesdeTemp === null) {
      Swal.fire('Oops..', 'Añada un ranking mínimo', 'warning');
      return;
    }

    if (this.rankingHastaTemp === null) {
      Swal.fire('Oops..', 'Añada un ranking máximo', 'warning');
      return;
    }

    if (this.rankingDesdeTemp > this.rankingHastaTemp) {
      Swal.fire('Oops..', 'El ranking mínimo no puede ser mayor que el ranking máximo', 'warning');
      return;
    }

    this.rankingDesde = this.rankingDesdeTemp;
    this.rankingHasta = this.rankingHastaTemp;
    this.rankingDropdownOpen = false;
  }

  limpiarRanking(): void {
    this.rankingDesdeTemp = null;
    this.rankingHastaTemp = null;
    this.rankingDesde = null;
    this.rankingHasta = null;
    this.rankingDropdownOpen = false;
  }

  get rankingFiltroLabel(): string {
    if (this.rankingDesde == null && this.rankingHasta == null) return 'De mayor a menor';
    if (this.rankingDesde != null && this.rankingHasta != null) {
      return `${this.rankingDesde} - ${this.rankingHasta}`;
    }
    if (this.rankingHasta != null) return `Hasta ${this.rankingHasta}`;
    return `Desde ${this.rankingDesde}`
  }

  seleccionarPresetDepartamento(valor: string): void {
    this.departamentoTemp = valor;
  }

  toggleDepartamentoDropdown() {
    if (!this.departamentoDropdownOpen) {
      this.departamentoTemp = this.departamento;
    }
    this.departamentoDropdownOpen = !this.departamentoDropdownOpen;
  }

  get departamentoFiltroLabel(): string {
    if (this.departamento == null) return `${this.departamentoUsuario}`
    if (this.departamento != null) {
      return `${this.departamento}`;
    }
    return `${this.departamento}`
  }

  regionSeleccionada(region: string) {
    this.regionActual = region;
    this.departamentosFiltrados();
  }

  departamentosFiltrados(): string[] {
    if (this.regionActual === null) {
      this.opcionesDepartamento = this.departamentosCosta;
      this.cd.detectChanges();
    };

    switch (this.regionActual) {
      case "costa":
        this.opcionesDepartamento = this.departamentosCosta;
        break;

      case "sierra":
        this.opcionesDepartamento = this.departamentosSierra;
        break;

      case "selva":
        this.opcionesDepartamento = this.departamentosSelva;
        break;

      default:
        this.opcionesDepartamento = this.departamentosCosta;
    }

    return this.opcionesDepartamento;
  }

  aplicarDepartamento(): void {
    if (this.departamentoTemp === null) {
      Swal.fire('Oops..', 'Añada un departamento', 'warning');
      return;
    }

    this.departamento = this.departamentoTemp;
    this.departamentoDropdownOpen = false;
  }

  limpiarDepartamento(): void {
    this.departamentoTemp = null;
    this.departamento = null;
    this.departamentoDropdownOpen = false;
  }

  // ── Modal de becas ────────────────────────────────────────────────────────
  // Muestra siempre la información real registrada en carrera.beca,
  // sin intentar adivinar a qué convenio corresponde cada una.

  abrirModalBecas(uni: IUniversidad): void {
    this.universidadNombre = uni.nombre;

    this.universidadBecaServicio.obtenerBecasPorUniversidad(this.universidadNombre).pipe(
      tap(datos => {
        const becasAgrupadas = Array.from(
          new Map(datos.map(beca => [beca.nombre, beca])).values()
        );

        this.becas = becasAgrupadas;
        this.cd.detectChanges();
      }),
      catchError(err => {
        console.error(err)
        return of(null)
      })
    ).subscribe()

    this.universidadModal = uni;
    this.modalBecasAbierto = true;
  }

  cerrarModalBecas(): void {
    this.modalBecasAbierto = false;
    this.universidadModal = null;
  }

  irASedes(nombreUniversidad: string): void {
    this.router.navigate(['/sedes-universidad'], {
      queryParams: {
        nombre: encodeURIComponent(nombreUniversidad),
        carreraId: this.carrera?.id,
      }
    });
  }

  // ── Impresión de becas ────────────────────────────────────────────────────

  private estilosImpresion(): string {
    return `
      body { font-family: 'DM Sans', Arial, sans-serif; padding: 40px; color: #1f2937; }
      .print-doc-header { border-bottom: 3px solid #2563eb; padding-bottom: 16px; margin-bottom: 28px; }
      .print-universidad { font-size: 13px; color: #6b7280; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }
      .print-doc-header h1 { font-size: 22px; color: #1e3a8a; margin: 4px 0; }
      .print-carrera { font-size: 13px; color: #6b7280; }
      .print-card { margin-bottom: 24px; }
      .print-header { margin-bottom: 10px; }
      .print-title { font-size: 20px; font-weight: 700; color: #1e3a8a; }
      .print-tipo { display: inline-block; margin-top: 6px; background: #eff6ff; color: #2563eb; font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: 999px; }
      .print-desc { margin: 14px 0; font-size: 14px; color: #4b5563; font-style: italic; line-height: 1.6; }
      .print-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 16px; }
      .print-col h3 { font-size: 13px; color: #374151; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.03em; }
      .print-col ul { margin: 0; padding-left: 18px; }
      .print-col li { font-size: 13px; color: #4b5563; margin-bottom: 6px; line-height: 1.5; }
      .print-restriccion { background: #fff7ed; border: 1px solid #fdba74; border-radius: 8px; padding: 12px 16px; margin-bottom: 14px; }
      .print-restriccion h3 { color: #92400e; font-size: 13px; margin-bottom: 8px; }
      .print-restriccion li { color: #78350f; font-size: 13px; }
      .print-duracion { font-size: 13px; color: #6b7280; }
      .print-divider { border: none; border-top: 1px dashed #d1d5db; margin: 24px 0; }
      .print-footer { border-top: 1px solid #e5e7eb; padding-top: 12px; margin-top: 24px; font-size: 12px; color: #9ca3af; text-align: right; }
      @media print { body { padding: 20px; } }
    `;
  }

  private abrirVentanaImpresion(titulo: string, cuerpoHtml: string): void {
    const ventana = window.open('', '_blank', 'width=800,height=900');
    if (!ventana) {
      Swal.fire('Oops..', 'Habilita las ventanas emergentes para poder imprimir', 'warning');
      return;
    }

    ventana.document.write(`
      <html>
        <head>
          <title>${titulo}</title>
          <style>${this.estilosImpresion()}</style>
        </head>
        <body>${cuerpoHtml}</body>
      </html>
    `);
    ventana.document.close();
    ventana.onload = () => {
      ventana.focus();
      ventana.print();
    };
  }

  private renderBecaImpresion(beca: IBeca): string {
    return `
      <div class="print-card">
        <div class="print-header">
          <div class="print-title">${beca.nombre}</div>
          <span class="print-tipo">${beca.tipoBeca}</span>
        </div>
        <p class="print-desc">${beca.descripcion ?? ''}</p>
        <div class="print-grid">
          <div class="print-col">
            <h3>✅ Beneficios</h3>
            <ul>${this.splitLista(beca.beneficio).map(i => `<li>${i}</li>`).join('')}</ul>
          </div>
          <div class="print-col">
            <h3>📋 Requisitos</h3>
            <ul>${this.splitLista(beca.requisito).map(i => `<li>${i}</li>`).join('')}</ul>
          </div>
        </div>
        ${beca.restriccion ? `
        <div class="print-restriccion">
          <h3>⚠ Restricciones</h3>
          <ul>${this.splitLista(beca.restriccion).map(i => `<li>${i}</li>`).join('')}</ul>
        </div>` : ''}
        <p class="print-duracion">⏳ Duración: ${beca.duracion ?? 'No especificado'}</p>
      </div>
    `;
  }

  imprimirBeca(beca: IBeca): void {
    const cuerpo = `
      <div class="print-doc-header">
        <div class="print-universidad">${this.universidadModal?.nombre ?? ''}</div>
        <h1>Detalle de beca</h1>
        <span class="print-carrera">${this.carrera?.nombre ?? ''}</span>
      </div>
      ${this.renderBecaImpresion(beca)}
      <div class="print-footer">Generado el ${new Date().toLocaleDateString('es-PE')}</div>
    `;
    this.abrirVentanaImpresion(`Beca - ${beca.nombre}`, cuerpo);
  }

  imprimirTodasLasBecas(): void {
    if (!this.becas || this.becas.length === 0) return;

    const tarjetas = this.becas
      .map(beca => this.renderBecaImpresion(beca))
      .join('<hr class="print-divider" />');

    const cuerpo = `
      <div class="print-doc-header">
        <div class="print-universidad">${this.universidadModal?.nombre ?? ''}</div>
        <h1>Becas y convenios disponibles</h1>
        <span class="print-carrera">${this.carrera?.nombre ?? ''}</span>
      </div>
      ${tarjetas}
      <div class="print-footer">Generado el ${new Date().toLocaleDateString('es-PE')}</div>
    `;
    this.abrirVentanaImpresion(`Becas - ${this.universidadModal?.nombre ?? ''}`, cuerpo);
  }

  // ── Utilidades ────────────────────────────────────────────────────────────

  get universidadesUnicas(): { nombre: string; cantidadSedes: number; promedioRanking: number; }[] {
    if (!this.universidades) return [];

    const mapa = new Map<string, { cantidadSedes: number; sumaRanking: number }>();
    (this.universidades as any[]).forEach(u => {
      if (!u?.nombre) return;

      const nombreBase = u.nombre.split(' - ')[0].trim();

      const actual = mapa.get(nombreBase);

      if (actual) {
        actual.cantidadSedes++;
        actual.sumaRanking += Number(u.ranking ?? 0);
      } else {
        mapa.set(nombreBase, {
          cantidadSedes: 1,
          sumaRanking: Number(u.ranking ?? 0)
        });
      }
    });

    return Array.from(mapa.entries()).map(([nombre, datos]) => ({
      nombre,
      cantidadSedes: datos.cantidadSedes,
      promedioRanking: datos.sumaRanking / datos.cantidadSedes
    }));
  }

  obtenerUniversidadesUnicas(universidades: any[]): any[] {
    const mapa = new Map();

    universidades.forEach(u => {
      const nombrePrincipal = u.nombre.split(' - ')[0].trim();

      if (!mapa.has(nombrePrincipal)) {
        mapa.set(nombrePrincipal, {
          ...u,
          nombre: nombrePrincipal,
          cantidadSedes: 1,
          sumaRanking: Number(u.ranking ?? 0)
        });
      } else {
        const item = mapa.get(nombrePrincipal);
        item.cantidadSedes++;
        item.sumaRanking += Number(u.ranking ?? 0);
      }
    });

    return Array.from(mapa.values()).map(item => ({
      ...item,
      rankingPromedio: item.sumaRanking / item.cantidadSedes
    }));
  }

  obtenerPromedio(u: IUniversidad): number {
    return Math.round((parseFloat(u.costoMensualMinimo) + parseFloat(u.costoMensualMaximo)) / 2);
  }

  formatCosto(v: number): string {
    return `S/. ${v.toLocaleString('es-PE')}`;
  }

  limpiarFiltros(): void {
    this.limpiarCosto();
    this.limpiarRanking();
    this.limpiarDepartamento();
    this.becaFiltro = '';
  }

  volver(): void {
    this.router.navigate(['/resultado']);
  }

  splitLista(texto: string): string[] {
    return texto?.split(',').map(s => s.trim()).filter(Boolean) ?? [];
  }
}