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

// ══════════════════════════════════════════════════════════════════════════════
// CLASIFICACIÓN DE BECAS POR ORIGEN (misma lógica que detallecarrera)
// ══════════════════════════════════════════════════════════════════════════════

export type OrigenBeca = 'PRONABEC' | 'UNIVERSIDAD' | 'EMPRESA_ALIANZA';

export const ORIGEN_LABELS: Record<OrigenBeca, string> = {
  PRONABEC:        'PRONABEC',
  UNIVERSIDAD:     'Universidad',
  EMPRESA_ALIANZA: 'Empresa / Alianza',
};

const ORDEN_ORIGENES: OrigenBeca[] = ['PRONABEC', 'UNIVERSIDAD', 'EMPRESA_ALIANZA'];

const REGLAS_ORIGEN: { fragmento: string; origen: OrigenBeca }[] = [
  { fragmento: 'beca 18',                  origen: 'PRONABEC' },
  { fragmento: 'pronabec',                 origen: 'PRONABEC' },
  { fragmento: 'beca vocación de maestro', origen: 'PRONABEC' },
  { fragmento: 'beca permanencia',         origen: 'PRONABEC' },
  { fragmento: 'beca especial',            origen: 'PRONABEC' },
  { fragmento: 'beca doble oportunidad',   origen: 'PRONABEC' },
  { fragmento: 'patronato bcp',            origen: 'EMPRESA_ALIANZA' },
  { fragmento: 'backus',                   origen: 'EMPRESA_ALIANZA' },
  { fragmento: 'scotiabank',               origen: 'EMPRESA_ALIANZA' },
  { fragmento: 'rimac',                    origen: 'EMPRESA_ALIANZA' },
  { fragmento: 'alicorp',                  origen: 'EMPRESA_ALIANZA' },
  { fragmento: 'beca ejecutiva',           origen: 'EMPRESA_ALIANZA' },
  { fragmento: 'beca corporativa',         origen: 'EMPRESA_ALIANZA' },
  { fragmento: 'líderes con propósito',    origen: 'UNIVERSIDAD' },
  { fragmento: 'situación económica',      origen: 'UNIVERSIDAD' },
  { fragmento: 'socioeconómica',           origen: 'UNIVERSIDAD' },
  { fragmento: 'excelencia académica',     origen: 'UNIVERSIDAD' },
  { fragmento: 'rendimiento académico',    origen: 'UNIVERSIDAD' },
  { fragmento: 'mérito',                   origen: 'UNIVERSIDAD' },
  { fragmento: 'talento',                  origen: 'UNIVERSIDAD' },
  { fragmento: 'discapacidad',             origen: 'UNIVERSIDAD' },
  { fragmento: 'deportiva',               origen: 'UNIVERSIDAD' },
  { fragmento: 'semibeca',                 origen: 'UNIVERSIDAD' },
];

function clasificarBeca(nombreBeca: string): OrigenBeca {
  const lower = (nombreBeca ?? '').toLowerCase().trim();
  for (const regla of REGLAS_ORIGEN) {
    if (lower.includes(regla.fragmento.toLowerCase())) return regla.origen;
  }
  return 'UNIVERSIDAD';
}

// ══════════════════════════════════════════════════════════════════════════════

@Component({
  selector: 'app-sedes-universidad',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sedes-universidad.html',
  styleUrls: ['./sedes-universidad.css']
})
export class SedesUniversidad implements OnInit, OnDestroy {

  carrera: ICarrera | null = null;
  universidadNombre = '';
  /** Todas las sedes (filas) de esta universidad en esta carrera */
  todasLasSedes: IUniversidad[] = [];
  isLoading = true;
  private destroy$ = new Subject<void>();

  // ── Filtro de costo mensual ───────────────────────────────────────────────
  costoDesde: number | null = null;
  costoHasta: number | null = null;
  costoDesdeTemp: number | null = null;
  costoHastaTemp: number | null = null;
  costoDropdownOpen = false;
  readonly opcionesCosto: number[] = [500, 800, 1000, 1500, 2000, 3000, 5000];

  // ── Filtro de departamento ────────────────────────────────────────────────
  departamentoFiltro = '';
  departamentosDisponibles: string[] = [];

  // ── Filtro de origen de beca ─────────────────────────────────────────────
  origenFiltro: OrigenBeca | '' = '';
  origenesDisponibles: OrigenBeca[] = [];
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
    // El nombre de la universidad viene como query param para evitar problemas de encoding
    this.universidadNombre = decodeURIComponent(
      this.route.snapshot.queryParamMap.get('nombre') ?? ''
    );

    if (!this.universidadNombre) {
      this.volverADetalle();
      return;
    }

    const cached = localStorage.getItem('carrera_seleccionada');
    if (cached) {
      this.carrera = JSON.parse(cached);
      this.inicializar();
      return;
    }

    const id = this.route.snapshot.queryParamMap.get('carreraId');
    if (!id) { this.volverADetalle(); return; }

    this.carreraServicio.obtenerListaDeCarrera()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (carreras) => {
          this.carrera = carreras.find(c => String(c.id) === id) ?? null;
          if (!this.carrera) { this.volverADetalle(); return; }
          this.inicializar();
        },
        error: () => this.volverADetalle()
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ── Inicialización ────────────────────────────────────────────────────────

  inicializar(): void {
    if (!this.carrera) return;

    // Filtra todas las filas que corresponden a esta universidad
    const nombreBase = this.universidadNombre.split(' - ')[0].trim().toLowerCase();
    this.todasLasSedes = (this.carrera.universidad ?? []).filter(u =>
      u.nombre.toLowerCase().startsWith(nombreBase)
    );

    // Calcula orígenes disponibles de las becas de estas sedes
    const todasLasBecas = this.todasLasSedes.flatMap(u => u.beca ?? []);
    const set = new Set<OrigenBeca>(todasLasBecas.map(b => clasificarBeca(b.nombre)));
    this.origenesDisponibles = ORDEN_ORIGENES.filter(o => set.has(o));

    // Calcula departamentos únicos disponibles (ordenados alfabéticamente)
    const deptos = this.todasLasSedes
      .map(u => u.departamento?.nombre ?? '')
      .filter(Boolean);
    this.departamentosDisponibles = [...new Set(deptos)].sort();

    this.isLoading = false;
  }

  // ── Helpers de clasificación ──────────────────────────────────────────────

  getOrigenBeca(beca: IBeca): OrigenBeca { return clasificarBeca(beca.nombre); }
  getLabelOrigen(origen: OrigenBeca | string): string {
    return ORIGEN_LABELS[origen as OrigenBeca] ?? origen;
  }
  getClaseOrigen(origen: OrigenBeca | string): string {
    return 'beca-origen--' + (origen ?? '').toLowerCase().replace(/_/g, '-');
  }

  // ── Datos filtrados ───────────────────────────────────────────────────────

  get becasFiltradas(): IBeca[] {
    const becas = this.universidadModal?.beca ?? [];
    if (!this.origenFiltro) return becas;
    return becas.filter(b => this.getOrigenBeca(b) === this.origenFiltro);
  }

  get sedesFiltradas(): IUniversidad[] {
    return this.todasLasSedes.filter(u => {
      const min = parseFloat(u.costoMensualMinimo as any);
      const max = parseFloat(u.costoMensualMaximo as any);
      const cumpleDesde = this.costoDesde == null || min >= this.costoDesde;
      const cumpleHasta = this.costoHasta == null || max <= this.costoHasta;
      const cumpleOrigen = !this.origenFiltro ||
        (u.beca ?? []).some((b: IBeca) => this.getOrigenBeca(b) === this.origenFiltro);
      const cumpleDepto = !this.departamentoFiltro ||
        (u.departamento?.nombre ?? '') === this.departamentoFiltro;
      return cumpleDesde && cumpleHasta && cumpleOrigen && cumpleDepto;
    });
  }

  // ── Filtro costo ──────────────────────────────────────────────────────────

  get opcionesDesde(): number[] {
    if (this.costoHastaTemp == null) return this.opcionesCosto;
    return this.opcionesCosto.filter(v => v <= this.costoHastaTemp!);
  }

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

  onDesdeChange(): void {
    if (this.costoDesdeTemp != null && this.costoHastaTemp != null && this.costoHastaTemp < this.costoDesdeTemp)
      this.costoHastaTemp = null;
  }

  onHastaChange(): void {
    if (this.costoHastaTemp != null && this.costoDesdeTemp != null && this.costoDesdeTemp > this.costoHastaTemp)
      this.costoDesdeTemp = null;
  }

  aplicarCosto(): void {
    if (this.costoDesdeTemp != null && this.costoHastaTemp != null && this.costoDesdeTemp > this.costoHastaTemp) {
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

  seleccionarOrigen(origen: OrigenBeca | ''): void { this.origenFiltro = origen; }

  limpiarFiltros(): void {
    this.limpiarCosto();
    this.origenFiltro = '';
    this.departamentoFiltro = '';
  }

  // ── Modal ─────────────────────────────────────────────────────────────────

  abrirModalBecas(sede: IUniversidad): void {
    this.universidadModal = sede;
    this.origenFiltro = '';
    this.modalBecasAbierto = true;
  }

  cerrarModalBecas(): void {
    this.modalBecasAbierto = false;
    this.universidadModal = null;
  }

  // ── Imagen universidad ────────────────────────────────────────────────────

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

  // ── Utilidades ────────────────────────────────────────────────────────────

  obtenerPromedio(u: IUniversidad): number {
    return Math.round(
      (parseFloat(u.costoMensualMinimo as any) + parseFloat(u.costoMensualMaximo as any)) / 2
    );
  }

  formatCosto(v: number): string {
    return `S/. ${v.toLocaleString('es-PE')}`;
  }

  splitLista(texto: string): string[] {
    return texto?.split(',').map(s => s.trim()).filter(Boolean) ?? [];
  }

  tieneUrl(beca: IBeca): boolean {
    return !!(beca.url && beca.url.trim() !== '' && beca.url !== '#');
  }

  /** Extrae el nombre de la sede (la parte después del " - ") o indica sede principal */
  getNombreSede(nombreCompleto: string): string {
    const partes = nombreCompleto.split(' - ');
    return partes.length > 1 ? partes.slice(1).join(' - ') : 'Sede Principal';
  }

  volverADetalle(): void {
    const carreraId = this.carrera?.id ?? this.route.snapshot.queryParamMap.get('carreraId');
    if (carreraId) {
      this.router.navigate(['/detallecarrera', carreraId]);
    } else {
      this.router.navigate(['/resultado']);
    }
  }
}