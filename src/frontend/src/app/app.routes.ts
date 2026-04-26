import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    // Por ahora no hay ruta /test
    { path: '**', redirectTo: '' }  // Cualquier otra ruta va a home
];