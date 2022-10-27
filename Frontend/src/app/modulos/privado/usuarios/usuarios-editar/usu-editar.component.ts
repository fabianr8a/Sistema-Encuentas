import { ARREGLO_ESTADOS } from 'src/app/utilidades/dominios/estados';
import { RolService } from 'src/app/servicios/rol.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, finalize, map, Subscription} from 'rxjs';
import { Acceso } from 'src/app/modelos/acceso';
import { Imagen } from 'src/app/modelos/imagen';
import { Rol } from 'src/app/modelos/rol';
import { Usuarios } from 'src/app/modelos/usuarios';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { mostrarMensaje } from 'src/app/utilidades/mensajes/toas.func';
import { observadorAny } from 'src/app/utilidades/observadores/tipo-any';
import * as miEncriptado from 'js-sha512';
import { ARREGLO_TIPO_DOC } from 'src/app/utilidades/dominios/tipos-documento';

@Component({
  selector: 'app-usu-editar',
  templateUrl: './usu-editar.component.html',
  styleUrls: ['./usu-editar.component.css']
})
export class UsuEditarComponent implements OnInit {

  public tmpBase64: any;
  public temporal: any;
  public objUsuario: Usuarios;
  public objAcceso: Acceso;
  public objImagen: Imagen;
  public miSuscripcionUsu: Subscription;
  public clickCrear: boolean;
  public miSuscripcion: Subscription;
  public arregloRoles: Rol[];
  public arregloEstados: any[];
  public arregloTiposDocumentos:any[];
  public cargaFinalizada: boolean;
  public codUsuario: number;

  constructor(
    public toastrService: ToastrService,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private router: Router,
    private rolService:RolService,
  ) {
    this.miSuscripcionUsu = this.temporal;
    this.objUsuario = this.inicializarUsuario();
    this.objAcceso = this.inicializarAcceso();
    this.objImagen = this.inicializarImagen();
    this.clickCrear = false;
    this.miSuscripcion = this.temporal;
    this.arregloRoles = [];
    this.arregloEstados = ARREGLO_ESTADOS;
    this.arregloTiposDocumentos=ARREGLO_TIPO_DOC;
    this.cargaFinalizada = false;
    this.codUsuario = 0;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((parametro :ParamMap)=>{
      const valor = String(parametro.get('codUsuario'));
      this.codUsuario = parseInt(valor) as number;
      this.iniUsu();
      this.iniAcceso();
      this.iniIma();
      this.obtenerTodosRoles();
    })

  }

  ngOnDestroy(): void {
    if (this.miSuscripcionUsu) {
      this.miSuscripcionUsu.unsubscribe();
    }
  }

  public inicializarUsuario(): Usuarios {
    return new Usuarios(0, 0, '', '', '', '', '', '', 0, '', '', 0, 0);
  }

  public inicializarAcceso(): Acceso {
    return new Acceso(0, '', '', '', 0, 0);
  }

  public inicializarImagen(): Imagen {
    return new Imagen(0, '', '', '', '');
  }

  public iniUsu(): void {
    this.miSuscripcionUsu = this.usuarioService.buscarUnUsuario(this.codUsuario)
      .pipe(
        map((respuesta:Usuarios)=>{
          this.objUsuario = respuesta;
          return respuesta;
        }),
        catchError((err)=>{
          throw err;
        })
        )
      .subscribe(observadorAny);
  }

  public iniAcceso(): void {
    this.miSuscripcionUsu = this.usuarioService.buscarUnAcceso(this.codUsuario)
      .pipe(
        map((respuesta:Acceso)=>{
          this.objAcceso = respuesta;
          return respuesta;
        }),
        catchError((err)=>{
          throw err;
        })
        )
      .subscribe(observadorAny);
  }

  public iniIma(): void {
    this.miSuscripcionUsu = this.usuarioService.buscarUnaImagen(this.codUsuario)
      .pipe(
        map((respuesta:Imagen)=>{
          this.objImagen = respuesta;
          return respuesta;
        }),
        catchError((err)=>{
          throw err;
        })
        )
      .subscribe(observadorAny);
  }

  public obtenerTodosRoles(): void {
    this.miSuscripcion = this.rolService
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
    try {
      const reader = new FileReader();
      reader.readAsDataURL(input.target.files[0]);
      reader.onload = () => {
        this.tmpBase64 = reader.result;
        this.objImagen.nombrepublicoImagen = input.target.files[0].name;
        this.objImagen.tipoImagen = input.target.files[0].type;
        this.objImagen.base64 = this.tmpBase64;
      };
      reader.onerror = error => {
        this.tmpBase64 = null;
      };
    } catch {
      return null;
    }
  }

  public modificarUsuario(): void {
    this.clickCrear = true;
    this.miSuscripcionUsu = this.usuarioService
      .modificarUsuario(this.objUsuario)
      .pipe(
        map(() => {
          mostrarMensaje(
            'success',
            'Usuario actualizado correctamente',
            'exito',
            this.toastrService
          );
          this.router.navigate(['/private/usuario/listar-usuario']);
          this.clickCrear = false;
        }),
        catchError((miError) => {
          mostrarMensaje(
            'error',
            'No se puede actualizar el Usuario',
            'advertencia',
            this.toastrService
          );
          throw miError;
        })
      )
      .subscribe(observadorAny);
  }

  public modificarAcceso(): void {
    this.clickCrear = true;
    const miHash = miEncriptado.sha512(this.objAcceso.claveAcceso);
    this.objAcceso.claveAcceso = miHash;
    this.objAcceso.reclaveAcceso = miHash;
    const miClon = { ... this.objAcceso };
    this.miSuscripcionUsu = this.usuarioService
      .modificarAcceso(this.objUsuario ,this.objAcceso)
      .pipe(
        map(() => {
          mostrarMensaje(
            'success',
            'Acceso se actualizó correctamente',
            'exito',
            this.toastrService
          );
          this.router.navigate(['/private/usuario/listar-usuario']);
          this.clickCrear = false;
        }),
        catchError((miError) => {
          mostrarMensaje(
            'error',
            'No se puede actualizar el Acceso',
            'advertencia',
            this.toastrService
          );
          throw miError;
        })
      )
      .subscribe(observadorAny);
  }

  public modificarImagen(): void {
    this.clickCrear = true;
    this.miSuscripcionUsu = this.usuarioService
      .modificarImagen(this.objUsuario ,this.objImagen)
      .pipe(
        map(() => {
          mostrarMensaje(
            'success',
            'La Imagen se actualizó correctamente',
            'exito',
            this.toastrService
          );
          this.router.navigate(['/private/usuario/listar-usuario']);
          this.clickCrear = false;
        }),
        catchError((miError) => {
          mostrarMensaje(
            'error',
            'No se puede actualizar la Imagen',
            'advertencia',
            this.toastrService
          );
          throw miError;
        })
      )
      .subscribe(observadorAny);
  }

}
