import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, Subject } from 'rxjs';
import { ICarrera } from '../../../servicios/carrera/ICarrera';

interface RespuestaGuardada {
  [preguntaTexto: string]: number;
}

interface CategoriaPregunta {
  id: number;
  nombre: string;
  preguntas: { preguntas: string }[];
}

interface PuntajeItem {
  categoria: string;
  puntaje: number;
  puntajeMaximo: number;
  id: number;
}

@Component({
  selector: 'app-resultado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resultado.html',
  styleUrls: ['./resultado.css']
})
export class Resultado implements OnInit, OnDestroy {

  carreras: ICarrera[] = [];
  carreras$!: Observable<ICarrera[]>;
  carrerasFiltradas$: Observable<any[]>;
  codigoRIASEC: string = '';
  top3: PuntajeItem[] = [];
  todosPuntajes: PuntajeItem[] = [];
  isLoading: boolean = true;
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
    'Realista': 'Personas prácticas, físicas y mecánicas. Prefieren actividades concretas con resultados tangibles. Son honestos, estables y persistentes.',
    'Investigador': 'Analíticos, curiosos e intelectualmente orientados. Disfrutan resolver problemas complejos y comprender el mundo a través de la ciencia y la investigación.',
    'Artístico': 'Creativos, expresivos e imaginativos. Valoran la originalidad y prefieren entornos sin estructura rígida donde puedan crear y explorar libremente.',
    'Social': 'Empáticos, cooperativos y orientados a las personas. Disfrutan ayudar, enseñar y trabajar en equipo para mejorar el bienestar de los demás.',
    'Emprendedor': 'Ambiciosos, persuasivos y orientados al liderazgo. Les gusta influenciar, liderar proyectos y asumir riesgos calculados para alcanzar metas.',
    'Convencional': 'Ordenados, precisos y orientados a los detalles. Prefieren entornos estructurados con procedimientos claros y resultados medibles y verificables.',
  };

  mapaLetras: { [key: string]: string } = {
    'Realista': 'R',
    'Investigador': 'I',
    'Artístico': 'A',
    'Social': 'S',
    'Emprendedor': 'E',
    'Convencional': 'C',
  };

  private ordenRIASEC = ['Realista', 'Investigador', 'Artístico', 'Social', 'Emprendedor', 'Convencional'];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.cargarResultados();
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
        this.router.navigate(['/preguntas']);
        return;
      }

      const respuestas: RespuestaGuardada = JSON.parse(respuestasGuardadas);
      const categorias: CategoriaPregunta[] = JSON.parse(categoriasGuardadas);

      this.todosPuntajes = this.calcularPuntajesPorCategoria(respuestas, categorias);

      const primeros3 = this.todosPuntajes.slice(0, 3);
      const puntajeLimite = primeros3[2]?.puntaje ?? 0;
      this.top3 = this.todosPuntajes.filter((item) => item.puntaje >= puntajeLimite);

      this.codigoRIASEC = this.generarCodigoRIASEC(this.top3);
      this.buildRadarGeometry();
      this.isLoading = false;

this.carrerasFiltradas$ = this.carreras$.pipe(
        map(carreras =>
          carreras.filter(car =>
            car.combinacion.includes(this.codigoRIASEC)
          )
        )
      )

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

    // Máximo teórico = número de preguntas de la categoría × 5
    categorias.forEach((cat) => {
      const cantidadPreguntas = cat.preguntas?.length ?? 0;
      puntajes[cat.id] = {
        nombre: cat.nombre,
        puntaje: 0,
        puntajeMaximo: cantidadPreguntas * 5,
      };
    });

    // Acumular respuestas en su categoría
    for (const [preguntaTexto, respuesta] of Object.entries(respuestas)) {
      for (const categoria of categorias) {
        const encontrada = categoria.preguntas?.find((p) => p.preguntas === preguntaTexto);
        if (encontrada) {
          puntajes[categoria.id].puntaje += Number(respuesta);
          break;
        }
      }
    }

    return Object.entries(puntajes)
      .map(([id, data]) => ({
        categoria: data.nombre,
        puntaje: data.puntaje,
        puntajeMaximo: data.puntajeMaximo,
        id: parseInt(id),
      }))
      .sort((a, b) => b.puntaje - a.puntaje);
  }

  generarCodigoRIASEC(top3: PuntajeItem[]): string {
    return top3.map((item) => this.mapaLetras[item.categoria] || item.categoria.charAt(0)).join('');
  }

  buildRadarGeometry(): void {
    const n = 6;
    this.axisLines = [];
    this.radarVertices = [];
    this.radarLabels = [];

    for (let i = 0; i < n; i++) {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      const x2 = Math.cos(angle) * this.RADAR_RADIUS;
      const y2 = Math.sin(angle) * this.RADAR_RADIUS;
      this.axisLines.push({ x1: 0, y1: 0, x2, y2 });

      const lx = Math.cos(angle) * (this.RADAR_RADIUS + this.LABEL_OFFSET);
      const ly = Math.sin(angle) * (this.RADAR_RADIUS + this.LABEL_OFFSET);
      this.radarLabels.push({ x: lx, y: ly, text: this.ordenRIASEC[i] });
    }

    // Radar usa porcentaje teórico por categoría
    const puntajeMap = Object.fromEntries(this.todosPuntajes.map((p) => [p.categoria, p]));

    for (let i = 0; i < n; i++) {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      const cat = this.ordenRIASEC[i];
      const item = puntajeMap[cat];
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

  getRadarPoints(): string {
    return this.radarVertices.map((v) => `${v.x},${v.y}`).join(' ');
  }

  // Porcentaje real: puntaje obtenido / máximo teórico de ESA categoría
  getPorcentaje(item: PuntajeItem): number {
    if (!item || item.puntajeMaximo === 0) return 0;
    return Math.round((item.puntaje / item.puntajeMaximo) * 100);
  }

  getBarColor(index: number): string {
    return this.barColors[index % this.barColors.length];
  }

  getDescripcion(categoria: string): string {
    return this.descripciones[categoria] ?? '';
  }

  volverATest(): void {
    this.router.navigate(['/preguntas']);
  }

  reiniciarTest(): void {
    localStorage.removeItem('respuestas_test_riasec');
    localStorage.removeItem('currentProgress_riasec');
    localStorage.removeItem('categorias_test_riasec');
    this.router.navigate(['/preguntas']).then(() => window.location.reload());
  }
obtenerUniversidadesUnicas(universidades: any[]) {
    const mapa = new Map();

    universidades.forEach(u => {

      const nombrePrincipal =
        u.nombre.split(' - ')[0].trim();

      if (!mapa.has(nombrePrincipal)) {
        mapa.set(nombrePrincipal, {
          ...u,
          nombre: nombrePrincipal
        });
      }

    });

    return Array.from(mapa.values());
  }

  obtenerPromedioUniversidad(universidad: any): number {
    return (
      universidad.costoMensualMinimo +
      universidad.costoMensualMaximo
    ) / 2;
  }

  obtenerTop5Universidades(universidades: any[]): any[] {
    return [...this.obtenerUniversidadesUnicas(universidades)]
      .sort((a, b) =>
        this.obtenerPromedioUniversidad(b) -
        this.obtenerPromedioUniversidad(a)
      )
      .slice(0, 5);
  }

}

