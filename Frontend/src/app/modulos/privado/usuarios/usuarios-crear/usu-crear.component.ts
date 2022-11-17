import { Router } from '@angular/router';
import { Usuarios } from '../../../../modelos/usuarios';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, finalize, map, Subscription } from 'rxjs';
import { mostrarMensaje } from 'src/app/utilidades/mensajes/toas.func';
import * as miEncriptado from 'js-sha512';
import { observadorAny } from 'src/app/utilidades/observadores/tipo-any';
import { TOKEN_SISTEMA } from 'src/app/utilidades/dominios/sesiones';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Acceso } from 'src/app/modelos/acceso';
import { Rol } from 'src/app/modelos/rol';
import { RolService } from 'src/app/servicios/rol.service';
import { ARREGLO_TIPO_DOC } from 'src/app/utilidades/dominios/tipos-documento';

@Component({
  selector: 'app-usu-crear',
  templateUrl: './usu-crear.component.html',
  styleUrls: ['./usu-crear.component.css'],
})
export class UsuCrearComponent implements OnInit {

  public tmpBase64: any;
  public temporal: any;
  public objUsuario: Usuarios;
  public objAcceso: Acceso;
  public arregloRoles: Rol[];
  public arregloTiposDocumentos:any[];
  public miSuscripcionUsu: Subscription;
  public cargaFinalizada: boolean;

  constructor(
    public toastrService: ToastrService,
    private usuarioService: UsuarioService,
    private router:Router,
    private rolService:RolService,
  ) {
    this.miSuscripcionUsu = this.temporal;
    this.objUsuario = this.inicializarUsuario();
    this.objAcceso = this.inicializarAcceso();
    this.arregloRoles = [];
    this.arregloTiposDocumentos=ARREGLO_TIPO_DOC;
    this.cargaFinalizada = false;
  }

  ngOnInit(): void {
    this.obtenerTodosRoles();
  }

  ngOnDestroy(): void {
    if (this.miSuscripcionUsu) {
      this.miSuscripcionUsu.unsubscribe();
    }
  }

  //Métodos obligatorios
  // ****************/

  public inicializarUsuario(): Usuarios {
    return new Usuarios(0, 0, '', '', '', '', '', '', 0, '', '', 0, 0,0);
  }

  public inicializarAcceso():Acceso{
    return new Acceso(0,'','','',0, 0);
  }

  //Lógica del negocio

  public crearUsuario(formulario: NgForm): void {
    const miHash = miEncriptado.sha512(this.objUsuario.claveUsuario);
    this.objUsuario.claveUsuario = miHash;
    this.objUsuario.reclaveUsuario = miHash;
    const miClon = { ... this.objUsuario };
    this.miSuscripcionUsu = this.usuarioService
      .crearUsuarios(miClon)
      .pipe(
        map((resultado: any) => {
          formulario.resetForm();
          localStorage.setItem(TOKEN_SISTEMA, resultado.tokenFullStack);
          mostrarMensaje(
            'success',
            'Se creó el Usuario',
            'Exito',
            this.toastrService
          );
           this.router.navigate(['/private/usuario/listar-usuario/']);
        }),
        catchError((miError) => {

          if(miError.status === 403){
            mostrarMensaje(
              'error',
              'el documento ya existe',
              'Error',
              this.toastrService
            );
          }else{
            mostrarMensaje(
              'error',
              'No se puede crear el Usuario',
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

  public obtenerTodosRoles(): void {
    this.miSuscripcionUsu = this.rolService
      .cargarRoles()
      .pipe(
        map((resultado: Rol[]) => {
          this.arregloRoles = resultado;
        }),
        finalize(() => {
          this.cargaFinalizada = true;
        })
      )
      .subscribe(observadorAny);
  }
}
