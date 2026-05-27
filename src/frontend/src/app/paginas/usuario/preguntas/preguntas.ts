import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CategoriaPreguntas } from '../../../servicios/categoria-preguntas/categoria-preguntas';
import { CategoriaPreguntasServicio } from '../../../servicios/categoria-preguntas/categoria-preguntas-servicio';

@Component({
  selector: 'app-preguntas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './preguntas.html',
  styleUrls: ['./preguntas.css']
})
export class Preguntas implements OnInit, OnDestroy {
  // Variables existentes
  resultado: string = "";
  resultadoHtml: SafeHtml = "";
  respuestas: { [pregunta: string]: string } = {};
  respuestass: string = '';
  
  // Datos del backend
  categoriaPreguntas: CategoriaPreguntas[] = [];
  private destroy$ = new Subject<void>();
  
  // Variables para el diseño
  currentCategoryIndex = 0;
  currentQuestionIndex = 0;
  selectedAnswer: string | null = null;
  isLoading = true;
  
  ratingLabels = ['Muy en desacuerdo', 'En desacuerdo', 'Neutral', 'De acuerdo', 'Muy de acuerdo'];
  ratingValues = [1, 2, 3, 4, 5];

  constructor(
    private categoriaPreguntasServicio: CategoriaPreguntasServicio,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarCategorias();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  cargarCategorias(): void {
    this.isLoading = true;
    this.categoriaPreguntasServicio.obtenerListaDeCategorias()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (categorias) => {
          this.categoriaPreguntas = categorias;
          this.isLoading = false;
          this.cargarRespuestasGuardadas();
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error al cargar categorías:', error);
          this.isLoading = false;
          this.cdr.detectChanges();
        }
      });
  }

  cargarRespuestasGuardadas(): void {
    const saved = localStorage.getItem('respuestas_test');
    if (saved) {
      this.respuestas = JSON.parse(saved);
      this.actualizarAlmacen();
      
      // Cargar última posición
      const savedPosition = localStorage.getItem('currentProgress');
      if (savedPosition) {
        const position = JSON.parse(savedPosition);
        this.currentCategoryIndex = position.categoryIndex || 0;
        this.currentQuestionIndex = position.questionIndex || 0;
      }
    }
  }

  // Obtener la pregunta actual
  get currentQuestion(): any {
    if (!this.categoriaPreguntas.length) return null;
    const currentCategory = this.categoriaPreguntas[this.currentCategoryIndex];
    if (!currentCategory?.preguntas?.length) return null;
    return currentCategory.preguntas[this.currentQuestionIndex];
  }

  // Obtener la categoría actual
  get currentCategory(): CategoriaPreguntas | null {
    return this.categoriaPreguntas[this.currentCategoryIndex] || null;
  }

  // Calcular progreso total
  get totalProgress(): number {
    if (!this.categoriaPreguntas.length) return 0;
    
    let totalQuestions = 0;
    let answeredQuestions = 0;
    
    this.categoriaPreguntas.forEach(categoria => {
      categoria.preguntas?.forEach(pregunta => {
        totalQuestions++;
        if (this.respuestas[pregunta.preguntas]) {
          answeredQuestions++;
        }
      });
    });
    
    return totalQuestions === 0 ? 0 : (answeredQuestions / totalQuestions) * 100;
  }

  // Manejar respuesta
  handleAnswer(value: number): void {
    const question = this.currentQuestion;
    if (question) {
      const respuestaTexto = this.ratingLabels[value - 1];
      this.respuestas[question.preguntas] = respuestaTexto;
      this.selectedAnswer = respuestaTexto;
      this.actualizarAlmacen();
      
      // Auto-avanzar después de seleccionar
      setTimeout(() => {
        this.handleNext();
        this.cdr.detectChanges();
      }, 300);
    }
  }

  // Siguiente pregunta
  handleNext(): void {
    const currentCategory = this.currentCategory;
    if (!currentCategory) return;
    
    // Si hay más preguntas en la misma categoría
    if (this.currentQuestionIndex < currentCategory.preguntas.length - 1) {
      this.currentQuestionIndex++;
      this.selectedAnswer = this.respuestas[currentCategory.preguntas[this.currentQuestionIndex]?.preguntas] || null;
    } 
    // Si hay más categorías
    else if (this.currentCategoryIndex < this.categoriaPreguntas.length - 1) {
      this.currentCategoryIndex++;
      this.currentQuestionIndex = 0;
      this.selectedAnswer = this.respuestas[this.categoriaPreguntas[this.currentCategoryIndex]?.preguntas?.[0]?.preguntas] || null;
    }
    // Si es la última pregunta, mostrar resultados
    else {
      this.enviar();
    }
    
    this.guardarProgreso();
    this.cdr.detectChanges();
  }

  // Anterior pregunta
  handlePrevious(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      const question = this.currentQuestion;
      this.selectedAnswer = question ? this.respuestas[question.preguntas] || null : null;
    } 
    else if (this.currentCategoryIndex > 0) {
      this.currentCategoryIndex--;
      const previousCategory = this.categoriaPreguntas[this.currentCategoryIndex];
      this.currentQuestionIndex = previousCategory.preguntas.length - 1;
      const question = this.currentQuestion;
      this.selectedAnswer = question ? this.respuestas[question.preguntas] || null : null;
    }
    
    this.guardarProgreso();
    this.cdr.detectChanges();
  }

  // Ir a pregunta específica
  goToQuestion(categoryIndex: number, questionIndex: number): void {
    this.currentCategoryIndex = categoryIndex;
    this.currentQuestionIndex = questionIndex;
    const question = this.currentQuestion;
    this.selectedAnswer = question ? this.respuestas[question.preguntas] || null : null;
    this.guardarProgreso();
    this.cdr.detectChanges();
  }

  guardarProgreso(): void {
    localStorage.setItem('currentProgress', JSON.stringify({
      categoryIndex: this.currentCategoryIndex,
      questionIndex: this.currentQuestionIndex
    }));
  }

  // Actualizar almacenamiento local
  actualizarAlmacen() {
    const unicos = [...new Set(Object.values(this.respuestas))];
    this.respuestass = unicos.filter(r => r).join(' + ');
    
    // Guardar en localStorage
    localStorage.setItem('respuestas_test', JSON.stringify(this.respuestas));
    this.guardarProgreso();
  }

  // Enviar al backend
  async enviar(): Promise<void> {
    if (!this.respuestass.trim()) {
      console.log('No hay respuestas para enviar');
      return;
    }
    
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
      this.resultadoHtml = this.sanitizer.bypassSecurityTrustHtml(html);
      this.cdr.detectChanges();
    } catch (error) {
      console.error(error);
      this.resultado = "Error al conectar con el servidor";
      this.cdr.detectChanges();
    }
  }

  // Verificar si una pregunta está respondida
  isQuestionAnswered(categoryIndex: number, questionIndex: number): boolean {
    const category = this.categoriaPreguntas[categoryIndex];
    if (category?.preguntas?.[questionIndex]) {
      return !!this.respuestas[category.preguntas[questionIndex].preguntas];
    }
    return false;
  }
}