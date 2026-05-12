import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';
import { Observable } from 'rxjs';
import { IPreguntas } from '../../../servicios/preguntas/IPreguntas';
import { PreguntasServicio } from '../../../servicios/preguntas/preguntas-servicio';
import { CategoriaPreguntas } from '../../../servicios/categoria-preguntas/categoria-preguntas';
import { CategoriaPreguntasServicio } from '../../../servicios/categoria-preguntas/categoria-preguntas-servicio';

@Component({
  selector: 'app-preguntas',
  imports: [CommonModule, FormsModule],
  templateUrl: './preguntas.html',
  styleUrl: './preguntas.css',
})

export class Preguntas {
  respuesta: string = "";
  resultado: string = "";
  resultadoHtml: SafeHtml = "";

  preguntas: IPreguntas[] = [];
  preguntas$!: Observable<IPreguntas[]>;

  categoriaPreguntas: CategoriaPreguntas[] = [];
  categoriaPreguntas$!: Observable<CategoriaPreguntas[]>;

  respuestaSeleccionada: string = "";

  constructor(private categoriaPreguntasServicio: CategoriaPreguntasServicio, private preguntasServicio: PreguntasServicio, private sanitizer: DomSanitizer, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.categoriaPreguntas$ = this.categoriaPreguntasServicio.obtenerListaDeCategorias();
    this.cd.detectChanges();
  }

  async enviar(): Promise<void> {
    try {
      const res = await fetch("http://localhost:3000/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ texto: this.respuestass })
      });

      const data = await res.json();

      const texto: string = data?.respuestass ?? "";

      this.resultado = texto;

      const html = await marked.parse(texto);

      // 🔒 Sanitizar para Angular
      this.resultadoHtml = this.sanitizer.bypassSecurityTrustHtml(html);
    } catch (error) {
      console.error(error);
      this.resultado = "Error al conectar con el servidor";
    }
  }

  respuestas: { [pregunta: string]: string } = {};
  respuestass: string = '';

  actualizarAlmacen() {
    const unicos = [...new Set(Object.values(this.respuestas))];

    this.respuestass = unicos
      .filter(r => r)
      .join(' + ');
  }
}
