import { ToastrService } from 'ngx-toastr';
import { RegistroService } from './../../../../servicios/registro.service';
import { Component, OnInit } from '@angular/core';
import { Registro } from 'src/app/modelos/registro';
import { catchError, map, Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { TOKEN_SISTEMA } from 'src/app/utilidades/dominios/sesiones';
import { mostrarMensaje } from 'src/app/utilidades/mensajes/toas.func';
import { observadorAny } from 'src/app/utilidades/observadores/tipo-any';
import * as miEncriptado from 'js-sha512';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  //Propiedades de la clase
  // ********************************************/
  public temporal: any;
  public Click: boolean;
  public objRegistro: Registro;
  public miSuscripcionRegistro: Subscription;
  public patronCorreo = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';

  constructor(
    private registroService: RegistroService,
    public toastrService: ToastrService
  ) {
    this.miSuscripcionRegistro = this.temporal;
    this.objRegistro = this.inicializarRegistro();
    this.Click = false;
  }

  ngOnDestroy(): void {
    if (this.miSuscripcionRegistro) {
      this.miSuscripcionRegistro.unsubscribe();
    }
  }
  ngOnInit(): void {}

  //Métodos obligatorios
  // ********************************************/
  public inicializarRegistro(): Registro {
    return new Registro('', '', '', '','', '');
  }

  //Lógica del negocio
  // ********************************************/

  public crearUsuario(formulario: NgForm): void {
    const miHash = miEncriptado.sha512(this.objRegistro.claveRegistro);
    this.objRegistro.claveRegistro = miHash;
    this.objRegistro.confirmarClaveRegistro = miHash;
    this.miSuscripcionRegistro = this.registroService
      .enviarRegistro(this.objRegistro)
      .pipe(
        map((resultado: any) => {
          formulario.resetForm();
          localStorage.setItem(TOKEN_SISTEMA, resultado.tokenFullStack);
          mostrarMensaje(
            'success',
            'Se creó el registro',
            'Exito',
            this.toastrService
          );
        }),
        catchError((miError) => {

          if (miError.status===403) {
            mostrarMensaje(
              'error',
              'El documento ya existe',
              'Error',
              this.toastrService
            );
          } else {
            mostrarMensaje(
              'error',
              'No se puede crear el registro',
              'Error',
              this.toastrService
            );
          }
          formulario.resetForm();
          throw miError;
        })
      )
      .subscribe(observadorAny);
  }
}
