import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthServicio } from '../../../servicios/auth/auth-servicio';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  menuOpen = false;
  mobileMenuOpen = false;

  constructor(private router: Router, public authServicio: AuthServicio) {}

  ngOnInit() {
  }


 scrollToSection(sectionId: string): void {
  this.closeMobileMenu();


  if (this.router.url !== '/') {
    this.router.navigate(['/']).then(() => {

      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    });
  } else {

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

  toggleUserMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    if (this.mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
    document.body.style.overflow = '';
  }

  logout() {
    this.authServicio.logout();
    this.router.navigate(['/iniciar-sesion']);
  }
}
