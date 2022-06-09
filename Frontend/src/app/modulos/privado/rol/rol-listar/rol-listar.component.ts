import { mostrarMensaje } from 'src/app/utilidades/mensajes/toas.func';
import { observadorAny } from './../../../../utilidades/observadores/tipo-any';
import { ARREGLO_ESTADOS_ROL } from 'src/app/utilidades/dominios/estado';
import { ToastrService } from 'ngx-toastr';
import { Subscription, map, catchError, finalize } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { RolService } from './../../../../servicios/rol.service';
import { Rol } from './../../../../modelos/rol';
import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-rol-listar',
  templateUrl: './rol-listar.component.html',
  styleUrls: ['./rol-listar.component.css'],
})
export class RolListarComponent implements OnInit, OnDestroy {
  //Atributos requeridos
  public selected?: string;
  public arregloRoles: Rol[];
  public arregloBuscar: string[];
  public arregloEstados: any[];
  public rolSeleccionado: Rol;

  //Atributos paginación
  public paginaActual: number;
  public cantidadMostrar: number;
  public cantidadPaginas: number;
  public cantidadTotalRegistros: number;

  //Atributos modales
  public modalTitulo: string;
  public modalContenido: string;
  public modalCuerpo: string;
  public modalRef: BsModalRef;

  //Atributos consumo servicios
  public tmp: any;
  public miSuscripcion: Subscription;
  public miSuscripcionEliminar: Subscription;
  public cargaFinalizada: boolean;
  public cadena: string;

  constructor(
    private rolService: RolService,
    public modalService: BsModalService,
    private toastr: ToastrService
  ) {
    //Inicializar atributos requeridos
    this.arregloRoles = [];
    this.arregloBuscar = [];
    this.arregloEstados = ARREGLO_ESTADOS_ROL;
    this.rolSeleccionado = this.inicializarRol();

    //Inicializar atributos paginación
    this.paginaActual = 0;
    this.cantidadMostrar = 0;
    this.cantidadPaginas = 0;
    this.cantidadTotalRegistros = 0;
    this.cadena = '';
    //Inicializar modales
    this.modalTitulo = '';
    this.modalContenido = '';
    this.modalCuerpo = '';
    this.modalRef = this.tmp;

    //Inicializar consumo de servicios
    this.miSuscripcion = this.tmp;
    this.miSuscripcionEliminar = this.tmp;
    this.cargaFinalizada = false;
  }

  //Métodos obligatorios
  public inicializarRol(): Rol {
    return new Rol(0, '', 0, 0);
  }

  ngOnInit(): void {
    this.obtenerTodosRoles();
  }

  ngOnDestroy(): void {
    if (this.miSuscripcion) {
      this.miSuscripcion.unsubscribe();
    }
    if (this.miSuscripcionEliminar) {
      this.miSuscripcionEliminar.unsubscribe();
    }
  }

  //Lógica del negocio - Servicios
  //********************************** *//

  public obtenerTodosRoles(): void {
    this.miSuscripcion = this.rolService
      .cargarRoles()
      .pipe(
        map((resultado: Rol[]) => {
          this.arregloRoles = resultado;
          this.arregloRoles.map((rol) => {
            this.arregloBuscar.push(rol.nombreRol);
          });
        }),
        finalize(() => {
          this.cargaFinalizada = true;
          this.verificarPaginador();
        })
      )
      .subscribe(observadorAny);
  }

  public obtenerRolesBuscar(textico: string): void {
    this.miSuscripcion = this.rolService
      .buscarRoles(textico)
      .pipe(
        map((respuesta) => {
          this.arregloRoles = respuesta;
          console.log('el servicio sirve')
        }),
        catchError((err) => {
          throw err;
        }),
        finalize(() => {
          this.cargaFinalizada = true;
          this.verificarPaginador();
        })
      )
      .subscribe(observadorAny);
  }

  public eliminarRol(codigo: number): void {
    this.miSuscripcionEliminar = this.rolService
      .eliminarRol(codigo)
      .pipe(
        map((respuesta) => {
          this.obtenerTodosRoles();
          mostrarMensaje('success', 'Rol eliminado', 'Exito', this.toastr);
          return respuesta;
        }),
        catchError((miError) => {
          mostrarMensaje(
            'error',
            'Rol no eliminado',
            'Advertencia',
            this.toastr
          );
          throw miError;
        })
      )
      .subscribe(observadorAny);
  }

  //Métodos para las modales
  //********************************** *//

  public cancelarEliminar(): void {
    this.modalRef.hide();
  }

  public botonEliminar(): void {
    this.eliminarRol(this.rolSeleccionado.codRol);
    this.rolSeleccionado = this.inicializarRol();
    this.modalRef.hide();
  }

  public abrirModalElimnar(template: TemplateRef<any>, objBorrar: Rol): void {
    this.rolSeleccionado = objBorrar;
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
    this.modalTitulo = 'Advertencia';
    this.modalCuerpo = '¿Seguro que desea eliminar el rol?';
    this.modalContenido = this.rolSeleccionado.nombreRol;
  }

  // Paginador
  public verificarPaginador(): void {
    this.paginaActual = 1;
    this.cantidadMostrar = 5;
    this.cantidadTotalRegistros = this.arregloRoles.length;
    this.cantidadPaginas = Math.ceil(
      this.cantidadTotalRegistros / this.cantidadMostrar
    );
  }
}
