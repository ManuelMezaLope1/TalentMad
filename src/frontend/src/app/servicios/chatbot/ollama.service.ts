import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OllamaService {

  constructor() { }

  askOllamaStream(prompt: string): Observable<string> {
    return new Observable((subscriber: Subscriber<string>) => {
      const fetchStream = async () => {
        try {
          const response = await fetch('http://localhost:11434/api/chat', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              model: 'llama3',
              stream: true,
              messages: [
                {
                  role: 'system',
                  content: `Eres un asistente informativo experto. Responde de forma clara, amable y útil.`
                },
                {
                  role: 'user',
                  content: prompt
                }
              ]
            })
          });

          if (!response.body) {
            subscriber.error('No se recibió respuesta del servidor');
            subscriber.complete();
            return;
          }

          const reader = response.body.getReader();
          const decoder = new TextDecoder();
          let buffer = '';

          while (true) {
            const { done, value } = await reader.read();

            if (done) {
              subscriber.complete();
              break;
            }

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';

            for (const line of lines) {
              if (!line.trim()) continue;

              try {
                const json = JSON.parse(line);
                if (json.message?.content) {
                  subscriber.next(json.message.content);
                }
              } catch (error) {
                console.error('Error parsing JSON:', error);
              }
            }
          }
        } catch (error) {
          subscriber.error('Error al conectar con Ollama');
          subscriber.complete();
        }
      };

      fetchStream();
    });
  }
}
