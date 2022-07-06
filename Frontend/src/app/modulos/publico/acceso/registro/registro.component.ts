import { Imagen } from './../../../../modelos/imagen';
import { ToastrService } from 'ngx-toastr';
import { RegistroService } from './../../../../servicios/registro.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Registro } from 'src/app/modelos/registro';
import { catchError, map, Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import {
  TOKEN_SISTEMA,
} from 'src/app/utilidades/dominios/sesiones';
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
  public tmpBase64: any;
  public Click: boolean;
  public imagenRegistro: Imagen;
  public objRegistro: Registro;
  public miSuscripcionRegistro: Subscription;

  constructor(
    // private router: Router,
    private registroService: RegistroService,
    public toastrService: ToastrService
  ) {
    this.miSuscripcionRegistro = this.temporal;
    this.objRegistro = this.inicializarRegistro();
    this.Click = false;
    this.imagenRegistro = this.inicializarImagen();
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
    return new Registro('', '', '', '', '');
  }
  public inicializarImagen(): Imagen {
    return new Imagen(0, '', '', '', '', '');
  }

  public seleccionarFoto(input: any): any {
    if (!input.target.files[0] || input.target.files[0].length === 0) {
      return;
    }
    const mimeType = input.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      const parametros = {
        closeButton: true,
        enableHtml: true,
        progressBar: true,
        positionClass: 'toast-top-right',
        timeOut: 8000,
      };
      this.toastrService.error(
        'Solo se permiten <strong>imágenes</strong>',
        'Advertencia',
        parametros
      );
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(input.target.files[0]);
    reader.onload = () => {
      this.tmpBase64 = reader.result;
      this.imagenRegistro.base64Imagen = this.tmpBase64;
      this.imagenRegistro.nombrepublicoImagen = input.target.files[0].name;
      this.imagenRegistro.tipoImagen = input.target.files[0].type;
      this.imagenRegistro.tamanoImagen = input.target.files[0].size;
    };
  }

  //Lógica del negocio
  // ********************************************/

  public crearUsuario(formulario: NgForm): void {
    console.log(this.objRegistro);
    const miHash = miEncriptado.sha512(this.objRegistro.claveRegistro);
    this.objRegistro.claveRegistro = miHash;
    this.objRegistro.confirmarClaveRegistro = miHash;

    this.miSuscripcionRegistro = this.registroService
      .enviarRegistro(this.objRegistro, this.imagenRegistro)
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
          formulario.resetForm();
          mostrarMensaje(
            'error',
            'No se puede crear el registro',
            'Error',
            this.toastrService
          );
          console.log(miError);
          throw miError;
        })
      )
      .subscribe(observadorAny);
  }
}
