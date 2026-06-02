import { ChangeDetectorRef, Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthServicio } from '../../../servicios/auth/auth-servicio';
import { UsuarioServicio } from '../../../servicios/usuario/usuario-servicio';
import { tap, catchError, of, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  menuOpen = false;
  mobileMenuOpen = false;
  usuario: any = null;
  username: string = '';
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    public authServicio: AuthServicio,
    private usuarioServicio: UsuarioServicio,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Solo carga el perfil si hay sesión activa
    if (this.authServicio.logueado()) {
      this.cd.detectChanges();
      this.cargarPerfil();
      this.cd.detectChanges();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  cargarPerfil(): void {
    this.usuarioServicio.obtenerPerfil().pipe(
      tap(data => {
        this.usuario = data;
        this.cd.detectChanges();
      }),
      catchError(error => {
        console.error(error);
        this.usuario = null;
        return of(null);
      }),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  scrollToSection(sectionId: string): void {
    this.closeMobileMenu();
    if (this.router.url !== '/') {
      this.router.navigate(['/']).then(() => {
        setTimeout(() => {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      });
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  toggleUserMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    document.body.style.overflow = this.mobileMenuOpen ? 'hidden' : '';
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
    document.body.style.overflow = '';
  }

  logout() {
    // 1. Limpia las respuestas del test del usuario anterior
    localStorage.removeItem('respuestas_test_riasec');
    localStorage.removeItem('currentProgress_riasec');
    localStorage.removeItem('categorias_test_riasec');

    // 2. Limpia el usuario en memoria para que el navbar no lo muestre
    this.usuario = null;
    this.menuOpen = false;

    // 3. Cierra sesión y redirige
    this.authServicio.logout();
    this.router.navigate(['/login']);
  }

  irDashboard() {
    this.router.navigate(['dashboard']);
  }
}
