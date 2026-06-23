import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioServicio } from '../../../servicios/usuario/usuario-servicio';
import { tap, catchError, of, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import Swal from 'sweetalert2';
import { Departamento } from '../../../servicios/departamento/Departamento';
import { DepartamentoServicio } from '../../../servicios/departamento/departamento-servicio';
import { HistorialServicio } from '../../../servicios/historial/historial-servicio';
import { Historial } from '../../../servicios/historial/Historial';
import * as bootstrap from 'bootstrap';

interface PuntajeItem {
  categoria: string;
  puntaje: number;
  puntajeMaximo: number;
}

@Component({
  selector: 'app-perfil',
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil {
  usuario: any;
  username: string;
  departamento: Departamento[] = [];
  historial: Historial[] = [];
  historialSeleccionado: Historial | null = null;

  constructor(private usuarioServicio: UsuarioServicio, private departamentoServicio: DepartamentoServicio, private historialServicio: HistorialServicio, private cd: ChangeDetectorRef, private router: Router) { }

  active: string = "informacion";

  onInformacionTab(): void {
    this.active = "informacion";
  }

  onHistorialTab(): void {
    this.active = "historial";
  }

  ngOnInit(): void {
    this.usuarioServicio.obtenerPerfil().pipe(
      tap(data => {
        this.usuario = data;
        this.cd.detectChanges();
      }),
      catchError(error => {
        console.error(error);
        return of(null);
      })
    ).subscribe();

    this.departamentoServicio.obtenerListaDeTipoDeDepartamento().subscribe(dato => {
      this.departamento = dato
      this.cd.detectChanges();
    });

    this.historialServicio.obtenerHistoriales().pipe(
      tap(dato => {
        this.historial = dato.sort(
          (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
        );
      }),
      catchError(err => {
        console.log("ERROR COMPLETO:", err);
        console.log("STATUS:", err.status);
        console.log("BODY:", err.error);
        return throwError(() => err);
      })
    ).subscribe()
  }

  compararDepartamento(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  irALaCuenta() {
    this.router.navigate(['/perfil']);
    Swal.fire('Usuario actualizado', 'El usuario se actualizó correctamente', 'success');
  }

  onSubmit(): void {
    if (this.usuario) {
      this.usuarioServicio.actualizarUsuario(this.usuario).pipe(
        tap(dato => {
          this.irALaCuenta();
        }),
        catchError(error => {
          console.error("Error al actualizar el usuario: ", error);
          return of(null);
        })
      ).subscribe()
    }
  }

  getHexPoints(r: number): string {
    return Array.from({ length: 6 }, (_, i) => {
      const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2;
      return `${Math.cos(angle) * r},${Math.sin(angle) * r}`;
    }).join(' ');
  }

  axisLines: { x1: number; y1: number; x2: number; y2: number }[] = [];

  getRadarPoints(): string {
    return this.radarVertices.map((v) => `${v.x},${v.y}`).join(' ');
  }

  radarVertices: { x: number; y: number }[] = [];

  radarLabels: { x: number; y: number; text: string }[] = [];

  codigoRIASEC: string = '';
  top3: PuntajeItem[] = [];
  todosPuntajes: PuntajeItem[] = [];
  isLoading: boolean = true;

  mapaLetras: { [key: string]: string } = {
    'Realista': 'R',
    'Investigador': 'I',
    'Artístico': 'A',
    'Social': 'S',
    'Emprendedor': 'E',
    'Convencional': 'C',
  };

  cargarResultados(): void {
    try {
      this.todosPuntajes = [
        { categoria: 'Realista', puntaje: this.historialSeleccionado?.puntaje_realista ?? 0, puntajeMaximo: 50 },
        { categoria: 'Investigador', puntaje: this.historialSeleccionado?.puntaje_investigador ?? 0, puntajeMaximo: 50 },
        { categoria: 'Artístico', puntaje: this.historialSeleccionado?.puntaje_artistico ?? 0, puntajeMaximo: 50 },
        { categoria: 'Social', puntaje: this.historialSeleccionado?.puntaje_social ?? 0, puntajeMaximo: 50 },
        { categoria: 'Emprendedor', puntaje: this.historialSeleccionado?.puntaje_emprendedor ?? 0, puntajeMaximo: 50 },
        { categoria: 'Convencional', puntaje: this.historialSeleccionado?.puntaje_convencional ?? 0, puntajeMaximo: 50 },
      ];

      console.log(this.todosPuntajes);

      const primeros3 = this.todosPuntajes.slice(0, 3);
      const puntajeLimite = primeros3[2]?.puntaje ?? 0;
      this.top3 = this.todosPuntajes.filter((item) => item.puntaje >= puntajeLimite);

      this.codigoRIASEC = this.generarCodigoRIASEC(this.top3);

      this.buildRadarGeometry();
      this.isLoading = false;
    } catch (error) {
      console.error('Error al cargar resultados:', error);
      this.isLoading = false;
    }
  }

  generarCodigoRIASEC(top3: PuntajeItem[]): string {
    return top3.map((item) => this.mapaLetras[item.categoria] || item.categoria.charAt(0)).join('');
  }

  private readonly RADAR_RADIUS = 120;
  private readonly LABEL_OFFSET = 22;
  private ordenRIASEC = ['Realista', 'Investigador', 'Artístico', 'Social', 'Emprendedor', 'Convencional'];

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

  getPorcentaje(item: PuntajeItem): number {
    if (!item || item.puntajeMaximo === 0) return 0;
    return Math.round((item.puntaje / item.puntajeMaximo) * 100);
  }

  private barColors = [
    'linear-gradient(90deg, #f97316, #fb923c)',
    'linear-gradient(90deg, #6366f1, #818cf8)',
    'linear-gradient(90deg, #22c55e, #4ade80)',
    'linear-gradient(90deg, #14b8a6, #2dd4bf)',
    'linear-gradient(90deg, #eab308, #facc15)',
    'linear-gradient(90deg, #a855f7, #c084fc)',
  ];

  getBarColor(index: number): string {
    return this.barColors[index % this.barColors.length];
  }

  private descripciones: { [key: string]: string } = {
    'Realista': 'Personas prácticas, físicas y mecánicas. Prefieren actividades concretas con resultados tangibles. Son honestos, estables y persistentes.',
    'Investigador': 'Analíticos, curiosos e intelectualmente orientados. Disfrutan resolver problemas complejos y comprender el mundo a través de la ciencia y la investigación.',
    'Artístico': 'Creativos, expresivos e imaginativos. Valoran la originalidad y prefieren entornos sin estructura rígida donde puedan crear y explorar libremente.',
    'Social': 'Empáticos, cooperativos y orientados a las personas. Disfrutan ayudar, enseñar y trabajar en equipo para mejorar el bienestar de los demás.',
    'Emprendedor': 'Ambiciosos, persuasivos y orientados al liderazgo. Les gusta influenciar, liderar proyectos y asumir riesgos calculados para alcanzar metas.',
    'Convencional': 'Ordenados, precisos y orientados a los detalles. Prefieren entornos estructurados con procedimientos claros y resultados medibles y verificables.',
  };

  getDescripcion(categoria: string): string {
    return this.descripciones[categoria] ?? '';
  }
}
