import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

interface RespuestaGuardada {
  [preguntaTexto: string]: boolean;
}

interface CategoriaPregunta {
  id: number;
  nombre: string;
  preguntas: { preguntas: string }[];
}

@Component({
  selector: 'app-resultado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resultado.html',
  styleUrls: ['./resultado.css']
})
export class Resultado implements OnInit, OnDestroy {
  resultadoHtml: SafeHtml = "";
  codigoRIASEC: string = "";
  top3: { categoria: string, puntaje: number, id: number }[] = [];
  todosPuntajes: { categoria: string, puntaje: number, id: number }[] = [];
  isLoading: boolean = true;
  private destroy$ = new Subject<void>();
  
  mapaLetras: { [key: string]: string } = {
    'Realista': 'R',
    'Investigador': 'I',
    'Artístico': 'A',
    'Social': 'S',
    'Emprendedor': 'E',
    'Convencional': 'C'
  };

  constructor(
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

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

// Puntaje del tercer lugar
const puntajeLimite = primeros3[2]?.puntaje ?? 0;

// Incluir todos los que empaten con el tercer puesto
this.top3 = this.todosPuntajes.filter(
  item => item.puntaje >= puntajeLimite
);
      this.codigoRIASEC = this.generarCodigoRIASEC(this.top3);
      
      this.generarResultadosHTMLSimple();
      this.isLoading = false;
    } catch (error) {
      console.error('Error al cargar resultados:', error);
      this.isLoading = false;
      this.resultadoHtml = this.sanitizer.bypassSecurityTrustHtml('<p>Error al cargar los resultados. Por favor, reinicia el test.</p>');
    }
  }

  calcularPuntajesPorCategoria(respuestas: RespuestaGuardada, categorias: CategoriaPregunta[]): { categoria: string, puntaje: number, id: number }[] {
    const puntajes: { [categoriaId: number]: { nombre: string, puntaje: number } } = {};
    
    categorias.forEach(categoria => {
      puntajes[categoria.id] = { nombre: categoria.nombre, puntaje: 0 };
    });
    
    for (const [preguntaTexto, respuesta] of Object.entries(respuestas)) {
      if (respuesta === true) {
        for (const categoria of categorias) {
          const preguntaEncontrada = categoria.preguntas?.find(p => p.preguntas === preguntaTexto);
          if (preguntaEncontrada) {
            puntajes[categoria.id].puntaje++;
            break;
          }
        }
      }
    }
    
    return Object.entries(puntajes)
      .map(([id, data]) => ({ 
        categoria: data.nombre, 
        puntaje: data.puntaje,
        id: parseInt(id)
      }))
      .sort((a, b) => b.puntaje - a.puntaje);
  }

  generarCodigoRIASEC(top3: { categoria: string }[]): string {
    return top3.map(item => this.mapaLetras[item.categoria] || item.categoria.charAt(0)).join('');
  }

  generarResultadosHTMLSimple(): void {
    const top3Items = this.top3.map((item, index) => {
      const medalla = index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉';
      return `<strong>${medalla} ${item.categoria}</strong>: ${item.puntaje} respuestas`;
    }).join('<br>');

    const otrosItems = this.todosPuntajes.slice(3).map(item => {
      return `<strong>${item.categoria}</strong>: ${item.puntaje} respuestas`;
    }).join('<br>');

    const resultadosHTML = `
      <div style="font-family: system-ui, -apple-system, sans-serif; line-height: 1.6;">
        <h1 style="text-align: center; color: #4a5568; margin-bottom: 1rem;">Resultados de tu Test Vocacional RIASEC </h1>
        
        <h2 style="text-align: center; color: #9333ea; margin: 1.5rem 0;">Tu código de personalidad es: <strong style="font-size: 2rem;">${this.codigoRIASEC}</strong></h2>
        
        <hr style="margin: 1.5rem 0; border: 1px solid #e5e7eb;">
        
        <h3 style="color: #4a5568; margin-bottom: 1rem;">Puntajes por categoría:</h3>
        <div style="background: #f3f4f6; padding: 1rem; border-radius: 0.5rem; margin-bottom: 1rem;">
          ${top3Items}
          ${otrosItems ? `<br><br>${otrosItems}` : ''}
        </div>
        
      </div>
    `;

    this.resultadoHtml = this.sanitizer.bypassSecurityTrustHtml(resultadosHTML);
  }

  // Volver al test SIN limpiar respuestas
  volverATest(): void {
    this.router.navigate(['/preguntas']);
  }

  // Reiniciar test - Limpiar TODO y usar replaceUrl para evitar caché
  reiniciarTest(): void {

  localStorage.removeItem('respuestas_test_riasec');
  localStorage.removeItem('currentProgress_riasec');
  localStorage.removeItem('categorias_test_riasec');

  this.router.navigate(['/preguntas']).then(() => {
    window.location.reload();
  });

}
}