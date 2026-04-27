import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login';
import { Registro } from './components/auth/registro/registro';
import { AuthGuard } from './guards/auth-guard';
import { Preguntas } from './components/preguntas/preguntas';

export const routes: Routes = [
    { path: '', redirectTo: 'inicio', pathMatch: 'full' },
    { path: 'inicio', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: Registro },
    { path: 'preguntas', component: Preguntas, canActivate: [AuthGuard], data: { roles: ['ROLE_USER']} }
];

RouterModule.forRoot(routes, {
  scrollPositionRestoration: 'enabled'
})