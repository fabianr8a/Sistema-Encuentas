import { AccesoService } from '../../servicios/acceso.service';
import { Injectable } from '@angular/core';
import { UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class UsuariosGuard {
  constructor(
    private accesoService: AccesoService,
    private location: Location
  ) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (
      this.accesoService.verificarRutasDocente() ||
      this.accesoService.verificarRutasAdmin()||
      this.accesoService.verificarRutasSecretaria() ||
      this.accesoService.verificarRutasInvitado()
    ) {
      return true;
    } else {
      this.location.back();
      return false;
    }
  }
}
