import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

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

  constructor(private sanitizer: DomSanitizer, private cd: ChangeDetectorRef) { }

  ngOnInit(): void{
    this.cd.detectChanges();
  }

  async enviar(): Promise<void> {
    try {
      const res = await fetch("http://localhost:3000/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ texto: this.respuesta })
      });

      const data = await res.json();

      const texto: string = data?.respuesta ?? "";

      this.resultado = texto;

      const html = await marked.parse(texto);

      // 🔒 Sanitizar para Angular
      this.resultadoHtml = this.sanitizer.bypassSecurityTrustHtml(html);
    } catch (error) {
      console.error(error);
      this.resultado = "Error al conectar con el servidor";
    }
  }

  respuestas: string[] = ['', ''];

  actualizarAlmacen() {
    const unicos = [...new Set(this.respuestas)];

    this.respuesta = unicos
      .filter(r => r)
      .join(' + ');
  }
}
