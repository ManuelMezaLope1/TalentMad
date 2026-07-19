import { ChangeDetectorRef, Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HistorialServicio } from '../../../servicios/historial/historial-servicio';
import Chart from 'chart.js/auto';
import { HistorialHistorico } from '../../../servicios/historial/HistorialHistorico';
import { CarreraServicio } from '../../../servicios/carrera/carrera-servicio';
import { UniversidadServicio } from '../../../servicios/universidad/universidad-servicio';
import { BecaServicio } from '../../../servicios/beca/beca-servicio';
import { UsuarioServicio } from '../../../servicios/usuario/usuario-servicio';
import { catchError, of, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { OrigenBecaServicio } from '../../../servicios/origen-beca/origen-beca-servicio';
import { DepartamentoServicio } from '../../../servicios/departamento/departamento-servicio';
import { PreguntasServicio } from '../../../servicios/preguntas/preguntas-servicio';
import { CategoriaPreguntasServicio } from '../../../servicios/categoria-preguntas/categoria-preguntas-servicio';

interface AccionAdmin {
  titulo: string;
  descripcion: string;
  icono: string;
  ruta: string;
  grupo: 'contenido' | 'vinculos';
  etiqueta: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  protected readonly busqueda = signal('');

  // Estado del menú lateral en móvil (drawer)
  protected readonly sidebarAbierto = signal(false);

  private readonly acciones: AccionAdmin[] = [
    {
      titulo: 'Preguntas',
      descripcion: 'Controla las preguntas que se muestran en el test',
      icono: 'help',
      ruta: '/preguntas-admin',
      grupo: 'contenido',
      etiqueta: 'Catálogo',
    },
    {
      titulo: 'Universidades',
      descripcion: 'Controla las universidades que se muestran',
      icono: 'apartment',
      ruta: '/universidad',
      grupo: 'contenido',
      etiqueta: 'Catálogo',
    },
    {
      titulo: 'Carreras',
      descripcion: 'Controla las carreras que se muestran',
      icono: 'book',
      ruta: '/carrera',
      grupo: 'contenido',
      etiqueta: 'Catálogo',
    },
    {
      titulo: 'Becas',
      descripcion: 'Controla las becas que se muestran',
      icono: 'school',
      ruta: '/beca',
      grupo: 'contenido',
      etiqueta: 'Catálogo',
    },
    {
      titulo: 'Carreras y Universidades',
      descripcion: 'Une carreras con las universidades que las dictan',
      icono: 'link',
      ruta: '/universidad-carrera',
      grupo: 'vinculos',
      etiqueta: 'Vínculo',
    },
    {
      titulo: 'Carreras y Becas',
      descripcion: 'Une becas disponibles a cada carrera',
      icono: 'link',
      ruta: '/carrera-beca',
      grupo: 'vinculos',
      etiqueta: 'Vínculo',
    },
    {
      titulo: 'Universidades y Becas',
      descripcion: 'Une becas disponibles a cada universidad',
      icono: 'link',
      ruta: '/universidad-beca',
      grupo: 'vinculos',
      etiqueta: 'Vínculo',
    },
  ];

  protected readonly accionesFiltradas = computed(() => {
    const termino = this.busqueda().trim().toLowerCase();
    if (!termino) return this.acciones;
    return this.acciones.filter(
      (a) =>
        a.titulo.toLowerCase().includes(termino) ||
        a.descripcion.toLowerCase().includes(termino)
    );
  });

  protected readonly grupoContenido = computed(() =>
    this.accionesFiltradas().filter((a) => a.grupo === 'contenido')
  );

  protected readonly grupoVinculos = computed(() =>
    this.accionesFiltradas().filter((a) => a.grupo === 'vinculos')
  );

  protected readonly sinResultados = computed(
    () => this.accionesFiltradas().length === 0
  );

  protected actualizarBusqueda(valor: string): void {
    this.busqueda.set(valor);
  }

  protected limpiarBusqueda(): void {
    this.busqueda.set('');
  }

  // ---- Menú lateral (móvil) ----
  protected toggleSidebar(): void {
    this.sidebarAbierto.update((v) => !v);
    this.actualizarScrollBody();
  }

  protected cerrarSidebar(): void {
    this.sidebarAbierto.set(false);
    this.actualizarScrollBody();
  }

  private actualizarScrollBody(): void {
    document.body.style.overflow = this.sidebarAbierto() ? 'hidden' : '';
  }

  private irArribaYcerrarMenu(): void {
    this.cerrarSidebar();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  cantidadCodigo: any[] = [];
  historicoHistorial: any[] = [];
  active: string = "inicio";
  eleccionGraficoTotal: any;
  rankingDropdownOpen = false;
  totalDropdownOpen = false;
  tipoDropdownOpen = false;
  cantidadUsuario: any;
  chartRankingPromedio: Chart | null = null;
  chartTotalPromedio: Chart | null = null;
  chartTipo: Chart | null = null;

  cantidadBeca: any;
  tipoBeca: any[] = [];
  tipoBecaMayorNombre: any;
  tipoBecaMayorCantidad: any;

  cantidadTipoBeca: any;
  cantidadOrigenbeca: any;
  origenBeca: any[] = [];
  origenBecaMayorNombre: any;
  origenBecaMayorCantidad: any;

  becaUniversidadMayorNombre: any;
  becaUniversidadMayorCantidad: any;
  becaUniversidadTopDiez: any[] = [];
  becaUniversidad: any[] = [];

  cantidadCarrera: any;
  nombreCarreraRankingSeleccionada: any;
  nombreCarreraTotalSeleccionada: any;
  tipoCarreraSeleccionada: any;
  rankingCarreraPromedio: any[] = [];
  totalCarreraPromedio: any[] = []

  cantidadTipoCarrera: any;
  carreraTipoMayorNombre: any;
  carreraTipomayorCantidad: any;
  carreraTipo: any[] = [];
  carreraTipoTopDiez: any[] = [];

  carreraNombre: any[] = [];
  carreraRanking: any[] = [];
  cantidadMayorRanking: any;
  cantidadMayorCantidad: any;

  carreraTipoUniversidadMayorNombre: any;
  carreraTipoUniversidadmayorCantidad: any;
  carreraTipoUniversidad: any[] = [];
  carreraTipoUniversidadTopDiez: any[] = [];

  carreraUniversidadMayorNombre: any;
  carreraUniversidadMayorCantidad: any
  carreraUniversidadTopDiez: any[] = [];
  carreraUniversidad: any[] = [];

  cantidadUniversidad: any;
  tipoCarreraFiltrada: any[] = []

  cantidadDepartamento: any;
  universidadSedeMayorNombre: any;
  universidadSedeMayorCantidad: any;
  universidadSedesTopDiez: any[] = [];
  universidadSedes: any[] = [];

  universidadDepartamentoMayorNombre: any;
  universidadDepartamentoMayorCantidad: any;
  universidadDepartamentoTopDiez: any[] = [];
  universidadDepartamento: any[] = [];

  universidadCarreraMayoNombre: any;
  universidadCarreraMayorCantidad: any;
  universidadCarreraTopDiez: any[] = [];
  universidadCarrera: any[] = [];

  universidadBecaMayorNombre: any;
  universidadBecaMayorCantidad: any;
  universidadBecaTopDiez: any[] = [];
  universidadBeca: any[] = [];

  categoriaPreguntas: any[]=[];
  cantidadPreguntas: any;
  cantidadCategoriaPreguntas: any;

  tipos = [
    'Todos', 'Administración', 'Arquitectura', 'Arte y Diseño', 'Artes Escénicas', 'Ciencias Básicas', 'Ciencias de la Salud',
    'Ciencias Económicas', 'Ciencias Sociales', 'Computación', 'Comunicaciones', 'Derecho', 'Educación', 'Gastronomía, Hotelería y Turismo',
    'Gestión y Alta Dirección', 'Ingeniería', 'Letras y Ciencias Humanas', 'Medicina', 'Negocios', 'Psicología'
  ];

  tiposBeca = ['Deportiva', 'Excelencia Académica', 'Socioeconómica'];

  constructor(private historialServicio: HistorialServicio, private carreraServicio: CarreraServicio, private universidadServicio: UniversidadServicio, 
    private departamentoServicio: DepartamentoServicio, private becaServicio: BecaServicio, private usuarioServicio: UsuarioServicio, 
    private origenBecaServicio: OrigenBecaServicio, private preguntaServicio: PreguntasServicio, private categoriaPreguntasServicio: CategoriaPreguntasServicio, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.cargarCantidadCodigo();
    this.cargarHistoricoHistorial();

    this.cargarDatosBecas();
    this.cargarDatosUniversidad();
    this.cargarDatosCarrera();
    this.cargarDatosPreguntas();

    this.nombreCarreraRankingSeleccionada = 'Administración de Empresas';
    this.nombreCarreraTotalSeleccionada = 'Administración de Empresas';
    this.tipoCarreraSeleccionada = "Todos"
    this.cargarRankingPromedio();
    this.cargarTotalPromedio();
    this.cargarFiltroTipoCarrera();
  }

  onInicioTab() {
    this.active = "inicio"
    this.irArribaYcerrarMenu();
  }

  onCarreraTab() {
    this.active = "carrera"
    this.irArribaYcerrarMenu();
  }

  onUniversidadTab() {
    this.active = "universidad"
    this.irArribaYcerrarMenu();
  }

  onBecaTab() {
    this.active = "beca"
    this.irArribaYcerrarMenu();
  }

  onGestionTab() {
    this.active = "gestion"
    this.irArribaYcerrarMenu();
  }

  toggleRankingDropdown() {
    this.rankingDropdownOpen = !this.rankingDropdownOpen;
  }

  toggleTotalDropdown() {
    this.totalDropdownOpen = !this.totalDropdownOpen;
  }

  toggleTipoDropdown() {
    this.tipoDropdownOpen = !this.tipoDropdownOpen;
  }

  actualizarNombreCarreraRanking(carrera: string) {
    this.nombreCarreraRankingSeleccionada = carrera;
    this.cargarRankingPromedio();
  }

  actualizarNombreCarreraTotal(carrera: string) {
    this.nombreCarreraTotalSeleccionada = carrera;
    this.cargarTotalPromedio();
  }

  actualizarTipoCarrera(tipo: string) {
    this.tipoCarreraSeleccionada = tipo;
    this.cargarFiltroTipoCarrera();
  }

  cargarDatosPreguntas(){
    this.preguntaServicio.obtenerListaDePreguntas().subscribe(dato=>{
      this.cantidadPreguntas=dato.length;
      this.cd.detectChanges();
    });

    this.categoriaPreguntasServicio.obtenerListaDeCategorias().subscribe(dato=>{
      this.cantidadCategoriaPreguntas=dato.length;
      this.cd.detectChanges();
    });

    this.preguntaServicio.obtenerCantidadCategoriaPreguntas().subscribe(datos=>{
      this.categoriaPreguntas=datos;
      this.cd.detectChanges();

      if(this.categoriaPreguntas.length>0){
        this.cd.detectChanges();

        new Chart('cantidadCategoriaPreguntasChart', {
          type: 'doughnut',
          data: {
            labels: datos.map(d => d.nombre),
            datasets: [{
              label: 'Cantidad de Preguntas',
              data: datos.map(d => d.cantidad)
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: 'Preguntas por Categoria'
              }
            }
          }
        })

        this.cd.detectChanges();
      }
    })
  }

  cargarDatosBecas() {
    this.usuarioServicio.obtenerCantidadUniversidad().subscribe(dato => {
      this.cantidadUsuario = dato.cantidad;
      this.cd.detectChanges();
    });

    this.becaServicio.obtenerCantidadBeca().subscribe(dato => {
      this.cantidadBeca = dato.cantidad;
      this.cd.detectChanges();
    });

    this.origenBecaServicio.obtenerTodosLosOrigenesBeca().subscribe(dato => {
      this.cantidadOrigenbeca = dato.length;
      this.cantidadTipoBeca = this.tiposBeca.length
      this.cd.detectChanges();
    })

    this.becaServicio.obtenerTipoBecaCantidad().subscribe(datos => {
      this.tipoBeca = datos;
      this.tipoBecaMayorNombre = this.tipoBeca[0].nombre;
      this.tipoBecaMayorCantidad = this.tipoBeca[0].cantidad
      this.cd.detectChanges();

      if (this.tipoBeca.length > 0) {
        this.cd.detectChanges();

        new Chart('cantidadTipoBecaChart', {
          type: 'doughnut',
          data: {
            labels: datos.map(d => d.nombre),
            datasets: [{
              label: 'Cantidad de Becas',
              data: datos.map(d => d.cantidad)
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: 'Becas por Tipo'
              }
            }
          }
        });

        this.cd.detectChanges();
      }
    });

    this.becaServicio.obtenerOrigenBecaCantidad().subscribe(datos => {
      this.origenBeca = datos;
      this.origenBecaMayorNombre = this.origenBeca[0].nombre;
      this.origenBecaMayorCantidad = this.origenBeca[0].cantidad;
      this.cd.detectChanges();

      if (this.origenBeca.length > 0) {
        this.cd.detectChanges();

        new Chart('cantidadOrigenBecaChart', {
          type: 'doughnut',
          data: {
            labels: datos.map(d => d.nombre),
            datasets: [{
              label: 'Cantidad de Becas',
              data: datos.map(d => d.cantidad)
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: 'Becas por Origen'
              }
            }
          }
        });

        this.cd.detectChanges();
      }
    })

    this.becaServicio.obtenerBecaUniversidadCantidad().subscribe(datos => {
      this.becaUniversidad = datos;
      this.becaUniversidadMayorNombre = this.becaUniversidad[0].nombre;
      this.becaUniversidadMayorCantidad = this.becaUniversidad[0].cantidad;

      this.becaUniversidadTopDiez = this.becaUniversidad.map(({ nombre, cantidad }) => ({
        nombre, cantidad
      }))
      this.cd.detectChanges();

      if (this.becaUniversidad.length > 0) {
        this.cd.detectChanges();

        new Chart('cantidadBecaUniversidadTopDiezChart', {
          type: 'bar',
          data: {
            labels: this.becaUniversidadTopDiez.map(d => d.nombre),
            datasets: [{
              label: 'Cantidad de Universidades',
              data: this.becaUniversidadTopDiez.map(d => d.cantidad)
            }]
          },
          options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: 'Universidades por Becas'
              }
            }
          }
        });

        this.cd.detectChanges();
      }
    })
  }

  cargarDatosUniversidad() {
    this.universidadServicio.obtenerCantidadUniversidad().subscribe(dato => {
      this.cantidadUniversidad = dato.cantidad;
      this.cd.detectChanges();
    });

    this.departamentoServicio.obtenerListaDeTipoDeDepartamento().subscribe(dato => {
      this.cantidadDepartamento = dato.length;
      this.cd.detectChanges();
    })

    this.universidadServicio.obtenerUniversidadSedesCantidad().subscribe(datos => {
      this.universidadSedes = datos;
      this.universidadSedeMayorNombre = this.universidadSedes[0].nombre;
      this.universidadSedeMayorCantidad = this.universidadSedes[0].cantidad;

      this.cd.detectChanges();

      this.universidadSedesTopDiez = this.universidadSedes.map(({ nombre, cantidad }) => ({
        nombre, cantidad
      })).slice(0, 10);

      if (this.universidadSedes.length > 0) {
        this.cd.detectChanges();

        new Chart('cantidadUniversidadSedesTopDiezChart', {
          type: 'bar',
          data: {
            labels: this.universidadSedesTopDiez.map(d => d.nombre),
            datasets: [{
              label: 'Cantidad de Sedes',
              data: this.universidadSedesTopDiez.map(d => d.cantidad)
            }]
          },
          options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: 'Sedes por Universidad'
              }
            }
          }
        });

        this.cd.detectChanges();
      }
    })

    this.universidadServicio.obtenerUniversidadDepartamentoCantidad().subscribe(datos => {
      this.universidadDepartamento = datos;
      this.universidadDepartamentoMayorNombre = this.universidadDepartamento[0].nombre;
      this.universidadDepartamentoMayorCantidad = this.universidadDepartamento[0].cantidad;
      this.cd.detectChanges();

      this.universidadDepartamentoTopDiez = this.universidadDepartamento.map(({ nombre, cantidad }) => ({
        nombre, cantidad
      })).slice(0, 10);

      if (this.universidadDepartamento.length > 0) {
        this.cd.detectChanges();

        new Chart('cantidadUniversidadDepartamentoTopDiezChart', {
          type: 'bar',
          data: {
            labels: this.universidadDepartamentoTopDiez.map(d => d.nombre),
            datasets: [{
              label: 'Cantidad de Universidad',
              data: this.universidadDepartamentoTopDiez.map(d => d.cantidad)
            }]
          },
          options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: 'Universidades por Departamento'
              }
            }
          }
        });

        this.cd.detectChanges();
      }
    })

    this.universidadServicio.obtenerUniversidadCarreraCantidad().subscribe(datos => {
      this.universidadCarrera = datos;
      this.universidadCarreraMayoNombre = this.universidadCarrera[0].nombre;
      this.universidadCarreraMayorCantidad = this.universidadCarrera[0].cantidad;
      this.cd.detectChanges();

      this.universidadCarreraTopDiez = this.universidadCarrera.map(({ nombre, cantidad }) => ({
        nombre, cantidad
      })).slice(0, 10);

      if (this.universidadCarrera.length > 0) {
        this.cd.detectChanges();

        new Chart('cantidadUniversidadCarreraTopDiezChart', {
          type: 'bar',
          data: {
            labels: this.universidadCarreraTopDiez.map(d => d.nombre),
            datasets: [{
              label: 'Cantidad de Carreras',
              data: this.universidadCarreraTopDiez.map(d => d.cantidad)
            }]
          },
          options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: 'Carreras por Universidad'
              }
            }
          }
        });

        this.cd.detectChanges();
      }
    })

    this.universidadServicio.obtenerUniversidadBecaCantidad().subscribe(datos => {
      this.universidadBeca = datos;
      this.universidadBecaMayorNombre = this.universidadBeca[0].nombre;
      this.universidadBecaMayorCantidad = this.universidadBeca[0].cantidad;
      this.cd.detectChanges();

      this.universidadBecaTopDiez = this.universidadBeca.map(({ nombre, cantidad }) => ({
        nombre, cantidad
      })).slice(0, 10);

      this.cd.detectChanges();

      if (this.universidadBeca.length > 0) {
        this.cd.detectChanges();

        new Chart('cantidadUniversidadBecaTopDiezChart', {
          type: 'bar',
          data: {
            labels: this.universidadBecaTopDiez.map(d => d.nombre),
            datasets: [{
              label: 'Cantidad de Carreras',
              data: this.universidadBecaTopDiez.map(d => d.cantidad)
            }]
          },
          options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: 'Becas por Universidad'
              }
            }
          }
        });

        this.cd.detectChanges();
      }
    })
  }

  cargarDatosCarrera() {
    this.carreraServicio.obtenerListaDeCarrera().subscribe(datos => {
      this.carreraNombre = datos
      this.cd.detectChanges();
      this.carreraNombre = this.carreraNombre.map(n => n.nombre).sort()
      this.cd.detectChanges();
    });

    this.carreraServicio.obtenerCantidadCarrera().subscribe(dato => {
      this.cantidadCarrera = dato.cantidad;
      this.cantidadTipoCarrera = this.tipos.length;
      this.cd.detectChanges();
    });

    this.carreraServicio.obtenerTipoCarreraCantidad().subscribe(datos => {
      this.carreraTipo = datos
      this.carreraTipoMayorNombre = this.carreraTipo[0].nombre;
      this.carreraTipomayorCantidad = this.carreraTipo[0].cantidad;

      this.carreraTipoTopDiez = this.carreraTipo.map(({ nombre, cantidad }) => ({
        nombre, cantidad
      })).slice(0, 7)
      this.cd.detectChanges();

      if (this.carreraTipo.length > 0) {
        this.cd.detectChanges();

        new Chart('cantidadTipoCarreraTopSieteChart', {
          type: 'doughnut',
          data: {
            labels: this.carreraTipoTopDiez.map(d => d.nombre),
            datasets: [{
              label: 'Cantidad de Carreras',
              data: this.carreraTipoTopDiez.map(d => d.cantidad)
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: 'Carreras por Tipo'
              }
            }
          }
        });

        this.cd.detectChanges();
      }
    });

    this.carreraServicio.obtenerTipoCarreraUniversidadCantidad().subscribe(datos => {
      this.carreraTipoUniversidad = datos;
      this.carreraTipoUniversidadMayorNombre = this.carreraTipoUniversidad[0].nombre;
      this.carreraTipoUniversidadmayorCantidad = this.carreraTipoUniversidad[0].cantidad;

      this.carreraTipoUniversidadTopDiez = this.carreraTipoUniversidad.map(({ nombre, cantidad }) => ({
        nombre, cantidad
      })).slice(0, 10)

      this.cd.detectChanges();

      if (this.carreraTipoUniversidad.length > 0) {
        this.cd.detectChanges();

        new Chart('cantidadTipoCarreraUniversidadTopDiezChart', {
          type: 'bar',
          data: {
            labels: this.carreraTipoUniversidadTopDiez.map(d => d.nombre),
            datasets: [{
              label: 'Cantidad de Universidades',
              data: this.carreraTipoUniversidadTopDiez.map(d => d.cantidad)
            }]
          },
          options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: 'Universidades por Tipo de Carrera'
              }
            }
          }
        });

        this.cd.detectChanges();
      }
    })

    this.carreraServicio.obtenerCarrerasRankingCantidad().subscribe(datos => {
      this.carreraRanking = datos;
      this.cantidadMayorRanking = this.carreraRanking[0].ranking;
      this.cantidadMayorCantidad = this.carreraRanking[0].cantidad;
      this.cd.detectChanges();

      if (this.carreraRanking.length > 0) {
        this.cd.detectChanges();

        new Chart('cantidadCarreraRankingChart', {
          type: 'doughnut',
          data: {
            labels: datos.map(d => d.ranking),
            datasets: [{
              label: 'Ranking de Carreras',
              data: datos.map(d => d.cantidad)
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: 'Carreras por Ranking'
              }
            }
          }
        });

        this.cd.detectChanges();
      }
    })

    this.carreraServicio.obtenerCarreraUniversidadCantidad().subscribe(datos => {
      this.carreraUniversidad = datos;
      this.carreraUniversidadTopDiez = datos.map(({ carrera, tipo, cantidad }) => ({
        carrera, tipo, cantidad
      })).slice(0, 10);
      this.cd.detectChanges();

      if (this.carreraUniversidad.length > 0) {
        this.cd.detectChanges();

        this.chartTipo = new Chart('cantidadCarreraUniversidadChart', {
          type: 'bar',
          data: {
            labels: this.carreraUniversidadTopDiez.map(d => d.carrera),
            datasets: [{
              label: 'Ranking de Carreras',
              data: this.carreraUniversidadTopDiez.map(d => d.cantidad)
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: 'Universidades por Carrera'
              }
            }
          }
        });

        this.cd.detectChanges();
      }
    })
  }

  cargarRankingPromedio() {
    this.carreraServicio.obtenerRankingPromedio(this.nombreCarreraRankingSeleccionada).pipe(
      tap(datos => {
        this.rankingCarreraPromedio = datos.map(({ universidad, carrera, promedio }) => ({
          universidad, carrera, promedio
        })).slice(0, 7);

        this.cd.detectChanges();

        if (this.rankingCarreraPromedio.length > 0) {
          this.cd.detectChanges();

          if (!this.chartRankingPromedio) {

            this.chartRankingPromedio = new Chart('cantidadRankingCarreraPromedioChart', {
              type: 'bar',
              data: {
                labels: this.rankingCarreraPromedio.map(d => d.universidad),
                datasets: [{
                  label: 'Promedio de Ranking',
                  data: this.rankingCarreraPromedio.map(d => d.promedio)
                }]
              },
              options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  title: {
                    display: true,
                    text: 'Promedio de Ranking por Carrera'
                  }
                }
              }
            });

            this.cd.detectChanges();
          } else {
            this.chartRankingPromedio.data.labels = this.rankingCarreraPromedio.map(d => d.universidad);
            this.chartRankingPromedio.data.datasets[0].data = this.rankingCarreraPromedio.map(d => d.promedio);
            this.chartRankingPromedio.update();
          }

          this.cd.detectChanges();
        }
      }),
      catchError(err => {
        console.error(err)
        return of(null)
      })
    ).subscribe()
  }

  cargarTotalPromedio() {
    this.carreraServicio.obtenerTotalPromedio(this.nombreCarreraTotalSeleccionada).pipe(
      tap(datos => {
        this.totalCarreraPromedio = datos.map(({ universidad, carrera, promedio }) => ({
          universidad, carrera, promedio
        })).slice(0, 7);

        this.cd.detectChanges();

        if (this.totalCarreraPromedio.length > 0) {
          this.cd.detectChanges();

          if (!this.chartTotalPromedio) {

            this.chartTotalPromedio = new Chart('cantidadTotalCarreraPromedioChart', {
              type: 'bar',
              data: {
                labels: this.totalCarreraPromedio.map(d => d.universidad),
                datasets: [{
                  label: 'Promedio Total',
                  data: this.totalCarreraPromedio.map(d => d.promedio)
                }]
              },
              options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  title: {
                    display: true,
                    text: 'Promedio Total por Carrera'
                  }
                }
              }
            });

            this.cd.detectChanges();
          } else {
            this.chartTotalPromedio.data.labels = this.totalCarreraPromedio.map(d => d.universidad);
            this.chartTotalPromedio.data.datasets[0].data = this.totalCarreraPromedio.map(d => d.promedio);
            this.chartTotalPromedio.update();
          }

          this.cd.detectChanges();
        }
      }),
      catchError(err => {
        console.error(err)
        return of(null)
      })
    ).subscribe()
  }

  cargarFiltroTipoCarrera() {
    this.cd.detectChanges();
    if (this.tipoCarreraSeleccionada === 'Todos') {
      this.tipoCarreraFiltrada = this.carreraUniversidadTopDiez;
    } else {
      this.tipoCarreraFiltrada = this.carreraUniversidad.filter(c =>
        c.tipo === this.tipoCarreraSeleccionada
      )
    }

    this.cd.detectChanges();

    if (this.chartTipo) {
      this.chartTipo.data.labels = this.tipoCarreraFiltrada.map(d => d.carrera);
      this.chartTipo.data.datasets[0].data = this.tipoCarreraFiltrada.map(d => d.cantidad);
      this.chartTipo.update();
    }
  }

  cargarGraficoTotal(eleccion: string) {
    this.eleccionGraficoTotal = eleccion;
    this.cd.detectChanges();

    switch (this.eleccionGraficoTotal) {
      case 'universidadBeca':
        return new Chart('cantidadUniversidadBecaChart', {
          type: 'bar',
          data: {
            labels: this.universidadBeca.map(d => d.nombre.match(/[A-ZÁÉÍÓÚÑ]/g)?.join('') || ''),
            datasets: [{
              label: 'Cantidad de Becas',
              data: this.universidadBeca.map(d => d.cantidad)
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: 'Becas por Universidad'
              }
            }
          }
        });

      case 'universidadCarrera':
        return new Chart('cantidadUniversidadCarreraChart', {
          type: 'bar',
          data: {
            labels: this.universidadCarrera.map(d => d.nombre.match(/[A-ZÁÉÍÓÚÑ]/g)?.join('') || ''),
            datasets: [{
              label: 'Cantidad de Carreras',
              data: this.universidadCarrera.map(d => d.cantidad)
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: 'Carreras por Universidad'
              }
            }
          }
        });

      case 'universidadDepartamento':
        return new Chart('cantidadUniversidadDepartamentoChart', {
          type: 'bar',
          data: {
            labels: this.universidadDepartamento.map(d => d.nombre),
            datasets: [{
              label: 'Cantidad de Universidad',
              data: this.universidadDepartamento.map(d => d.cantidad)
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: 'Universidades por Departamento'
              }
            }
          }
        });

      case 'universidadSedes':
        return new Chart('cantidadUniversidadSedesChart', {
          type: 'bar',
          data: {
            labels: this.universidadSedes.map(d => d.nombre.match(/[A-ZÁÉÍÓÚÑ]/g)?.join('') || ''),
            datasets: [{
              label: 'Cantidad de Sedes',
              data: this.universidadSedes.map(d => d.cantidad)
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: 'Sedes por Universidad'
              }
            }
          }
        });

      case 'becaUniversidad':
        return new Chart('cantidadBecaUniversidadChart', {
          type: 'bar',
          data: {
            labels: this.becaUniversidadTopDiez.map(d => d.nombre),
            datasets: [{
              label: 'Cantidad de Universidades',
              data: this.becaUniversidadTopDiez.map(d => d.cantidad)
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: 'Universidades por Becas'
              }
            }
          }
        })

      case 'tipoCarrera':
        return new Chart('cantidadTipoCarreraChart', {
          type: 'bar',
          data: {
            labels: this.carreraTipo.map(d => d.nombre),
            datasets: [{
              label: 'Cantidad de Carreras',
              data: this.carreraTipo.map(d => d.cantidad)
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: 'Carreras por Tipo'
              }
            }
          }
        });

      case 'tipoCarreraUniversidad':
        return new Chart('cantidadTipoCarreraUniversidadChart', {
          type: 'bar',
          data: {
            labels: this.carreraTipoUniversidad.map(d => d.nombre),
            datasets: [{
              label: 'Cantidad de Universidades',
              data: this.carreraTipoUniversidad.map(d => d.cantidad)
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: 'Universidades por Tipo de Carrera'
              }
            }
          }
        });

      default:
        return this.eleccionGraficoTotal = '';
    }

  }

  cargarCantidadCodigo() {
    this.historialServicio.obtenerCantidadCodigo().subscribe(datos => {
      this.cd.detectChanges();
      this.cantidadCodigo = datos;

      if (this.cantidadCodigo.length > 0) {
        this.cd.detectChanges();
        new Chart('cantidadCodigoChart', {
          type: 'doughnut',
          data: {
            labels: datos.map(d => d.codigo),
            datasets: [{
              label: 'Cantidad de Veces',
              data: datos.map(d => d.cantidad)
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: 'Cantidad por Código'
              }
            }
          }
        });
        this.cd.detectChanges();
      }
    })
  }

  cargarHistoricoHistorial() {
    this.historialServicio.obtenerHistorialHistorico().subscribe(datos => {
      this.cd.detectChanges()
      this.historicoHistorial = datos;

      if (this.historicoHistorial.length > 0) {
        this.cd.detectChanges();
        new Chart("historicoHistorialChart", {
          type: "line",
          data: {
            labels: datos.map(d => d.fecha),
            datasets: [
              {
                label: "Cantidad",
                data: datos.map(d => d.cantidad),
                tension: 0.3
              }
            ]
          },

          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true
              },
              title: {
                display: true,
                text: 'Historial por Fecha'
              }
            }
          }
        });
        this.cd.detectChanges();
      }
    })
  }
}