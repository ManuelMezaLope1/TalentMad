import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CategoriaPreguntas } from '../../../servicios/categoria-preguntas/categoria-preguntas';
import { CategoriaPreguntasServicio } from '../../../servicios/categoria-preguntas/categoria-preguntas-servicio';

interface RespuestaGuardada {
  [preguntaTexto: string]: boolean;
}

@Component({
  selector: 'app-preguntas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './preguntas.html',
  styleUrls: ['./preguntas.css']
})
export class Preguntas implements OnInit, OnDestroy {
  resultado: string = "";
  resultadoHtml: SafeHtml = "";
  respuestas: RespuestaGuardada = {};
  
  categoriaPreguntas: CategoriaPreguntas[] = [];
  private destroy$ = new Subject<void>();
  
  currentCategoryIndex = 0;
  currentQuestionIndex = 0;
  selectedAnswer: boolean | null = null;
  isLoading = true;
  
  private isProcessingAnswer = false;
  
  opcionesRespuesta = [
    { valor: true, etiqueta: 'Sí' },
    { valor: false, etiqueta: 'No' }
  ];

  constructor(
    private categoriaPreguntasServicio: CategoriaPreguntasServicio,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarCategorias();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get totalPreguntas(): number {
    let total = 0;
    this.categoriaPreguntas.forEach(cat => {
      total += cat.preguntas?.length || 0;
    });
    return total;
  }

  get preguntasRespondidas(): number {
    let respondidas = 0;
    this.categoriaPreguntas.forEach(cat => {
      cat.preguntas?.forEach(preg => {
        if (this.respuestas[preg.preguntas] !== undefined) {
          respondidas++;
        }
      });
    });
    return respondidas;
  }

  get todasPreguntasRespondidas(): boolean {
    return this.preguntasRespondidas === this.totalPreguntas;
  }

  get isCurrentQuestionAnswered(): boolean {
    const currentQ = this.currentQuestion;
    return currentQ ? this.respuestas[currentQ.preguntas] !== undefined : false;
  }

  get preguntaGlobalActual(): number {
    let indiceGlobal = 0;
    for (let i = 0; i < this.currentCategoryIndex; i++) {
      indiceGlobal += this.categoriaPreguntas[i].preguntas?.length || 0;
    }
    indiceGlobal += this.currentQuestionIndex;
    return indiceGlobal;
  }

  obtenerNumeroPreguntaGlobal(): number {
    return this.preguntaGlobalActual + 1;
  }

  get mostrarNumerosNavegacion(): number[] {
    const actual = this.obtenerNumeroPreguntaGlobal();
    const total = this.totalPreguntas;
    
    let inicio = Math.max(1, actual - 2);
    let fin = Math.min(total, actual + 2);
    
    if (actual <= 3) {
      fin = Math.min(total, 5);
    }
    
    if (actual >= total - 2) {
      inicio = Math.max(1, total - 4);
    }
    
    const numeros: number[] = [];
    for (let i = inicio; i <= fin; i++) {
      numeros.push(i);
    }
    return numeros;
  }

  estaRespondidaPorNumero(numero: number): boolean {
    let contador = 1;
    for (let catIdx = 0; catIdx < this.categoriaPreguntas.length; catIdx++) {
      const categoria = this.categoriaPreguntas[catIdx];
      for (let preIdx = 0; preIdx < (categoria.preguntas?.length || 0); preIdx++) {
        if (contador === numero) {
          const pregunta = categoria.preguntas[preIdx];
          return this.respuestas[pregunta.preguntas] !== undefined;
        }
        contador++;
      }
    }
    return false;
  }

  puedeNavegarANumero(numero: number): boolean {
    const actual = this.obtenerNumeroPreguntaGlobal();
    
    if (numero === actual) return true;
    if (numero < actual) return true;
    
    if (numero > actual) {
      for (let i = actual; i < numero; i++) {
        if (!this.estaRespondidaPorNumero(i)) {
          return false;
        }
      }
      return true;
    }
    
    return false;
  }

  irAPreguntaPorNumero(numero: number): void {
    if (!this.puedeNavegarANumero(numero)) {
      return;
    }
    
    let contador = 1;
    for (let catIdx = 0; catIdx < this.categoriaPreguntas.length; catIdx++) {
      const categoria = this.categoriaPreguntas[catIdx];
      for (let preIdx = 0; preIdx < (categoria.preguntas?.length || 0); preIdx++) {
        if (contador === numero) {
          this.currentCategoryIndex = catIdx;
          this.currentQuestionIndex = preIdx;
          const question = this.currentQuestion;
          this.selectedAnswer = question ? (this.respuestas[question.preguntas] ?? null) : null;
          this.guardarProgreso();
          this.cdr.detectChanges();
          return;
        }
        contador++;
      }
    }
  }

  get puedeIrAtras(): boolean {
    const actual = this.obtenerNumeroPreguntaGlobal();
    return actual > 1;
  }

  get puedeIrAdelante(): boolean {
    const currentQ = this.currentQuestion;
    const estaRespondida = currentQ ? this.respuestas[currentQ.preguntas] !== undefined : false;
    return estaRespondida;
  }

  cargarCategorias(): void {
    this.isLoading = true;
    this.categoriaPreguntasServicio.obtenerListaDeCategorias()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (categorias) => {
  this.categoriaPreguntas = categorias;

  this.cargarRespuestasGuardadas();
  console.log(this.categoriaPreguntas);
  console.log(this.currentQuestion);
  
  // FORZAR pregunta inicial válida
  if (!this.currentQuestion && this.categoriaPreguntas.length > 0) {
    this.currentCategoryIndex = 0;
    this.currentQuestionIndex = 0;
    this.selectedAnswer = null;
  }

  this.isLoading = false;
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

  // REINICIAR SIEMPRE LOS VALORES
  this.currentCategoryIndex = 0;
  this.currentQuestionIndex = 0;
  this.selectedAnswer = null;
  this.respuestas = {};

  const saved = localStorage.getItem('respuestas_test_riasec');

  // Si no hay datos guardados
  if (!saved) {
    return;
  }

  // Cargar respuestas
  this.respuestas = JSON.parse(saved);

  // Cargar posición
  const savedPosition = localStorage.getItem('currentProgress_riasec');

  if (savedPosition) {
    const position = JSON.parse(savedPosition);

    this.currentCategoryIndex = position.categoryIndex ?? 0;
    this.currentQuestionIndex = position.questionIndex ?? 0;
  }

  // Cargar respuesta seleccionada
  const currentQuestion = this.currentQuestion;

  if (
    currentQuestion &&
    this.respuestas[currentQuestion.preguntas] !== undefined
  ) {
    this.selectedAnswer =
      this.respuestas[currentQuestion.preguntas];
  }
}

get currentQuestion(): any {

  if (!this.categoriaPreguntas.length) {
    return null;
  }

  const currentCategory =
    this.categoriaPreguntas[this.currentCategoryIndex];

  if (
    !currentCategory ||
    !currentCategory.preguntas ||
    currentCategory.preguntas.length === 0
  ) {
    return null;
  }

  // SI EL ÍNDICE SE PASA
  if (
    this.currentQuestionIndex < 0 ||
    this.currentQuestionIndex >= currentCategory.preguntas.length
  ) {
    this.currentQuestionIndex = 0;
  }

  return currentCategory.preguntas[this.currentQuestionIndex] || null;
}

  get currentCategory(): CategoriaPreguntas | null {
    return this.categoriaPreguntas[this.currentCategoryIndex] || null;
  }

  get totalProgress(): number {
    if (this.totalPreguntas === 0) return 0;
    return (this.preguntasRespondidas / this.totalPreguntas) * 100;
  }

  handleAnswer(respuesta: boolean): void {
    if (this.isProcessingAnswer) {
      return;
    }
    
    const question = this.currentQuestion;
    if (!question) return;
    
    if (this.respuestas[question.preguntas] !== undefined) {
      return;
    }
    
    this.isProcessingAnswer = true;
    
    this.respuestas[question.preguntas] = respuesta;
    this.selectedAnswer = respuesta;
    this.actualizarAlmacen();
    
    this.cdr.detectChanges();
    
    setTimeout(() => {
      this.handleNext();
      this.isProcessingAnswer = false;
      this.cdr.detectChanges();
    }, 200);
  }

  handleNext(): void {
    const currentCategory = this.currentCategory;
    if (!currentCategory) return;
    
    const esUltimaPregunta = this.currentCategoryIndex === this.categoriaPreguntas.length - 1 && 
                             this.currentQuestionIndex === (currentCategory.preguntas?.length || 0) - 1;
    
    if (esUltimaPregunta && this.todasPreguntasRespondidas) {
      this.enviar();
      return;
    }
    
    if (esUltimaPregunta && !this.todasPreguntasRespondidas) {
      return;
    }
    
    if (this.currentQuestionIndex < currentCategory.preguntas.length - 1) {
      this.currentQuestionIndex++;
      const nextQuestion = this.currentQuestion;
      this.selectedAnswer = nextQuestion ? (this.respuestas[nextQuestion.preguntas] ?? null) : null;
    } 
    else if (this.currentCategoryIndex < this.categoriaPreguntas.length - 1) {
      this.currentCategoryIndex++;
      this.currentQuestionIndex = 0;
      const nextQuestion = this.currentQuestion;
      this.selectedAnswer = nextQuestion ? (this.respuestas[nextQuestion.preguntas] ?? null) : null;
    }
    
    this.guardarProgreso();
    this.cdr.detectChanges();
  }

  handlePrevious(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      const question = this.currentQuestion;
      this.selectedAnswer = question ? (this.respuestas[question.preguntas] ?? null) : null;
    } 
    else if (this.currentCategoryIndex > 0) {
      this.currentCategoryIndex--;
      const previousCategory = this.categoriaPreguntas[this.currentCategoryIndex];
      this.currentQuestionIndex = previousCategory.preguntas.length - 1;
      const question = this.currentQuestion;
      this.selectedAnswer = question ? (this.respuestas[question.preguntas] ?? null) : null;
    }
    
    this.guardarProgreso();
    this.cdr.detectChanges();
  }

  guardarProgreso(): void {
    localStorage.setItem('currentProgress_riasec', JSON.stringify({
      categoryIndex: this.currentCategoryIndex,
      questionIndex: this.currentQuestionIndex
    }));
  }

  actualizarAlmacen() {
    localStorage.setItem('respuestas_test_riasec', JSON.stringify(this.respuestas));
    this.guardarProgreso();
  }

  async enviar(): Promise<void> {
    if (!this.todasPreguntasRespondidas) {
      console.log('No todas las preguntas están respondidas');
      return;
    }
    
    // Guardar las categorías en localStorage para la página de resultados
    localStorage.setItem('categorias_test_riasec', JSON.stringify(this.categoriaPreguntas));
    
    // Redirigir a la página de resultados
    this.router.navigate(['/resultado']);
  }
}