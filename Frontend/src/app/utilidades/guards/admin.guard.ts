import { AccesoService } from '../../servicios/acceso.service';
import { Injectable } from '@angular/core';
import { UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard {
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
      this.accesoService.verificarRutasAdmin()
    ) {
      return true;
    } else {
      this.location.back();
      return false;
    }
  }
}
