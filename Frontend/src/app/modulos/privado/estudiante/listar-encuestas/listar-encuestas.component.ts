import { observadorAny } from 'src/app/utilidades/observadores/tipo-any';
import { ToastrService } from 'ngx-toastr';
import { EncuestaService } from 'src/app/servicios/encuesta.service';
import { Subscription, map, finalize, catchError } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Encuesta } from 'src/app/modelos/encuesta';
import { Component, OnInit } from '@angular/core';
import { TipoEventos } from 'src/app/modelos/tipo_eventos';
import { UsuarioEncuestaService } from 'src/app/servicios/usuario-respuestas.service';
import { TiposDependencia } from 'src/app/modelos/tipo_dependencias';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AccesoService } from 'src/app/servicios/acceso.service';

@Component({
  selector: 'app-listar-encuestas',
  templateUrl: './listar-encuestas.component.html',
  styleUrls: ['./listar-encuestas.component.css'],
})
export class ListarEncuestasComponent implements OnInit {
  public arregloEncuesta: Encuesta[];
  public objEncuesta: Encuesta;
  public busqueda: string = '';

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


  constructor(
    public encuestaService: UsuarioEncuestaService,
    public modalService: BsModalService,
    private acceso: AccesoService,
  ) {
    //Inicializar atributos requeridos
    this.arregloEncuesta = [];
    this.objEncuesta = this.inicializarEncuesta();

    //Inicializar modales
    this.modalTitulo = '';
    this.modalContenido = '';
    this.modalCuerpo = '';
    this.modalRef = this.tmp;

    //Inicializar atributos paginación
    this.paginaActual = 0;
    this.cantidadMostrar = 0;
    this.cantidadPaginas = 0;
    this.cantidadTotalRegistros = 0;

    //Inicializar consumo de servicios
    this.miSuscripcion = this.tmp;
    this.miSuscripcionEliminar = this.tmp;
    this.cargaFinalizada = false;
  }

  //Metodos obligatorios
  public inicializarEncuesta(): Encuesta {
    return new Encuesta(0, 0, 0, 0,'', '', '', '',this.acceso.objAcceso.codUsuario,  '','');
  }

  public inicializarTipoDependencia(): TiposDependencia {
    return new TiposDependencia(0,0,'');
  }

  ngOnInit(): void {
    this.listarEncuestasUsuarios(this.acceso.objAcceso.codUsuario);
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

  public listarEncuestasUsuarios(codUsuario:number): void {
    this.miSuscripcion = this.encuestaService
      .listarEncuestasUsuarios(codUsuario)
      .pipe(
        map((resultado: Encuesta[]) => {
          this.arregloEncuesta = resultado;
        }),
        finalize(() => {
          this.cargaFinalizada = true;
          this.verificarPaginador();
        })
      )
      .subscribe(observadorAny);
  }

  // Paginador
  public verificarPaginador(): void {
    this.paginaActual = 1;
    this.cantidadMostrar = 5;
    this.cantidadTotalRegistros = this.arregloEncuesta.length;
    this.cantidadPaginas = Math.ceil(
      this.cantidadTotalRegistros / this.cantidadMostrar
    );
  }
}
