import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Usuarios } from 'src/app/modelos/usuarios';
import { observadorAny } from 'src/app/utilidades/observadores/tipo-any';
import { catchError, finalize, map, Subscription } from 'rxjs';
import { ARREGLO_ESTADOS_ROL } from 'src/app/utilidades/dominios/estado';


@Component({
  selector: 'app-usu-listar',
  templateUrl: './usu-listar.component.html',
  styleUrls: ['./usu-listar.component.css'],
})
export class UsuListarComponent implements OnInit {
  //Atributos requeridos
  public arregloUsuarios: Usuarios[];
  public arregloEstados: any[];
  public arregloBuscar: string[];
  public cadena: string = '';
  public usuario_selec: Usuarios;
  public modalRef: BsModalRef;
  public modalTitle: String;
  public modalTexto: String;
  public modalContenido: String;
  public temporal: any;

   //Atributos paginacion
  public paginaActual: number;
  public cantidadMostrar: number;
  public cantidadPaginas: number;
  public cantidadTotalRegistros: number;

  //Atributos consumo servicios
  public tmp: any;
  public miSuscripcion: Subscription;
  public cargaFinalizada: boolean;

  constructor(
    private usuarioService: UsuarioService,
    public modalService: BsModalService,
    private toastr: ToastrService,
  ) {

    //Inicializar atributos requeridos
    this.arregloUsuarios = [];
    this.arregloBuscar = [];
    this.arregloEstados=ARREGLO_ESTADOS_ROL;
    this.usuario_selec = this.inicializarUsuario();

    //Inicializar modales
    this.modalTitle = '';
    this.modalContenido = '';
    this.modalTexto = '';
    this.modalRef = this.tmp;

    //Inicializar consumo de servicios
    this.miSuscripcion = this.tmp;
    this.cargaFinalizada = false;

    //Inicializar atributos paginación
    this.paginaActual = 0;
    this.cantidadMostrar = 0;
    this.cantidadPaginas = 0;
    this.cantidadTotalRegistros = 0;
    this.cadena = '';
  }

  //Metodo paginacion
  public verificarPaginador(): void {
    this.paginaActual = 1;
    this.cantidadMostrar = 5;
    this.cantidadTotalRegistros = this.arregloUsuarios.length;
    this.cantidadPaginas = Math.ceil(
      this.cantidadTotalRegistros / this.cantidadMostrar
    );
  }

  //Métodos obligatorios
  public inicializarUsuario(): Usuarios {
    return new Usuarios(0, 0, '', '', '', '', '', '', 0, '', '', 0, 0);
  }

  ngOnInit(): void {
    this.obtenerTodosUsuarios();
  }

  ngOnDestroy(): void {
    if (this.miSuscripcion) {
      this.miSuscripcion.unsubscribe();
    }
  }

  //Lógica del negocio - Servicios
  //************ *//
  public obtenerTodosUsuarios(): void {
    this.miSuscripcion = this.usuarioService
      .cargarUsuarios()
      .pipe(
        map((resultado: Usuarios[]) => {
          this.arregloUsuarios = resultado;
          this.arregloUsuarios.map((usu) => {
            this.arregloBuscar.push(usu.nombresUsuario);
          });
        }),
        finalize(() => {
          this.cargaFinalizada = true;
          this.verificarPaginador();
        })
      )
      .subscribe(observadorAny);
  }
}
