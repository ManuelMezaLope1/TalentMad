import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IBeca } from '../../../servicios/beca/IBeca';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, Subject, takeUntil, tap } from 'rxjs';
import { CarreraServicio } from '../../../servicios/carrera/carrera-servicio';
import { ICarrera } from '../../../servicios/carrera/ICarrera';
import { IUniversidad } from '../../../servicios/universidad/IUniversidad';
import { UniversidadServicio } from '../../../servicios/universidad/universidad-servicio';
import { OrigenBeca } from '../../admin/origen-beca/origen-beca';

@Component({
  selector: 'app-sedes-universidad',
  imports: [CommonModule, FormsModule],
  templateUrl: './sedes-universidad.html',
  styleUrl: './sedes-universidad.css',
})

export class SedesUniversidad implements OnInit, OnDestroy {
  carrera: ICarrera | null = null;
  carreraNombre: any;
  universidadNombre = '';
  universidadImagen: any | null = null;
  universidadUrl: any | null = null;
  /** Todas las sedes (filas) de esta universidad en esta carrera */
  todasLasSedes: any[] = [];
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

  // ── Modal ─────────────────────────────────────────────────────────────────
  modalBecasAbierto = false;
  universidadModal: IUniversidad | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private carreraServicio: CarreraServicio,
    private universidadServicio: UniversidadServicio,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    // El nombre de la universidad viene como query param para evitar problemas de encoding
    this.universidadNombre = decodeURIComponent(
      this.route.snapshot.queryParamMap.get('nombre') ?? ''
    );

    this.universidadServicio.obtenerImagenDeUniversidad(this.universidadNombre).pipe(
      tap(dato => {
        this.universidadImagen = dato.imagen;
        this.universidadUrl = dato.url;
        this.cd.detectChanges()
      }),
      catchError(err => {
        console.error(err);
        return of(null)
      })
    ).subscribe()

    const id = this.route.snapshot.queryParams['carreraId'];
    if (!id) { this.volverADetalle(); return; }


    this.universidadServicio.obtenerSedes(this.universidadNombre, id).pipe(
      tap(dato => {
        this.todasLasSedes = dato;

        const deptos = this.todasLasSedes
          .map(u => u.departamento ?? '')
          .filter(Boolean);
        this.departamentosDisponibles = [...new Set(deptos)].sort();

        this.cd.detectChanges();
      }),
      catchError(err => {
        console.error(err);
        return of(null)
      })
    ).subscribe()

    this.carreraServicio.obtenerCarreraPorId(id).pipe(
      tap(dato=>{
        this.carreraNombre=dato.nombre
        this.cd.detectChanges();
      }),
      catchError(err=>{
        console.error(err)
        return of(null)
      })
    ).subscribe()
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get sedesFiltradas(): IUniversidad[] {
    return this.todasLasSedes.filter(u => {
      const total = u.total / 6;
      const cumpleDesde = this.costoDesde == null || total >= this.costoDesde;
      const cumpleHasta = this.costoHasta == null || total <= this.costoHasta;
      const cumpleDepto = !this.departamentoFiltro ||
        (u.departamento ?? '') === this.departamentoFiltro;
      return cumpleDesde && cumpleHasta && cumpleDepto;
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

  // ── Utilidades ────────────────────────────────────────────────────────────
  formatCosto(v: number): string {
    return v.toLocaleString('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
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
