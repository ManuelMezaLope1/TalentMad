import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CarreraServicio } from '../../../servicios/carrera/carrera-servicio';
import { ICarrera } from '../../../servicios/carrera/ICarrera';
import { IBeca } from '../../../servicios/beca/IBeca';
import { IUniversidad } from '../../../servicios/universidad/IUniversidad';
import { obtenerImagenCarrera } from '../../../servicios/carrera/imagenes-carrera';

// ══════════════════════════════════════════════════════════════════════════════
// CLASIFICACIÓN DE BECAS POR ORIGEN
//
// Lógica: la BD ya maneja qué becas tiene cada universidad (tabla universidad_beca).
// El frontend solo necesita saber a qué "grupo" pertenece cada beca para el filtro.
// Se clasifica únicamente por el nombre de la beca — sin modificar IBeca ni la BD.
//
// REGLAS DE PRIORIDAD (orden importante — se evalúa de arriba hacia abajo):
//   1. Coincidencia exacta de nombre  → más confiable
//   2. Fragmento en el nombre         → fallback general
//   Si ninguna regla aplica           → UNIVERSIDAD (beca propia por defecto)
// ══════════════════════════════════════════════════════════════════════════════

export type OrigenBeca = 'PRONABEC' | 'UNIVERSIDAD' | 'EMPRESA_ALIANZA';

export const ORIGEN_LABELS: Record<OrigenBeca, string> = {
  PRONABEC:        'PRONABEC',
  UNIVERSIDAD:     'Universidad',
  EMPRESA_ALIANZA: 'Empresa / Alianza',
};

/** Orden canónico del filtro */
const ORDEN_ORIGENES: OrigenBeca[] = ['PRONABEC', 'UNIVERSIDAD', 'EMPRESA_ALIANZA'];

/**
 * Reglas de clasificación — por fragmento del nombre (case-insensitive).
 * Agrega aquí cualquier beca nueva. El ORDEN IMPORTA: se usa la primera coincidencia.
 *
 * Becas actuales en la BD:
 *   id:3  "Beca 18"                       → PRONABEC
 *   id:4  "Beca Socioeconómica - UTP"     → UNIVERSIDAD  (beca propia de UTP)
 *   id:5  "Programa de Becas Patronato BCP"→ EMPRESA_ALIANZA
 *   id:6  "Beca por Situación Económica"  → UNIVERSIDAD  (beca propia de UCV)
 *   id:7  "Beca Líderes con Propósito"    → UNIVERSIDAD  (beca propia de UP)
 *   id:8  "Beca Socioeconómica - UCS"     → UNIVERSIDAD  (beca propia de UCS)
 */
const REGLAS_ORIGEN: { fragmento: string; origen: OrigenBeca }[] = [
  // ── PRONABEC ──────────────────────────────────────────────────────────────
  { fragmento: 'beca 18',                 origen: 'PRONABEC' },
  { fragmento: 'pronabec',                origen: 'PRONABEC' },
  { fragmento: 'beca vocación de maestro',origen: 'PRONABEC' },
  { fragmento: 'beca permanencia',        origen: 'PRONABEC' },
  { fragmento: 'beca especial',           origen: 'PRONABEC' },
  { fragmento: 'beca doble oportunidad',  origen: 'PRONABEC' },

  // ── EMPRESA / ALIANZA ─────────────────────────────────────────────────────
  { fragmento: 'patronato bcp',           origen: 'EMPRESA_ALIANZA' },
  { fragmento: 'backus',                  origen: 'EMPRESA_ALIANZA' },
  { fragmento: 'scotiabank',              origen: 'EMPRESA_ALIANZA' },
  { fragmento: 'rimac',                   origen: 'EMPRESA_ALIANZA' },
  { fragmento: 'alicorp',                 origen: 'EMPRESA_ALIANZA' },
  { fragmento: 'beca ejecutiva',          origen: 'EMPRESA_ALIANZA' },
  { fragmento: 'beca corporativa',        origen: 'EMPRESA_ALIANZA' },

  // ── UNIVERSIDAD ───────────────────────────────────────────────────────────
  // Cualquier beca con nombre de universidad específico o palabras clave
  // que indican que la financia la propia institución.
  // (No es necesario listar cada una: el fallback al final ya las cubre.)
  { fragmento: 'líderes con propósito',   origen: 'UNIVERSIDAD' },
  { fragmento: 'situación económica',     origen: 'UNIVERSIDAD' },
  { fragmento: 'socioeconómica',          origen: 'UNIVERSIDAD' },
  { fragmento: 'excelencia académica',    origen: 'UNIVERSIDAD' },
  { fragmento: 'rendimiento académico',   origen: 'UNIVERSIDAD' },
  { fragmento: 'mérito',                  origen: 'UNIVERSIDAD' },
  { fragmento: 'talento',                 origen: 'UNIVERSIDAD' },
  { fragmento: 'discapacidad',            origen: 'UNIVERSIDAD' },
  { fragmento: 'deportiva',               origen: 'UNIVERSIDAD' },
  { fragmento: 'semibeca',                origen: 'UNIVERSIDAD' },
];

/**
 * Clasifica una beca según su nombre.
 * No modifica IBeca ni la base de datos.
 */
function clasificarBeca(nombreBeca: string): OrigenBeca {
  const lower = (nombreBeca ?? '').toLowerCase().trim();
  for (const regla of REGLAS_ORIGEN) {
    if (lower.includes(regla.fragmento.toLowerCase())) {
      return regla.origen;
    }
  }
  // Fallback: si no coincide ninguna regla, se asume beca propia de universidad
  return 'UNIVERSIDAD';
}

// ══════════════════════════════════════════════════════════════════════════════

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

  // ── Filtro de costo mensual ───────────────────────────────────────────────
  costoDesde: number | null = null;
  costoHasta: number | null = null;
  costoDesdeTemp: number | null = null;
  costoHastaTemp: number | null = null;
  costoDropdownOpen = false;

  /** Valores canónicos del dropdown de costo */
  readonly opcionesCosto: number[] = [500, 800, 1000, 1500, 2000, 3000, 5000];

  // ── Filtro de origen de beca ─────────────────────────────────────────────
  origenFiltro: OrigenBeca | '' = '';

  /**
   * Orígenes que tienen al menos una beca real en esta carrera.
   * Se calcula en inicializar() y respeta el orden canónico.
   */
  origenesDisponibles: OrigenBeca[] = [];

  /** Lista tipada para el template — evita indexar objetos directamente */
  readonly origenesLista: { key: OrigenBeca; label: string }[] = ORDEN_ORIGENES.map(k => ({
    key: k,
    label: ORIGEN_LABELS[k],
  }));

  // ── Modal ─────────────────────────────────────────────────────────────────
  modalBecasAbierto = false;
  universidadModal: IUniversidad | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private carreraServicio: CarreraServicio
  ) {}

  ngOnInit(): void {
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
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ── Inicialización ────────────────────────────────────────────────────────

  inicializar(): void {
    if (!this.carrera) return;
    console.log(this.carrera.universidad);
    // Calcula qué orígenes tienen al menos una beca en esta carrera.
    // Respeta el orden canónico (PRONABEC → UNIVERSIDAD → EMPRESA_ALIANZA).
    const todasLasBecas = this.carrera.universidad
  ?.flatMap(u => u.beca ?? []) ?? [];


const set = new Set<OrigenBeca>(
  todasLasBecas.map(b => clasificarBeca(b.nombre))
);
    this.origenesDisponibles = ORDEN_ORIGENES.filter(o => set.has(o));

    this.isLoading = false;
  }

  // ── Helpers de clasificación ──────────────────────────────────────────────

  /** Devuelve el origen clasificado de una beca (para el template) */
  getOrigenBeca(beca: IBeca): OrigenBeca {
    return clasificarBeca(beca.nombre);
  }

  /** Etiqueta legible del origen */
  getLabelOrigen(origen: OrigenBeca | string): string {
    return ORIGEN_LABELS[origen as OrigenBeca] ?? origen;
  }

  /** Clase CSS semántica del origen (para colores del tag) */
  getClaseOrigen(origen: OrigenBeca | string): string {
    return 'beca-origen--' + (origen ?? '').toLowerCase().replace(/_/g, '-');
  }

  // ── Helpers de imagen ─────────────────────────────────────────────────────

  getImagenCarrera(): string {
    return obtenerImagenCarrera(this.carrera?.id ?? 1, 1200, 400);
  }

  getImagenUniversidad(nombre: string): string {
    const mapa: { [k: string]: string } = {
      'Pontificia Universidad Católica del Perú':   'pucp.jpg',
      'Universidad Andina del Cusco':               'uac.jpg',
      'Universidad Peruana de Ciencias Aplicadas':  'upc.jpeg',
      'Universidad César Vallejo':                  'ucv.jpg',
      'Universidad de Lima':                        'ul.jpg',
      'Universidad de Ingeniería y Tecnología':     'utec.jpg',
      'Universidad Continental':                    'uc.jpg',
      'Universidad Tecnológica del Perú':           'utp.jpeg',
      'Universidad Privada del Norte':              'upn.jpeg',
      'Universidad de San Martín de Porres':        'usmp.jpg',
      'Universidad Esan':                           'esan.jpg',
      'Universidad Peruana Cayetano Heredia':       'upch.jpeg',
      'Universidad del Pacífico':                   'up.jpg',
      'Universidad Científica del Sur':             'ucs.jpg',
    };
    for (const prefix of Object.keys(mapa)) {
      if (nombre.startsWith(prefix)) return mapa[prefix];
    }
    return `https://picsum.photos/seed/uni-${nombre.length * 7}/400/220`;
  }

  getUrlUniversidad(nombre: string): string {
    const mapa: { [k: string]: string } = {
      'Pontificia Universidad Católica del Perú':   'https://www.pucp.edu.pe/',
      'Universidad Andina del Cusco':               'https://www.uandina.edu.pe/',
      'Universidad Antonio Ruiz de Montoya':        'https://www.uarm.edu.pe/',
      'Universidad Católica de Trujillo':           'https://uct.edu.pe/',
      'Universidad Católica de San Pablo':          'https://ucsp.edu.pe/',
      'Universidad Peruana de Ciencias Aplicadas':  'https://www.upc.edu.pe/',
      'Universidad César Vallejo':                  'https://www.ucv.edu.pe/',
      'Universidad Científica del Sur':             'https://www.cientifica.edu.pe/',
      'Universidad Continental':                    'https://ucontinental.edu.pe/',
      'Universidad de Ingeniería y Tecnología':     'https://utec.edu.pe/',
      'Universidad de Lima':                        'https://www.ulima.edu.pe/',
      'Universidad de Piura':                       'https://www.udep.edu.pe/',
      'Universidad de San Martín de Porres':        'https://usmp.edu.pe/',
      'Universidad Esan':                           'https://www.ue.edu.pe/pregrado/',
      'Universidad Peruana Cayetano Heredia':       'https://cayetano.edu.pe/',
      'Universidad Católica Sedes Sapientiae':      'https://www.ucss.edu.pe/',
      'Universidad Peruana Los Andes':              'https://upla.edu.pe/',
      'Universidad Privada Antenor Orrego':         'https://upao.edu.pe/',
      'Universidad Privada de Tacna':               'https://portal.upt.edu.pe/site/web/contenido/inicio',
      'Universidad Privada del Norte':              'https://www.upn.edu.pe/',
      'Universidad Privada San Ignacio de Loyola':  'https://usil.edu.pe/',
      'Universidad Tecnológica del Perú':           'https://www.utp.edu.pe/',
      'Universidad del Pacífico':                   'https://www.up.edu.pe/',
      'Universidad Nacional Mayor de San Marcos':   'https://www.unmsm.edu.pe/',
    };
    for (const prefix of Object.keys(mapa)) {
      if (nombre.startsWith(prefix)) return mapa[prefix];
    }
    return '#';
  }

  // ── Datos filtrados ───────────────────────────────────────────────────────

  get becasFiltradas(): IBeca[] {
    const becas = this.universidadModal?.beca ?? [];
    if (!this.origenFiltro) return becas;
    return becas.filter(b => this.getOrigenBeca(b) === this.origenFiltro);
  }

  get universidadesFiltradas(): IUniversidad[] {
    if (!this.carrera?.universidad) return [];
    return this.obtenerUniversidadesUnicas(this.carrera.universidad).filter(u => {
      const min = parseFloat(u.costoMensualMinimo as any);
      const max = parseFloat(u.costoMensualMaximo as any);
      const cumpleDesde = this.costoDesde == null || min >= this.costoDesde;

const cumpleHasta = this.costoHasta == null || max <= this.costoHasta;
      const cumpleOrigen = !this.origenFiltro ||
        (u.beca ?? []).some((b: IBeca) => this.getOrigenBeca(b) === this.origenFiltro);
      return cumpleDesde && cumpleHasta && cumpleOrigen;
    });
  }

  // ── Filtro costo — dropdowns de rango inteligente ────────────────────────

  /**
   * Opciones válidas para "Desde":
   * si hay un "Hasta" seleccionado, solo muestra valores ≤ costoHastaTemp.
   */
  get opcionesDesde(): number[] {
    if (this.costoHastaTemp == null) return this.opcionesCosto;
    return this.opcionesCosto.filter(v => v <= this.costoHastaTemp!);
  }

  /**
   * Opciones válidas para "Hasta":
   * si hay un "Desde" seleccionado, solo muestra valores ≥ costoDesdeTemp.
   */
  get opcionesHasta(): number[] {
    if (this.costoDesdeTemp == null) return this.opcionesCosto;
    return this.opcionesCosto.filter(v => v >= this.costoDesdeTemp!);
  }

  toggleCostoDropdown(): void {
    if (!this.costoDropdownOpen) {
      this.costoDesdeTemp = this.costoDesde;
      this.costoHastaTemp = this.costoHasta;
    }
    this.costoDropdownOpen = !this.costoDropdownOpen;
  }

  /**
   * Al cambiar "Desde": si el valor actual de "Hasta" queda por debajo, lo resetea.
   */
  onDesdeChange(): void {
    if (
      this.costoDesdeTemp != null &&
      this.costoHastaTemp != null &&
      this.costoHastaTemp < this.costoDesdeTemp
    ) {
      this.costoHastaTemp = null;
    }
  }

  /**
   * Al cambiar "Hasta": si el valor actual de "Desde" queda por encima, lo resetea.
   */
  onHastaChange(): void {
    if (
      this.costoHastaTemp != null &&
      this.costoDesdeTemp != null &&
      this.costoDesdeTemp > this.costoHastaTemp
    ) {
      this.costoDesdeTemp = null;
    }
  }

 aplicarCosto(): void {

  if (
    this.costoDesdeTemp != null &&
    this.costoHastaTemp != null &&
    this.costoDesdeTemp > this.costoHastaTemp
  ) {
    alert('El valor desde no puede ser mayor al valor hasta');
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
    if (this.costoDesde != null && this.costoHasta != null)
      return `${this.formatCosto(this.costoDesde)} – ${this.formatCosto(this.costoHasta)}`;
    if (this.costoHasta != null) return `Hasta ${this.formatCosto(this.costoHasta)}`;
    return `Desde ${this.formatCosto(this.costoDesde as number)}`;
  }

  // ── Filtro origen ─────────────────────────────────────────────────────────

  seleccionarOrigen(origen: OrigenBeca | ''): void {
    this.origenFiltro = origen;
  }

  // ── Modal ─────────────────────────────────────────────────────────────────

  abrirModalBecas(uni: IUniversidad): void {
    this.universidadModal = uni;
    this.modalBecasAbierto = true;
  }

  cerrarModalBecas(): void {
    this.modalBecasAbierto = false;
    this.universidadModal = null;
  }

  // ── Utilidades ────────────────────────────────────────────────────────────

  obtenerUniversidadesUnicas(universidades: any[]): any[] {
    const mapa = new Map<string, any>();
    universidades.forEach(u => {
      const nombrePrincipal = u.nombre.split(' - ')[0].trim();
      if (!mapa.has(nombrePrincipal)) {
        mapa.set(nombrePrincipal, { ...u, nombre: nombrePrincipal });
      }
    });
    return Array.from(mapa.values());
  }

  obtenerPromedio(u: IUniversidad): number {
    return Math.round(
      (parseFloat(u.costoMensualMinimo as any) + parseFloat(u.costoMensualMaximo as any)) / 2
    );
  }

  formatCosto(v: number): string {
    return `S/. ${v.toLocaleString('es-PE')}`;
  }

  limpiarFiltros(): void {
    this.limpiarCosto();
    this.origenFiltro = '';
  }

  volver(): void { this.router.navigate(['/resultado']); }

  splitLista(texto: string): string[] {
    return texto?.split(',').map(s => s.trim()).filter(Boolean) ?? [];
  }

  tieneUrl(beca: IBeca): boolean {
    return !!(beca.url && beca.url.trim() !== '' && beca.url !== '#');
  }
}