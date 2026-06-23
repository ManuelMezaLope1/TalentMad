import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthServicio } from '../../servicios/auth/auth-servicio';
import { CommonModule } from '@angular/common';
import { TemaServicio } from '../../servicios/global/tema-servicio';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(public authServicio: AuthServicio, public temaServicio: TemaServicio) { }

  // Método para manejar el acordeón FAQ
  toggleFaq(event: Event): void {
    const questionElement = event.currentTarget as HTMLElement;
    const answerElement = questionElement.nextElementSibling as HTMLElement;
    const icon = questionElement.querySelector('i');

    if (answerElement) {
      answerElement.classList.toggle('show');
      answerElement.classList.toggle('mt-3');
    }

    if (icon) {
      icon.classList.toggle('rotate');
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
