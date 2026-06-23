import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, Subject, takeUntil, tap, throwError } from 'rxjs';
import { ICarrera } from '../../../servicios/carrera/ICarrera';
import { CarreraServicio } from '../../../servicios/carrera/carrera-servicio';
import { obtenerImagenCarrera } from '../../../servicios/carrera/imagenes-carrera';
import * as bootstrap from 'bootstrap';
import { FormsModule } from '@angular/forms';
import { Historial } from '../../../servicios/historial/Historial';
import { UsuarioServicio } from '../../../servicios/usuario/usuario-servicio';
import { HistorialServicio } from '../../../servicios/historial/historial-servicio';
import Swal from 'sweetalert2';

interface RespuestaGuardada { [preguntaTexto: string]: number; }
interface CategoriaPregunta {
  id: number; nombre: string; preguntas: { preguntas: string }[];
}
interface PuntajeItem {
  categoria: string; puntaje: number; puntajeMaximo: number; id: number;
}

// ─────────────────────────────────────────────────────────────────────────────

@Component({
  selector: 'app-resultado',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './resultado.html',
  styleUrls: ['./resultado.css']
})
export class Resultado implements OnInit, OnDestroy {

  carreras$!: Observable<ICarrera[]>;
  carrerasFiltradas$!: Observable<ICarrera[]>;

  codigoRIASEC = '';
  top3: PuntajeItem[] = [];
  todosPuntajes: PuntajeItem[] = [];
  isLoading = true;
  private destroy$ = new Subject<void>();

  axisLines: { x1: number; y1: number; x2: number; y2: number }[] = [];
  radarVertices: { x: number; y: number }[] = [];
  radarLabels: { x: number; y: number; text: string }[] = [];

  private readonly RADAR_RADIUS = 120;
  private readonly LABEL_OFFSET = 22;

  private barColors = [
    'linear-gradient(90deg, #f97316, #fb923c)',
    'linear-gradient(90deg, #6366f1, #818cf8)',
    'linear-gradient(90deg, #22c55e, #4ade80)',
    'linear-gradient(90deg, #14b8a6, #2dd4bf)',
    'linear-gradient(90deg, #eab308, #facc15)',
    'linear-gradient(90deg, #a855f7, #c084fc)',
  ];

  private descripciones: { [key: string]: string } = {
    'Realista': 'Personas prácticas, físicas y mecánicas. Prefieren actividades concretas con resultados tangibles.',
    'Investigador': 'Analíticos, curiosos e intelectualmente orientados. Disfrutan resolver problemas complejos.',
    'Artístico': 'Creativos, expresivos e imaginativos. Valoran la originalidad y prefieren entornos sin estructura rígida.',
    'Social': 'Empáticos, cooperativos y orientados a las personas. Disfrutan ayudar y trabajar en equipo.',
    'Emprendedor': 'Ambiciosos, persuasivos y orientados al liderazgo. Les gusta influenciar y liderar proyectos.',
    'Convencional': 'Ordenados, precisos y orientados a los detalles. Prefieren entornos estructurados.',
  };

  mapaLetras: { [key: string]: string } = {
    'Realista': 'R', 'Investigador': 'I', 'Artístico': 'A',
    'Social': 'S', 'Emprendedor': 'E', 'Convencional': 'C',
  };

  private ordenRIASEC = ['Realista', 'Investigador', 'Artístico', 'Social', 'Emprendedor', 'Convencional'];

  constructor(private carreraServicio: CarreraServicio, private router: Router, private usuarioServicio: UsuarioServicio, private historialServicio: HistorialServicio, private cd: ChangeDetectorRef) { }

  // ── Imagen por carrera ────────────────────────────────────────────────────
  // Busca primero en el mapa por id; si no hay URL registrada, usa picsum con
  // la id como seed para que cada carrera tenga siempre la misma imagen aleatoria.
 getImagenCarrera(carrera: ICarrera): string {
  return obtenerImagenCarrera(carrera.id, 600, 340);
}
  ngOnInit(): void {
    this.carreras$ = this.carreraServicio.obtenerListaDeCarrera();
    this.cargarResultados();

    this.usuarioServicio.obtenerPerfil().pipe(
      tap(data => {
        this.usuario = data;
        this.historial.usuario = {
          id: this.usuario.id
        };
        this.historial.username = this.usuario.username
        this.cd.detectChanges();
      }),
      catchError(error => {
        console.error(error);
        this.usuario = null;
        return of(null);
      }),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  cargarResultados(): void {
    try {
      const respuestasGuardadas = localStorage.getItem('respuestas_test_riasec');
      const categoriasGuardadas = localStorage.getItem('categorias_test_riasec');
      if (!respuestasGuardadas || !categoriasGuardadas) {
        this.router.navigate(['/preguntas']); return;
      }
      const respuestas: RespuestaGuardada = JSON.parse(respuestasGuardadas);
      const categorias: CategoriaPregunta[] = JSON.parse(categoriasGuardadas);

      this.todosPuntajes = this.calcularPuntajesPorCategoria(respuestas, categorias);
      const primeros3 = this.todosPuntajes.slice(0, 3);
      const puntajeLimite = primeros3[2]?.puntaje ?? 0;
      this.top3 = this.todosPuntajes.filter(item => item.puntaje >= puntajeLimite);
      this.codigoRIASEC = this.generarCodigoRIASEC(this.top3);

      this.carrerasFiltradas$ = this.carreras$.pipe(
        map(carreras => carreras.filter(car =>
          car.combinacion.split(',').map(c => c.trim()).includes(this.codigoRIASEC)
        ))
      );

        map(carreras =>
          carreras.filter(car =>
            car.combinacion
              .split(",")
              .map(c => c.trim())
              .includes(this.codigoRIASEC)
          )
        )
      );

      const mapa = Object.fromEntries(
        this.todosPuntajes.map(item => [item.categoria, item])
      );

      this.historial.puntaje_realista = mapa['Realista'].puntaje;
      this.historial.puntaje_investigador = mapa['Investigador'].puntaje;
      this.historial.puntaje_artistico = mapa['Artístico'].puntaje;
      this.historial.puntaje_social = mapa['Social'].puntaje;
      this.historial.puntaje_emprendedor = mapa['Emprendedor'].puntaje;
      this.historial.puntaje_convencional = mapa['Convencional'].puntaje;

      this.historial.codigo = this.codigoRIASEC;
      this.historial.fecha = new Date().toLocaleString();

      this.carrerasFiltradas$.subscribe(carreras => {
        this.historial.carreras = carreras
          .map(car => car.nombre)
          .join(', ');
      });

      this.buildRadarGeometry();
      this.isLoading = false;
    } catch (error) {
      console.error('Error al cargar resultados:', error);
      this.isLoading = false;
    }
  }

  calcularPuntajesPorCategoria(
    respuestas: RespuestaGuardada,
    categorias: CategoriaPregunta[]
  ): PuntajeItem[] {
    const puntajes: { [id: number]: { nombre: string; puntaje: number; puntajeMaximo: number } } = {};
    categorias.forEach(cat => {
      puntajes[cat.id] = { nombre: cat.nombre, puntaje: 0, puntajeMaximo: (cat.preguntas?.length ?? 0) * 5 };
    });
    for (const [preguntaTexto, respuesta] of Object.entries(respuestas)) {
      for (const categoria of categorias) {
        if (categoria.preguntas?.find(p => p.preguntas === preguntaTexto)) {
          puntajes[categoria.id].puntaje += Number(respuesta); break;
        }
      }
    }
    return Object.entries(puntajes)
      .map(([id, data]) => ({ categoria: data.nombre, puntaje: data.puntaje, puntajeMaximo: data.puntajeMaximo, id: parseInt(id) }))
      .sort((a, b) => b.puntaje - a.puntaje);
  }

  generarCodigoRIASEC(top3: PuntajeItem[]): string {
    return top3.map(item => this.mapaLetras[item.categoria] || item.categoria.charAt(0)).join('');
  }

  buildRadarGeometry(): void {
    const n = 6;
    this.axisLines = []; this.radarVertices = []; this.radarLabels = [];
    for (let i = 0; i < n; i++) {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      this.axisLines.push({ x1: 0, y1: 0, x2: Math.cos(angle) * this.RADAR_RADIUS, y2: Math.sin(angle) * this.RADAR_RADIUS });
      this.radarLabels.push({
        x: Math.cos(angle) * (this.RADAR_RADIUS + this.LABEL_OFFSET),
        y: Math.sin(angle) * (this.RADAR_RADIUS + this.LABEL_OFFSET),
        text: this.ordenRIASEC[i]
      });
    }
    const puntajeMap = Object.fromEntries(this.todosPuntajes.map(p => [p.categoria, p]));
    for (let i = 0; i < n; i++) {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      const item = puntajeMap[this.ordenRIASEC[i]];
      const ratio = item && item.puntajeMaximo > 0 ? item.puntaje / item.puntajeMaximo : 0;
      const r = ratio * this.RADAR_RADIUS;
      this.radarVertices.push({ x: Math.cos(angle) * r, y: Math.sin(angle) * r });
    }
  }

  getHexPoints(r: number): string {
    return Array.from({ length: 6 }, (_, i) => {
      const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2;
      return `${Math.cos(angle) * r},${Math.sin(angle) * r}`;
    }).join(' ');
  }

  getRadarPoints(): string { return this.radarVertices.map(v => `${v.x},${v.y}`).join(' '); }
  getPorcentaje(item: PuntajeItem): number {
    return !item || item.puntajeMaximo === 0 ? 0 : Math.round((item.puntaje / item.puntajeMaximo) * 100);
  }
  getBarColor(index: number): string { return this.barColors[index % this.barColors.length]; }
  getDescripcion(categoria: string): string { return this.descripciones[categoria] ?? ''; }

  verDetalleCarrera(carrera: ICarrera): void {
    localStorage.setItem('carrera_seleccionada', JSON.stringify(carrera));
    this.router.navigate(['/detallecarrera', carrera.id]);
  }

  volverATest(): void { this.router.navigate(['/preguntas']); }

  reiniciarTest(): void {
    localStorage.removeItem('respuestas_test_riasec');
    localStorage.removeItem('currentProgress_riasec');
    localStorage.removeItem('categorias_test_riasec');
    this.router.navigate(['/preguntas']).then(() => window.location.reload());
  }
}
