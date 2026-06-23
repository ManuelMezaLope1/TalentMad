import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthServicio } from '../../../servicios/auth/auth-servicio';
import Swal from 'sweetalert2';
import { TemaServicio } from '../../../servicios/global/tema-servicio';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  form = {
    username: '',
    password: '',
  };

  error = '';

  constructor(
    private authServicio: AuthServicio,
    private router: Router,
    private cd: ChangeDetectorRef,
    private temaServicio: TemaServicio
  ) {}

  login() {
    this.authServicio.login(this.form).subscribe({
      next: (res) => {
        this.authServicio.guardarToken(res.token);
        Swal.fire({
          title: 'Login éxitoso',
          text: 'Inicio sesión correctamente',
          icon: 'success',
          confirmButtonText: 'Ok',
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/preguntas']).then(() => {
              window.location.reload();
            });
          }
        });
      },
      error: (err) => {
        Swal.fire({
          title: 'Oops...',
          text: 'Usuario o contraseña incorrecto',
          icon: 'warning',
        });
        this.error = 'Credenciales incorrectas';
      },
    });
  }
}
