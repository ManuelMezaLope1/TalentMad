import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CarreraServicio } from '../../../servicios/carrera/carrera-servicio';
import { ICarrera } from '../../../servicios/carrera/ICarrera';
import { IUniversidad } from '../../../servicios/universidad/IUniversidad';
import { obtenerImagenCarrera } from '../../../servicios/carrera/imagenes-carrera';

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

  costoDropdownOpen = false;

  /** Atajos rápidos de "hasta" — ajusta estos valores si tu data usa otra escala. */
  opcionesCosto: number[] = [500, 1000, 1500, 2000, 3000, 5000];

  // ── Filtro de beca ───────────────────────────────────────────────────────────
  becaFiltro: string = '';
  entidadesBeca: string[] = [];

  // ── Modal de becas ───────────────────────────────────────────────────────────
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

  // ── Helpers de imagen ─────────────────────────────────────────────────────

  getImagenCarrera(): string {
    const id = this.carrera?.id ?? 1;
    return obtenerImagenCarrera(id, 1200, 400);
  }

  getImagenUniversidad(nombre: string): string {
    const mapa: { [k: string]: string } = {
      'Pontificia Universidad Católica del Perú': 'pucp.jpg',
      'Universidad Andina del Cusco': 'uac.jpg',
      'Universidad Peruana de Ciencias Aplicadas': 'upc.jpeg',
      'Universidad César Vallejo': 'ucv.jpg',
      'Universidad de Lima': 'ul.jpg',
      'Universidad de Ingeniería y Tecnología': 'utec.jpg',
      'Universidad Continental': 'uc.jpg',
      'Universidad Tecnológica del Perú': 'utp.jpeg',
      'Universidad Privada del Norte': 'upn.jpeg',
      'Universidad de San Martín de Porres': 'usmp.jpg',
      'Universidad Esan': 'esan.jpg',
      'Universidad Peruana Cayetano Heredia': 'upch.jpeg',
    };
    for (const prefix of Object.keys(mapa)) {
      if (nombre.startsWith(prefix)) return mapa[prefix];
    }
    const seed = nombre.length * 7;
    return `https://picsum.photos/seed/uni-${seed}/400/220`;
  }

  getUrlUniversidad(nombre: string): string {
    const mapa: { [k: string]: string } = {
      'Pontificia Universidad Católica del Perú': 'https://www.pucp.edu.pe/',
      'Universidad Andina del Cusco': 'https://www.uandina.edu.pe/',
      'Universidad Antonio Ruiz de Montoya': 'https://www.uarm.edu.pe/',
      'Universidad Católica de Trujillo': 'https://uct.edu.pe/',
      'Universidad Católica de San Pablo': 'https://ucsp.edu.pe/',
      'Universidad Peruana de Ciencias Aplicadas': 'https://www.upc.edu.pe/',
      'Universidad César Vallejo': 'https://www.ucv.edu.pe/',
      'Universidad Científica del Sur': 'https://www.cientifica.edu.pe/',
      'Universidad Continental': 'https://ucontinental.edu.pe/',
      'Universidad de Ingeniería y Tecnología': 'https://utec.edu.pe/',
      'Universidad de Lima': 'https://www.ulima.edu.pe/',
      'Universidad de Piura': 'https://www.udep.edu.pe/',
      'Universidad de San Martín de Porres': 'https://usmp.edu.pe/',
      'Universidad Esan': 'https://www.ue.edu.pe/pregrado/',
      'Universidad Peruana Cayetano Heredia': 'https://cayetano.edu.pe/',
      'Universidad Católica Sedes Sapientiae': 'https://www.ucss.edu.pe/',
      'Universidad Peruana Los Andes': 'https://upla.edu.pe/',
      'Universidad Privada Antenor Orrego': 'https://upao.edu.pe/',
      'Universidad Privada de Tacna': 'https://portal.upt.edu.pe/site/web/contenido/inicio',
      'Universidad Privada del Norte': 'https://www.upn.edu.pe/',
      'Universidad Privada San Ignacio de Loyola': 'https://usil.edu.pe/',
      'Universidad Tecnológica del Perú': 'https://www.utp.edu.pe/',
    };
    for (const prefix of Object.keys(mapa)) {
      if (nombre.startsWith(prefix)) return mapa[prefix];
    }
    return '#';
  }

  // ── Datos filtrados ───────────────────────────────────────────────────────

  get universidadesFiltradas(): IUniversidad[] {
    if (!this.carrera?.universidad) return [];

    return this.obtenerUniversidadesUnicas(this.carrera.universidad).filter(u => {
      const costoMin = parseFloat(u.costoMensualMinimo);
      const costoMax = parseFloat(u.costoMensualMaximo);

      const cumpleDesde = this.costoDesde == null || costoMax >= this.costoDesde;
      const cumpleHasta = this.costoHasta == null || costoMin <= this.costoHasta;
      const tieneBeca = this.becaFiltro === '' ||
          getConvenios(u.nombre).includes(this.becaFiltro);

      return cumpleDesde && cumpleHasta && tieneBeca;
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

  seleccionarPresetCosto(valor: number): void {
    this.costoHastaTemp = valor;
  }

  aplicarCosto(): void {
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

  // ── Utilidades ────────────────────────────────────────────────────────────

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
    this.becaFiltro = '';
  }

  volver(): void {
    this.router.navigate(['/resultado']);
  }

  splitLista(texto: string): string[] {
    return texto?.split(',').map(s => s.trim()).filter(Boolean) ?? [];
  }
}