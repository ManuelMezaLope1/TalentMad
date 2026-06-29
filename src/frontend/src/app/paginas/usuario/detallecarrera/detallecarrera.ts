import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CarreraServicio } from '../../../servicios/carrera/carrera-servicio';
import { ICarrera } from '../../../servicios/carrera/ICarrera';
import { IUniversidad } from '../../../servicios/universidad/IUniversidad';
import { obtenerImagenCarrera } from '../../../servicios/carrera/imagenes-carrera';

@Component({
  selector: 'app-detalle-carrera',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detallecarrera.html',
  styleUrls: ['./detallecarrera.css']
})
export class DetalleCarrera implements OnInit, OnDestroy {

  carrera: ICarrera | null = null;
  isLoading = true;
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private carreraServicio: CarreraServicio
  ) {}

  ngOnInit(): void {
    const cached = localStorage.getItem('carrera_seleccionada');
    if (cached) {
      this.carrera = JSON.parse(cached);
      this.isLoading = false;
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
          this.isLoading = false;
        },
        error: () => this.router.navigate(['/resultado'])
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ── Helpers ───────────────────────────────────────────────────────────────

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

  /**
   * Colapsa todas las filas de una universidad (sedes múltiples) en una sola
   * entrada usando el nombre base (antes del " - ").
   */
  get universidadesUnicas(): { nombre: string; imagen: string; cantidadSedes: number }[] {
    if (!this.carrera?.universidad) return [];
    const mapa = new Map<string, number>();
    (this.carrera.universidad as IUniversidad[]).forEach(u => {
      const nombreBase = u.nombre.split(' - ')[0].trim();
      mapa.set(nombreBase, (mapa.get(nombreBase) ?? 0) + 1);
    });
    return Array.from(mapa.entries()).map(([nombre, cantidadSedes]) => ({
      nombre,
      imagen: this.getImagenUniversidad(nombre),
      cantidadSedes,
    }));
  }

  irASedes(nombreUniversidad: string): void {
    this.router.navigate(['/sedes-universidad'], {
      queryParams: {
        nombre: encodeURIComponent(nombreUniversidad),
        carreraId: this.carrera?.id,
      }
    });
  }

  volver(): void { this.router.navigate(['/resultado']); }
}