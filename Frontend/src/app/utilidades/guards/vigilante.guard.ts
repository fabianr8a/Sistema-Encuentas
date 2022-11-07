import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AccesoService } from '../../servicios/acceso.service';

@Injectable({
  providedIn: 'root',
})
export class VigilanteGuard implements CanActivate {
  constructor(private accesoService: AccesoService, private router: Router) {}
  canActivate(): boolean {
    if (this.accesoService.verificarAcceso()) {
      return true;
    } else {
      this.router.navigate(['/land/public/login']);
      return false;
    }
  }
}
