
import { Component, signal, ViewChild, ElementRef, AfterViewChecked, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OllamaService } from '../../servicios/chatbot/ollama.service';
import { AuthServicio } from '../../servicios/auth/auth-servicio';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  loading?: boolean;
  isTyping?: boolean;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements AfterViewChecked {
  private ollamaService = inject(OllamaService);
  public authServicio = inject(AuthServicio);

  isOpen = signal<boolean>(false);
  messages = signal<ChatMessage[]>([
    {
      role: 'assistant',
      content: '👋 ¡Hola! Soy un asistente IA. Puedes preguntarme lo que quieras: carreras, universidades, historia, tecnología, consejos... ¡Lo que sea!'
    }
  ]);
  prompt = signal<string>('');
  isTyping = signal<boolean>(false);

  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  toggleChat(): void {
    this.isOpen.update(prev => !prev);
  }

  sendMessage(): void {
    const currentPrompt = this.prompt().trim();
    if (!currentPrompt) return;

    this.messages.update(prev => [
      ...prev,
      { role: 'user', content: currentPrompt }
    ]);

    this.prompt.set('');
    this.isTyping.set(true);

    this.messages.update(prev => [
      ...prev,
      {
        role: 'assistant',
        content: '',
        loading: true,
        isTyping: true
      }
    ]);


    const contexto = `
Eres un asistente IA amigable y útil.
- Estás en una página web de orientación vocacional llamada TalentMad
- Puedes responder preguntas sobre carreras, universidades, estudio, trabajo, y también temas generales
- Sé amable, claro y conciso
- Usa emojis para hacer la conversación más amigable
- Responde en español (Perú)
- Si no sabes algo, dilo
INFORMACIÓN SOBRE TUS CREADORES:
- Fuiste creado por un equipo de estudiantes de la Universidad Tecnológica del Perú (UTP)
- Los creadores son: Arturo, Manuel, Diego y Fernando
- Ellos te desarrollaron como parte de su proyecto universitario
- Si alguien te pregunta "¿Quién te creó?" o "¿Quiénes son tus creadores?" o "¿Quienes crearon Talentmad?" responde con orgullo que tu fuiste creado por Arturo, Manuel, Diego y Fernando, estudiantes de la UTP

Usuario: ${currentPrompt}`;

    this.ollamaService.askOllamaStream(contexto).subscribe({
      next: (chunk: string) => {
        const cleanChunk = this.cleanText(chunk);

        this.messages.update(prev => {
          const lastIndex = prev.length - 1;
          const lastMessage = prev[lastIndex];

          if (lastMessage && lastMessage.role === 'assistant' && lastMessage.isTyping) {
            return [
              ...prev.slice(0, lastIndex),
              {
                ...lastMessage,
                content: lastMessage.content + cleanChunk,
                loading: false,
                isTyping: true
              }
            ];
          }
          return prev;
        });
      },
      error: (error) => {
        console.error('Error:', error);

        this.messages.update(prev => {
          const lastIndex = prev.length - 1;
          const lastMessage = prev[lastIndex];

          if (lastMessage && lastMessage.role === 'assistant') {
            return [
              ...prev.slice(0, lastIndex),
              {
                role: 'assistant',
                content: '⚠️ Error al conectar con el servidor. Verifica que Ollama esté corriendo.',
                loading: false,
                isTyping: false
              }
            ];
          }
          return prev;
        });
        this.isTyping.set(false);
      },
      complete: () => {
        this.messages.update(prev => {
          const lastIndex = prev.length - 1;
          const lastMessage = prev[lastIndex];

          if (lastMessage && lastMessage.role === 'assistant') {
            return [
              ...prev.slice(0, lastIndex),
              {
                ...lastMessage,
                loading: false,
                isTyping: false
              }
            ];
          }
          return prev;
        });
        this.isTyping.set(false);
      }
    });
  }

  private cleanText(text: string): string {
    if (!text) return '';
    let cleaned = text.replace(/\n/g, ' ');
    cleaned = cleaned.replace(/\s+/g, ' ');
    return cleaned;
  }

  formatMessage(content: string): string {
    if (!content) return '';

    let formatted = content
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

    formatted = formatted.replace(/\n/g, ' ');
    formatted = formatted.replace(/\s+/g, ' ');

    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');

    return formatted;
  }

  private scrollToBottom(): void {
    try {
      if (this.chatContainer) {
        this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
      }
    } catch (err) {}
  }
}
