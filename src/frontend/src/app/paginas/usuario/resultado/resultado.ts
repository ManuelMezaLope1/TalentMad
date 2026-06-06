import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, Subject, takeUntil, tap } from 'rxjs';
import { ICarrera } from '../../../servicios/carrera/ICarrera';
import { CarreraServicio } from '../../../servicios/carrera/carrera-servicio';
import * as bootstrap from 'bootstrap';
import { FormsModule } from '@angular/forms';
import { Historial } from '../../../servicios/historial/Historial';
import { UsuarioServicio } from '../../../servicios/usuario/usuario-servicio';

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
  imports: [CommonModule, FormsModule],
  templateUrl: './resultado.html',
  styleUrls: ['./resultado.css']
})
export class Resultado implements OnInit, OnDestroy {

  carreras: ICarrera[] = [];
  carreras$!: Observable<ICarrera[]>;
  carrerasFiltradas$: Observable<any[]>;

  historial: Historial = new Historial();
  usuario: any = null;
  histcar: any = null

  universidadBecas: any[] = [];
  becas: any[] = [];

  abierto = false;
  abierto1 = false;
  abierto2 = false;
  abierto3 = false;

  tipoFiltro: 'caraUnico' | 'caraSedes' | 'barataUnico' | 'barataSedes' | 'todos' | 'sedes' | 'nombreUnico' | 'nombreSedes' = 'caraUnico';

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

  constructor(private carreraServicio: CarreraServicio, private router: Router, private usuarioServicio: UsuarioServicio, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.carreras$ = this.carreraServicio.obtenerListaDeCarrera();
    this.cargarResultados();

    this.usuarioServicio.obtenerPerfil().pipe(
      tap(data => {
        this.usuario = data;
        this.historial.usuario = {
          id: this.usuario.id
        };
        console.log(this.historial.usuario);
        console.log(this.usuario.id);
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

      this.carrerasFiltradas$ = this.carreras$.pipe(
        map(carreras =>
          carreras.filter(car =>
            car.combinacion
              .split(",")
              .map(c => c.trim())
              .includes(this.codigoRIASEC)
          )
        )
      );

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

  obtenerUniversidadesUnicas(universidades: any[]): any[] {
    const mapa = new Map<string, any>();

    universidades.forEach(uni => {

      const nombrePrincipal = uni.nombre
        .split(' - ')[0]
        .trim();

      if (!mapa.has(nombrePrincipal)) {

        mapa.set(nombrePrincipal, {
          ...uni,
          nombre: nombrePrincipal,
          beca: [...(uni.beca || [])]
        });

      } else {

        const existente = mapa.get(nombrePrincipal);

        existente.beca = [
          ...new Map(
            [
              ...existente.beca,
              ...(uni.beca || [])
            ].map((beca: any) => [beca.id, beca])
          ).values()
        ];

        existente.costoMensualMinimo = Math.min(
          existente.costoMensualMinimo,
          uni.costoMensualMinimo
        );

        existente.costoMensualMaximo = Math.max(
          existente.costoMensualMaximo,
          uni.costoMensualMaximo
        );

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
    const universidadesUnicas = [...this.obtenerUniversidadesUnicas(universidades)];

    if (!universidades) return [];

    switch (this.tipoFiltro) {
      case 'caraUnico':
        return universidadesUnicas
          .sort((a, b) =>
            this.obtenerPromedioUniversidad(b) -
            this.obtenerPromedioUniversidad(a)
          ).slice(0, 5);

      case 'caraSedes':
        return universidades.sort((a, b) =>
          this.obtenerPromedioUniversidad(b) -
          this.obtenerPromedioUniversidad(a)
        ).slice(0, 5);

      case 'barataUnico':
        return universidadesUnicas
          .sort((a, b) =>
            this.obtenerPromedioUniversidad(a) -
            this.obtenerPromedioUniversidad(b)
          )
          .slice(0, 5);

      case 'barataSedes':
        return universidades.sort((a, b) =>
          this.obtenerPromedioUniversidad(a) -
          this.obtenerPromedioUniversidad(b)
        )
          .slice(0, 5);

      case 'todos':
        return universidadesUnicas
          .sort((a, b) =>
            this.obtenerPromedioUniversidad(b) -
            this.obtenerPromedioUniversidad(a)
          )

      case 'sedes':
        return universidades
          .sort((a, b) =>
            this.obtenerPromedioUniversidad(b) -
            this.obtenerPromedioUniversidad(a)
          )

      case 'nombreUnico':
        return universidadesUnicas.sort((a, b) => a.nombre.localeCompare(b.nombre))

      case 'nombreSedes':
        return universidades.sort((a, b) => a.nombre.localeCompare(b.nombre))

      default:
        return universidades;
    }
  }

  obtenerUniversidadesConBecas(universidades: any[]): any[] {
    return this.obtenerTop5Universidades(universidades)
      .filter(uni => uni.beca && uni.beca.length > 0);
  }

  menuOpenUniversidad = false;

  abrirFiltrosUniversidad(event: Event): void {
    const filtro = event.currentTarget as HTMLElement;
    const filtroUni = filtro.nextElementSibling as HTMLElement;

    if (filtroUni) {
      filtroUni.classList.toggle('show');
    }
  }

  @ViewChild('btnInfo')
  btnInfo!: ElementRef;

  @ViewChild('btnInfoNombre')
  btnInfoNombre!: ElementRef;

  @ViewChild('btnInfoNombreUnico')
  btnInfoNombreUnico!: ElementRef

  @ViewChild('btnInfoNombreSedes')
  btnInfoNombreSedes!: ElementRef

  @ViewChild('btnInfoCaras')
  btnInfoCaras!: ElementRef

  @ViewChild('btnInfoCaraUnico')
  btnInfoCaraUnico!: ElementRef;

  @ViewChild('btnInfoCaraSedes')
  btnInfoCaraSedes!: ElementRef;

  @ViewChild('btnInfoBaratas')
  btnInfoBaratas!: ElementRef;

  @ViewChild('btnInfoBarataUnico')
  btnInfoBarataUnico!: ElementRef

  @ViewChild('btnInfoBarataSedes')
  btnInfoBarataSedes!: ElementRef



  @ViewChild('btnInfoSedes')
  btnInfoSedes!: ElementRef;

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

  mostrarTooltipNombre() {
    if (!this.btnInfoNombre?.nativeElement) {
      return;
    }

    const tooltipNombre = bootstrap.Tooltip.getOrCreateInstance(
      this.btnInfoNombre.nativeElement
    );

    tooltipNombre.show();

    setTimeout(() => {
      try {
        tooltipNombre.hide();
      } catch (e) {
        console.error(e);
      }
    }, 1000)
  }

  mostrarTooltipNombreUnico() {
    if (!this.btnInfoNombreUnico?.nativeElement) {
      return;
    }

    const tooltipNombreUnico = bootstrap.Tooltip.getOrCreateInstance(
      this.btnInfoNombreUnico.nativeElement
    );

    tooltipNombreUnico.show();

    setTimeout(() => {
      try {
        tooltipNombreUnico.hide();
      } catch (e) {
        console.error(e);
      }
    }, 1000)
  }

  mostrarTooltipNombreSedes() {
    if (!this.btnInfoNombreSedes?.nativeElement) {
      return;
    }

    const tooltipNombreSedes = bootstrap.Tooltip.getOrCreateInstance(
      this.btnInfoNombreSedes.nativeElement
    );

    tooltipNombreSedes.show();

    setTimeout(() => {
      try {
        tooltipNombreSedes.hide();
      } catch (e) {
        console.error(e);
      }
    }, 1000)
  }

  mostrarTooltipCaras() {
    if (!this.btnInfoCaras?.nativeElement) {
      return;
    }

    const tooltipCaras = bootstrap.Tooltip.getOrCreateInstance(
      this.btnInfoCaras.nativeElement
    );

    tooltipCaras.show();

    setTimeout(() => {
      try {
        tooltipCaras.hide();
      } catch (e) {
        console.error(e);
      }
    }, 1000)
  }

  mostrarTooltipCaraUnico() {
    if (!this.btnInfoCaraUnico?.nativeElement) {
      return;
    }

    const tooltipCaraUnico = bootstrap.Tooltip.getOrCreateInstance(
      this.btnInfoCaraUnico.nativeElement,
      {
        trigger: 'manual'
      }
    );

    tooltipCaraUnico.show();

    setTimeout(() => {
      try {
        tooltipCaraUnico.hide();
      } catch (e) {
        console.error(e);
      }
    }, 1000)
  }

  mostrarTooltipCaraSedes() {
    if (!this.btnInfoCaraSedes?.nativeElement) {
      return;
    }

    const tooltipCaraSedes = bootstrap.Tooltip.getOrCreateInstance(
      this.btnInfoCaraSedes.nativeElement
    );

    tooltipCaraSedes.show();

    setTimeout(() => {
      try {
        tooltipCaraSedes.hide();
      } catch (e) {
        console.error(e);
      }
    }, 1000)
  }

  mostrarTooltipBaratas() {
    if (!this.btnInfoCaraUnico?.nativeElement) {
      return;
    }

    const tooltipBaratas = bootstrap.Tooltip.getOrCreateInstance(
      this.btnInfoBaratas.nativeElement
    );

    tooltipBaratas.show();

    setTimeout(() => {
      try {
        tooltipBaratas.hide();
      } catch (e) {
        console.error(e);
      }
    }, 1000)
  }

  mostrarTooltipBarataUnico() {
    if (!this.btnInfoCaraUnico?.nativeElement) {
      return;
    }

    const tooltipBarataUnico = bootstrap.Tooltip.getOrCreateInstance(
      this.btnInfoBarataUnico.nativeElement
    );

    tooltipBarataUnico.show();

    setTimeout(() => {
      try {
        tooltipBarataUnico.hide();
      } catch (e) {
        console.error(e);
      }
    }, 1000)
  }

  mostrarTooltipBarataSedes() {
    if (!this.btnInfoCaraUnico?.nativeElement) {
      return;
    }

    const tooltipBarataSedes = bootstrap.Tooltip.getOrCreateInstance(
      this.btnInfoBarataSedes.nativeElement
    );

    tooltipBarataSedes.show();

    setTimeout(() => {
      try {
        tooltipBarataSedes.hide();
      } catch (e) {
        console.error(e);
      }
    }, 1000)
  }

  mostrarTooltipSedes() {
    if (!this.btnInfoCaraUnico?.nativeElement) {
      return;
    }

    const tooltipSedes = bootstrap.Tooltip.getOrCreateInstance(
      this.btnInfoSedes.nativeElement
    );

    tooltipSedes.show();

    setTimeout(() => {
      try {
        tooltipSedes.hide();
      } catch (e) {
        console.error(e);
      }
    }, 1000)
  }

  onSubmit(){
    console.log(this.historial);
  }
}
