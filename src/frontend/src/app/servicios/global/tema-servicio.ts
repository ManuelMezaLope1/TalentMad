import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TemaServicio {
  private theme: 'light' | 'dark' = 'light';

  constructor() {
    const saved = localStorage.getItem('theme') as 'light' | 'dark';
    if (saved) {
      this.setTheme(saved);
    }
  }

  setTheme(theme: 'light' | 'dark') {
    this.theme = theme;
    document.body.className = theme;
  }

  getTheme() {
    return this.theme;
  }

  toggleTheme() {
    this.setTheme(this.theme === 'light' ? 'dark' : 'light');
  }
}