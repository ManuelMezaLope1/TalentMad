import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

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
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  protected readonly busqueda = signal('');

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
}