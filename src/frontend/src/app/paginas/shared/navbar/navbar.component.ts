import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthServicio } from '../../../servicios/auth/auth-servicio';
import { UsuarioServicio } from '../../../servicios/usuario/usuario-servicio';
import { tap, catchError, of } from 'rxjs';

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
  usuario: any;
  username: string;

  constructor(private router: Router, public authServicio: AuthServicio, private usuarioServicio: UsuarioServicio, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.usuarioServicio.obtenerPerfil().pipe(
      tap(data => {
        this.usuario = data;
        this.cd.detectChanges();
      }),
      catchError(error => {
        console.error(error);
        return of(null);
      })
    ).subscribe();
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
    this.menuOpen = false;
    this.authServicio.logout();
    this.router.navigate(['/login']);
  }
}