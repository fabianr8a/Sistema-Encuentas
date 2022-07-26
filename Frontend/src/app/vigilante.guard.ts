import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AccesoService } from './servicios/acceso.service';

@Injectable({
  providedIn: 'root',
})
export class VigilanteGuard implements CanActivate {
  constructor(private accesoService: AccesoService, private router: Router) {}
  canActivate(): boolean {
    if (this.accesoService.verificarUsuario()) {
      return true;
    }
    this.router.navigate(['/public/login']);
    return false;
  }
}
