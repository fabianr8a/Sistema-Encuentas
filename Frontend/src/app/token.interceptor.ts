import { Router } from "@angular/router";
import { Injectable } from '@angular/core';
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from "@angular/common/http";
import { FOTO_SISTEMA, TOKEN_SISTEMA } from "./utilidades/dominios/sesiones";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem(TOKEN_SISTEMA);
    const modificarPeticion = request.clone({ headers: request.headers.set('authorization', 'Bearer ' + token) });
    return next.handle(modificarPeticion).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.router.navigate(['/land/public/login']);
          localStorage.removeItem(TOKEN_SISTEMA);
          localStorage.removeItem(FOTO_SISTEMA);
        }
        return throwError(() => error);
      })
    );
  }
}
