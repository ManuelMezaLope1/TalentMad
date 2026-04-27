import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthServicio } from '../servicios/auth/auth-servicio';

@Injectable({
  providedIn:'root'
})
export class AuthGuard implements CanActivate{
  constructor(private router: Router, private authServicio: AuthServicio){}

  canActivate(route: ActivatedRouteSnapshot): any{
    const token=localStorage.getItem('token');

    if(!token || !this.authServicio.logueado()){
      this.router.navigate(['/iniciar-sesion']);
      return false;
    }

    const rolesPermitidos=route.data['roles'];

    if(!rolesPermitidos) return true;

    const autorizado=rolesPermitidos.some((rol:string)=>
      this.authServicio.hasRole(rol)
    );

    if(!autorizado){
      return this.router.navigate(['/inicio']);
    }

    return true;
  }
}
