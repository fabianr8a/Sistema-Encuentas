import { EncuestaService } from '../../../../../servicios/encuesta.service';
import { Encuestas } from '../../../../../modelos/encuestas';
import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { mostrarMensaje } from 'src/app/utilidades/mensajes/toas.func';
import { observadorAny } from '../../../../../utilidades/observadores/tipo-any';
import { ToastrService } from 'ngx-toastr';
import { Subscription, map, catchError, finalize } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-encuesta-listar',
  templateUrl: './encuesta-listar.component.html',
  styleUrls: ['./encuesta-listar.component.css'],
})
export class EncuestaListarComponent implements OnInit {
 //Atributos requeridos
  public arregloEncuesta: Encuestas[];
  public arregloBuscar: string[];
  public encuestaSeleccionada: Encuestas;
  public cadena: string;

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
    public encuestaService: EncuestaService,
    public modalService: BsModalService,
    private toastr: ToastrService
  ) {
    //Inicializar atributos requeridos
    this.arregloEncuesta = [];
    this.arregloBuscar = [];
    this.arregloEncuesta = [];
    this.encuestaSeleccionada = this.inicializarEncuesta();

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

  //Metodos obligatorios
  public inicializarEncuesta(): Encuestas {
    return new Encuestas(0, '','', '', '', '', '');
  }

  ngOnInit(): void {
    this.listarEncuestas();
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

  public listarEncuestas(): void {
    this.miSuscripcion = this.encuestaService
      .listarEncuestas()
      .pipe(
        map((resultado: Encuestas[]) => {
          this.arregloEncuesta = resultado;
          this.arregloEncuesta.map((encuesta) => {
            this.arregloBuscar.push(encuesta.nombreEncuesta);
          });
        }),
        finalize(() => {
          this.cargaFinalizada = true;
          this.verificarPaginador();
        })
      )
      .subscribe(observadorAny);
  }

  public buscarEncuesta(textico: string): void {
    this.miSuscripcion = this.encuestaService
      .buscarEncuesta(textico)
      .pipe(
        map((respuesta) => {
          this.arregloEncuesta = respuesta;
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
