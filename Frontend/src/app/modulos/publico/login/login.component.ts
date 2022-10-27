import { NgForm } from '@angular/forms';
import { catchError, map, Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as cifrado from 'js-sha512';

import { ToastrService } from 'ngx-toastr';
import { Acceso } from 'src/app/modelos/acceso';
import { mostrarMensaje } from 'src/app/utilidades/mensajes/toas.func';
import { AccesoService } from 'src/app/servicios/acceso.service';
import { observadorAny } from 'src/app/utilidades/observadores/tipo-any';
import { RespuestaAcceso } from 'src/app/modelos/respuesta-acceso';
import { TOKEN_SISTEMA } from 'src/app/utilidades/dominios/sesiones';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class InicioComponent implements OnInit, OnDestroy {
  public temporal: any;
  public usuarioSeleccionado: Acceso;
  public patronCorreo = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  public respuestaToken:Acceso;

  //Propiedad de tipo suscripcion
  public miSuscripcion: Subscription;
  constructor(
    public router: Router,
    public toastr: ToastrService,
    public route: ActivatedRoute,
    public accesoService: AccesoService
  ) {
    this.usuarioSeleccionado = this.inicializarAcceso();
    this.miSuscripcion = this.temporal;
    this.respuestaToken = this.accesoService.objAcceso;
  }

  ngOnDestroy(): void {
    if (this.miSuscripcion) {
      this.miSuscripcion.unsubscribe();
    }
  }

  ngOnInit(): void {}

  // Métodos obligatorios
  // **********************************************************

  public inicializarAcceso(): Acceso {
    return new Acceso(0, '', '', '', 0, 0);
  }


  // Lógica del negocio
  // **********************************************************


  public verificarDatos(formulario: NgForm): void {
    const miHashcito = cifrado.sha512(this.usuarioSeleccionado.claveAcceso);
    const correo = this.usuarioSeleccionado.correoAcceso;
    const rol = this.usuarioSeleccionado.nombreRol;
    const estado = this.usuarioSeleccionado.estadoRol;
    const estadoUsu = this.usuarioSeleccionado.estadoUsuario;
    const acceso = new Acceso(0, correo, miHashcito, rol, estado, estadoUsu);
      this.miSuscripcion = this.accesoService
        .iniciarSesion(acceso)
        .pipe(
          map((resultado: RespuestaAcceso) => {
            localStorage.setItem(TOKEN_SISTEMA, resultado.tokenFullStack);
            this.router.navigate(['/private/inicio']);
            mostrarMensaje(
              'success',
              'Bienvenido al sistema',
              'Sesión iniciada',
              this.toastr
            );
            formulario.resetForm();
            return resultado;
          }),
          catchError((miError) => {
            mostrarMensaje(
              'error',
              'Error de autenticación',
              'Error',
              this.toastr
            );
            console.log(miError);
            formulario.resetForm();
            throw miError;
          })
        )
        .subscribe(observadorAny);
  }

  public opcionCancelar(): void {
    this.router.navigate(['/inicio'], { relativeTo: this.route.parent });
  }
}
