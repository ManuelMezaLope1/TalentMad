import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  // Método para manejar el acordeón FAQ
toggleFaq(event: Event): void {
  const questionElement = event.currentTarget as HTMLElement;
  const answerElement = questionElement.nextElementSibling as HTMLElement;
  const icon = questionElement.querySelector('i');
  
  if (answerElement) {
    answerElement.classList.toggle('show');
    
    if (icon) {
      if (answerElement.classList.contains('show')) {
        icon.style.transform = 'rotate(180deg)';  // <-- CIERRA LA COMILLA
      } else {
        icon.style.transform = 'rotate(0deg)';     // <-- CIERRA LA COMILLA
      }
    }
  }
}

  // Método para scroll suave a secciones
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}