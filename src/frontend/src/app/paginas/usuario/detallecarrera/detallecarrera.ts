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

// ──────────────────────────────────────────────────────────────────────────────
// Interfaces
// ──────────────────────────────────────────────────────────────────────────────
export interface Universidad {
  nombre: string;
  tipoUniversidad: { nombre: string };
  departamento: { nombre: string };
  costoMensualMinimo: number;
  costoMensualMaximo: number;
}

export interface Beca {
  nombre: string;
  tipoBeca: string;
  descripcion: string;
  duracion: string;
  beneficio: string;
  requisito: string;
  restriccion: string;
}

// Mapeo de universidades conocidas a sus convenios de becas.
const CONVENIOS_BECAS: { [universidadPrefix: string]: string[] } = {
  'Pontificia Universidad Católica del Perú': ['Pronabec', 'Beca 18'],
  'Universidad Nacional Mayor de San Marcos': ['Pronabec', 'Beca 18', 'Inabec'],
  'Universidad Peruana de Ciencias Aplicadas': ['Pronabec'],
  'Universidad César Vallejo': ['Pronabec', 'Beca 18'],
  'Universidad Continental': ['Pronabec', 'Beca 18'],
  'Universidad Privada del Norte': ['Pronabec'],
  'Universidad Tecnológica del Perú': ['Pronabec', 'Inabec'],
  'Universidad de Lima': ['Inabec'],
  'Universidad de San Martín de Porres': ['Pronabec', 'Inabec'],
  'Universidad Privada San Ignacio de Loyola': ['Pronabec'],
};

/** Devuelve los convenios (entidades de beca) de una universidad */
function getConvenios(nombreUniversidad: string): string[] {
  for (const prefix of Object.keys(CONVENIOS_BECAS)) {
    if (nombreUniversidad.startsWith(prefix)) return CONVENIOS_BECAS[prefix];
  }
  return [];
}

// ──────────────────────────────────────────────────────────────────────────────

@Component({
  selector: 'app-detalle-carrera',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detallecarrera.html',
  styleUrls: ['./detallecarrera.css']
})
export class DetalleCarrera implements OnInit, OnDestroy {

  carrera: ICarrera | null = null;
  isLoading = true;
  private destroy$ = new Subject<void>();

  // ── Filtro de costo mensual (Desde / Hasta) ─────────────────────────────────
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
    private departamentoServicio: DepartamentoServicio,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
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

    this.departamentoServicio.obtenerDepartamentoCosta().pipe(
      tap(dato => {
        this.departamentosCosta = dato;
        this.departamentosCosta=this.departamentosCosta.map(
          departamento=>departamento.nombre
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
        this.departamentosSierra=this.departamentosSierra.map(
          departamento=>departamento.nombre
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
        this.departamentosSelva=this.departamentosSelva.map(
          departamento=>departamento.nombre
        )
        this.cd.detectChanges();
      }),
      catchError(err => {
        console.error(err);
        return of(null)
      })
    ).subscribe();

    const cached = localStorage.getItem('carrera_seleccionada');
    if (cached) {
      this.carrera = JSON.parse(cached);
      this.inicializar();
      return;
    }

    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { this.router.navigate(['/resultado']); return; }

    this.carreraServicio.obtenerListaDeCarrera()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (carreras) => {
          this.carrera = carreras.find(c => String(c.id) === id) ?? null;
          if (!this.carrera) { this.router.navigate(['/resultado']); return; }
          this.inicializar();
        },
        error: () => this.router.navigate(['/resultado'])
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(); this.destroy$.complete();
  }

  // ── Inicialización ────────────────────────────────────────────────────────

  inicializar(): void {
    if (!this.carrera) return;

    const set = new Set<string>();
    (this.carrera.universidad ?? []).forEach(u => {
      getConvenios(u.nombre).forEach(e => set.add(e));
    });
    this.entidadesBeca = Array.from(set).sort();

    this.isLoading = false;
  }

  // ── Datos filtrados ───────────────────────────────────────────────────────

  get universidadesFiltradas(): IUniversidad[] {
    if (!this.carrera?.universidad) return [];

    return this.obtenerUniversidadesUnicas(this.carrera.universidad).filter(u => {
      const costoMin = parseFloat(u.costoMensualMinimo);
      const costoMax = parseFloat(u.costoMensualMaximo);
      const departamento=u.departamento.nombre;

      const promedio = Math.round((costoMin + costoMax) / 2)

      const cumpleDesde = this.costoDesde == null || promedio >= this.costoDesde;
      const cumpleHasta = this.costoHasta == null || promedio <= this.costoHasta;
      const tieneBeca = this.becaFiltro === '' ||
        getConvenios(u.nombre).includes(this.becaFiltro);

      const cumpleDepartamento=this.departamento==null || departamento===this.departamento;

      return cumpleDesde && cumpleHasta && tieneBeca && cumpleDepartamento;
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
      Swal.fire('Oops..', 'Añada un desde', 'warning');
      return;
    }

    if (this.rankingHastaTemp === null) {
      Swal.fire('Oops..', 'Añada un hasta', 'warning');
      return;
    }

    if (this.rankingDesdeTemp > this.rankingHastaTemp) {
      Swal.fire('Oops..', 'El desde no puede ser mayor al hasta', 'warning');
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

  // ── Métodos del filtro de beca ────────────────────────────────────────────

  getConveniosUniversidad(nombre: string): string[] {
    return getConvenios(nombre);
  }

  // ── Modal de becas ────────────────────────────────────────────────────────
  // Muestra siempre la información real registrada en carrera.beca,
  // sin intentar adivinar a qué convenio corresponde cada una.

  abrirModalBecas(uni: IUniversidad): void {
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

  // ── Utilidades ────────────────────────────────────────────────────────────

  get universidadesUnicas(): { nombre: string; cantidadSedes: number }[] {
    if (!this.carrera?.universidad) return [];
    const mapa = new Map<string, number>();
    (this.carrera.universidad as IUniversidad[]).forEach(u => {
      const nombreBase = u.nombre.split(' - ')[0].trim();
      mapa.set(nombreBase, (mapa.get(nombreBase) ?? 0) + 1);
    });
    return Array.from(mapa.entries()).map(([nombre, cantidadSedes]) => ({
      nombre,
      cantidadSedes,
    }));
  }

  obtenerUniversidadesUnicas(universidades: any[]): any[] {
    const mapa = new Map();
    universidades.forEach(u => {
      const nombrePrincipal = u.nombre.split(' - ')[0].trim();
      if (!mapa.has(nombrePrincipal)) {
        mapa.set(nombrePrincipal, { ...u, nombre: nombrePrincipal });
      }
    });
    return Array.from(mapa.values());
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