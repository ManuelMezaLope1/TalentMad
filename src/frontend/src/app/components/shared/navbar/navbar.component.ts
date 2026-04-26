import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  userName = '';
  menuOpen = false;
  mobileMenuOpen = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkLoginStatus();

    window.addEventListener('storage', () => {
      this.checkLoginStatus();
    });
  }

  checkLoginStatus() {
    const user = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser');
    this.isLoggedIn = !!user;
    if (user) {
      const userData = JSON.parse(user);
      this.userName = userData.name;
    }
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
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');
    this.isLoggedIn = false;
    this.userName = '';
    this.menuOpen = false;
    this.closeMobileMenu();
    this.router.navigate(['/']);
  }


  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-menu')) {
      this.menuOpen = false;
    }
  }
}
