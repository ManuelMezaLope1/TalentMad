import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthServicio } from '../../../servicios/auth-servicio';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  form={
    username:'',
    password:''
  }

  error='';

  constructor(private authServicio: AuthServicio, private router: Router){}

  login() {
    this.authServicio.login(this.form).subscribe({
      next: res => {
        this.authServicio.guardarToken(res.token);
        this.router.navigate(['/preguntas']);
      },
      error: err => {
        this.error = 'Credenciales incorrectas';
      }
    });
  }
}
