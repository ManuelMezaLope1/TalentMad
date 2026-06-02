import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CategoriaPreguntas } from '../../../servicios/categoria-preguntas/categoria-preguntas';
import { CategoriaPreguntasServicio } from '../../../servicios/categoria-preguntas/categoria-preguntas-servicio';

interface RespuestaGuardada {
  [preguntaTexto: string]: number;
}

@Component({
  selector: 'app-preguntas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './preguntas.html',
  styleUrls: ['./preguntas.css']
})
export class Preguntas implements OnInit, OnDestroy {
  respuestas: RespuestaGuardada = {};
  categoriaPreguntas: CategoriaPreguntas[] = [];
  private destroy$ = new Subject<void>();

  currentCategoryIndex = 0;
  currentQuestionIndex = 0;
  selectedAnswer: number | null = null;
  isLoading = true;

  private isProcessingAnswer = false;

  opcionesRespuesta = [
    { valor: 1, etiqueta: 'Me disgusta mucho' },
    { valor: 2, etiqueta: 'Me disgusta' },
    { valor: 3, etiqueta: 'Neutral' },
    { valor: 4, etiqueta: 'Me gusta' },
    { valor: 5, etiqueta: 'Me gusta mucho' },
  ];

  constructor(
    private categoriaPreguntasServicio: CategoriaPreguntasServicio,
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

  // ── Computed ──────────────────────────────────────────────────────────────

  get totalPreguntas(): number {
    return this.categoriaPreguntas.reduce((sum, cat) => sum + (cat.preguntas?.length || 0), 0);
  }

  get preguntasRespondidas(): number {
    let count = 0;
    this.categoriaPreguntas.forEach((cat) =>
      cat.preguntas?.forEach((p) => {
        if (this.respuestas[p.preguntas] !== undefined) count++;
      })
    );
    return count;
  }

  get todasPreguntasRespondidas(): boolean {
    return this.preguntasRespondidas === this.totalPreguntas && this.totalPreguntas > 0;
  }

  get preguntaGlobalActual(): number {
    let idx = 0;
    for (let i = 0; i < this.currentCategoryIndex; i++) {
      idx += this.categoriaPreguntas[i].preguntas?.length || 0;
    }
    return idx + this.currentQuestionIndex;
  }

  obtenerNumeroPreguntaGlobal(): number {
    return this.preguntaGlobalActual + 1;
  }

  get currentQuestion(): any {
    if (!this.categoriaPreguntas.length) return null;
    const cat = this.categoriaPreguntas[this.currentCategoryIndex];
    if (!cat?.preguntas?.length) return null;
    if (this.currentQuestionIndex < 0 || this.currentQuestionIndex >= cat.preguntas.length) {
      this.currentQuestionIndex = 0;
    }
    return cat.preguntas[this.currentQuestionIndex] || null;
  }

  get currentCategory(): CategoriaPreguntas | null {
    return this.categoriaPreguntas[this.currentCategoryIndex] || null;
  }

  get totalProgress(): number {
    if (this.totalPreguntas === 0) return 0;
    return (this.preguntasRespondidas / this.totalPreguntas) * 100;
  }

  get puedeIrAtras(): boolean {
    return this.obtenerNumeroPreguntaGlobal() > 1;
  }

  get puedeIrAdelante(): boolean {
    const q = this.currentQuestion;
    return q ? this.respuestas[q.preguntas] !== undefined : false;
  }

  get mostrarNumerosNavegacion(): number[] {
    const actual = this.obtenerNumeroPreguntaGlobal();
    const total = this.totalPreguntas;
    let inicio = Math.max(1, actual - 2);
    let fin = Math.min(total, actual + 2);
    if (actual <= 3) fin = Math.min(total, 5);
    if (actual >= total - 2) inicio = Math.max(1, total - 4);
    const nums: number[] = [];
    for (let i = inicio; i <= fin; i++) nums.push(i);
    return nums;
  }

  // ── Navigation helpers ────────────────────────────────────────────────────

  estaRespondidaPorNumero(numero: number): boolean {
    let contador = 1;
    for (const cat of this.categoriaPreguntas) {
      for (const preg of (cat.preguntas || [])) {
        if (contador === numero) return this.respuestas[preg.preguntas] !== undefined;
        contador++;
      }
    }
    return false;
  }

  puedeNavegarANumero(numero: number): boolean {
    const actual = this.obtenerNumeroPreguntaGlobal();
    if (numero <= actual) return true;
    for (let i = actual; i < numero; i++) {
      if (!this.estaRespondidaPorNumero(i)) return false;
    }
    return true;
  }

  irAPreguntaPorNumero(numero: number): void {
    if (!this.puedeNavegarANumero(numero)) return;
    let contador = 1;
    for (let ci = 0; ci < this.categoriaPreguntas.length; ci++) {
      const cat = this.categoriaPreguntas[ci];
      for (let qi = 0; qi < (cat.preguntas?.length || 0); qi++) {
        if (contador === numero) {
          this.currentCategoryIndex = ci;
          this.currentQuestionIndex = qi;
          const q = this.currentQuestion;
          this.selectedAnswer = q ? (this.respuestas[q.preguntas] ?? null) : null;
          this.guardarProgreso();
          this.cdr.detectChanges();
          return;
        }
        contador++;
      }
    }
  }

  // ── Data loading ──────────────────────────────────────────────────────────

  cargarCategorias(): void {
    this.isLoading = true;
    this.categoriaPreguntasServicio.obtenerListaDeCategorias()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (categorias) => {
          this.categoriaPreguntas = categorias;
          this.cargarRespuestasGuardadas();
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
    this.currentCategoryIndex = 0;
    this.currentQuestionIndex = 0;
    this.selectedAnswer = null;
    this.respuestas = {};

    const saved = localStorage.getItem('respuestas_test_riasec');
    if (!saved) return;

    this.respuestas = JSON.parse(saved);

    const savedPosition = localStorage.getItem('currentProgress_riasec');
    if (savedPosition) {
      const position = JSON.parse(savedPosition);
      this.currentCategoryIndex = position.categoryIndex ?? 0;
      this.currentQuestionIndex = position.questionIndex ?? 0;
    }

    const q = this.currentQuestion;
    if (q && this.respuestas[q.preguntas] !== undefined) {
      this.selectedAnswer = this.respuestas[q.preguntas];
    }
  }

  // ── Answer handling ───────────────────────────────────────────────────────

  /**
   * ✅ CORREGIDO: Permite actualizar una respuesta ya contestada.
   * Antes bloqueaba re-responder, lo que impedía corregir errores
   * y acumulaba mal los puntajes al navegar atrás.
   *
   * Ahora: si ya existe una respuesta para esta pregunta, simplemente
   * la sobreescribe con el nuevo valor y no avanza automáticamente
   * (el usuario ya decidió revisarla conscientemente).
   */
  handleAnswer(respuesta: number): void {
    if (this.isProcessingAnswer) return;

    const question = this.currentQuestion;
    if (!question) return;

    const yaRespondida = this.respuestas[question.preguntas] !== undefined;

    this.isProcessingAnswer = true;
    this.respuestas[question.preguntas] = respuesta; // sobreescribe si ya existía
    this.selectedAnswer = respuesta;
    this.actualizarAlmacen();
    this.cdr.detectChanges();

    if (!yaRespondida) {
      // Primera vez que se responde → avanza automáticamente
      setTimeout(() => {
        this.handleNext();
        this.isProcessingAnswer = false;
        this.cdr.detectChanges();
      }, 200);
    } else {
      // Actualización de respuesta → no avanza, el usuario revisa
      this.isProcessingAnswer = false;
    }
  }

  handleNext(): void {
    const cat = this.currentCategory;
    if (!cat) return;

    const esUltima =
      this.currentCategoryIndex === this.categoriaPreguntas.length - 1 &&
      this.currentQuestionIndex === (cat.preguntas?.length || 0) - 1;

    if (esUltima && this.todasPreguntasRespondidas) {
      this.enviar();
      return;
    }

    if (esUltima) return; // última pero no todo respondido

    if (this.currentQuestionIndex < cat.preguntas.length - 1) {
      this.currentQuestionIndex++;
    } else if (this.currentCategoryIndex < this.categoriaPreguntas.length - 1) {
      this.currentCategoryIndex++;
      this.currentQuestionIndex = 0;
    }

    const nextQ = this.currentQuestion;
    this.selectedAnswer = nextQ ? (this.respuestas[nextQ.preguntas] ?? null) : null;
    this.guardarProgreso();
    this.cdr.detectChanges();
  }

  handlePrevious(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    } else if (this.currentCategoryIndex > 0) {
      this.currentCategoryIndex--;
      const prevCat = this.categoriaPreguntas[this.currentCategoryIndex];
      this.currentQuestionIndex = prevCat.preguntas.length - 1;
    }

    const q = this.currentQuestion;
    this.selectedAnswer = q ? (this.respuestas[q.preguntas] ?? null) : null;
    this.guardarProgreso();
    this.cdr.detectChanges();
  }

  // ── Storage ───────────────────────────────────────────────────────────────

  guardarProgreso(): void {
    localStorage.setItem('currentProgress_riasec', JSON.stringify({
      categoryIndex: this.currentCategoryIndex,
      questionIndex: this.currentQuestionIndex,
    }));
  }

  actualizarAlmacen(): void {
    localStorage.setItem('respuestas_test_riasec', JSON.stringify(this.respuestas));
    this.guardarProgreso();
  }

  async enviar(): Promise<void> {
    if (!this.todasPreguntasRespondidas) return;
    localStorage.setItem('categorias_test_riasec', JSON.stringify(this.categoriaPreguntas));
    this.router.navigate(['/resultado']);
  }
}