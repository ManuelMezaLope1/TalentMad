import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './paginas/home/home.component';
import { LoginComponent } from './components/auth/login/login';
import { Registro } from './components/auth/registro/registro';
import { AuthGuard } from './guards/auth-guard';
import { Preguntas } from './paginas/usuario/preguntas/preguntas';
import { Resultado } from './paginas/usuario/resultado/resultado';
import { DetalleCarrera }  from './paginas/usuario/detallecarrera/detallecarrera';
import { Perfil } from './paginas/usuario/perfil/perfil';
import { Dashboard } from './paginas/admin/dashboard/dashboard';
import { PreguntasAdmin } from './paginas/admin/preguntas-admin/preguntas-admin';
import { RegistroCategoriaPreguntas } from './components/categoria-preguntas/registro-categoria-preguntas/registro-categoria-preguntas';
import { ActualizacionCategoriaPreguntas } from './components/categoria-preguntas/actualizacion-categoria-preguntas/actualizacion-categoria-preguntas';
import { ActualizacionPreguntas } from './components/preguntas-admin/actualizacion-preguntas/actualizacion-preguntas';
import { RegistroPreguntas } from './components/preguntas-admin/registro-preguntas/registro-preguntas';
import { Universidad } from './paginas/admin/universidad/universidad';
import { RegistroUniversidad } from './components/universidad/registro-universidad/registro-universidad';
import { ActualizacionUniversidad } from './components/universidad/actualizacion-universidad/actualizacion-universidad';
import { Beca } from './paginas/admin/beca/beca';
import { Carrera } from './paginas/admin/carrera/carrera';
import { RegistroCarrera } from './components/carrera/registro-carrera/registro-carrera';
import { ActualizacionCarrera } from './components/carrera/actualizacion-carrera/actualizacion-carrera';
import { RegistroBeca } from './components/beca/registro-beca/registro-beca';
import { ActualizacionBeca } from './components/beca/actualizacion-beca/actualizacion-beca';
import { UniversidadCarrera } from './paginas/admin/universidad-carrera/universidad-carrera';
import { CarreraBeca } from './paginas/admin/carrera-beca/carrera-beca';
import { UniversidadBeca } from './paginas/admin/universidad-beca/universidad-beca';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: Registro },
  { path: 'preguntas', component: Preguntas, canActivate: [AuthGuard], data: { roles: ['ROLE_USER','ROLE_ADMIN'] } },
  { path: 'resultado', component: Resultado, canActivate: [AuthGuard], data: { roles: ['ROLE_USER', 'ROLE_ADMIN'] } },
  {path: 'detallecarrera/:id', component: DetalleCarrera, canActivate: [AuthGuard], data: { roles: ['ROLE_USER', 'ROLE_ADMIN'] } },
  { path: 'perfil', component: Perfil, canActivate: [AuthGuard], data: { roles: ['ROLE_USER', 'ROLE_ADMIN'] } },
  { path: 'dashboard', component: Dashboard, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN'] } },
  { path: 'preguntas-admin', component: PreguntasAdmin, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN'] } },
  { path: 'universidad', component: Universidad, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN'] } },
  { path: 'carrera', component: Carrera, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN'] } },
  { path: 'beca', component: Beca, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN'] } },
  { path: 'universidad-carrera', component: UniversidadCarrera, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN'] } },
  { path: 'carrera-beca', component: CarreraBeca, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN'] } },
  { path: 'universidad-beca', component: UniversidadBeca, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN'] } },

  { path: 'creacion-categoria-preguntas', component: RegistroCategoriaPreguntas, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN'] } },
  { path: 'actualizacion-categoria-preguntas/:id', component: ActualizacionCategoriaPreguntas, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN'] } },

  { path: 'creacion-preguntas', component: RegistroPreguntas, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN'] } },
  { path: 'actualizacion-preguntas/:id', component: ActualizacionPreguntas, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN'] } },

  { path: 'creacion-universidad', component: RegistroUniversidad, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN'] } },
  { path: 'actualizacion-universidad/:id', component: ActualizacionUniversidad, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN'] } },

  { path: 'creacion-carrera', component: RegistroCarrera, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN'] } },
  { path: 'actualizacion-carrera/:id', component: ActualizacionCarrera, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN'] } },

  { path: 'creacion-beca', component: RegistroBeca, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN'] } },
  { path: 'actualizacion-beca/:id', component: ActualizacionBeca, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN'] } },
];

export const routing = RouterModule.forRoot(routes, {
  scrollPositionRestoration: 'enabled'
});
