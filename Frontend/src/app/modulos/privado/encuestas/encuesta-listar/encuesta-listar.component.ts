import { EncuestaService } from 'src/app/servicios/encuesta.service';
import { Encuesta } from 'src/app/modelos/encuesta';
import { Component, OnInit } from '@angular/core';
import { observadorAny } from 'src/app/utilidades/observadores/tipo-any';
import { ToastrService } from 'ngx-toastr';
import { Subscription, map, finalize } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-encuesta-listar',
  templateUrl: './encuesta-listar.component.html',
  styleUrls: ['./encuesta-listar.component.css'],
})
export class EncuestaListarComponent implements OnInit {
  //Atributos requeridos
  public arregloEncuesta: Encuesta[];
  public encuestaSeleccionada: Encuesta;
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
    public encuestaService: EncuestaService,
    public modalService: BsModalService,
    private toastr: ToastrService
  ) {
    //Inicializar atributos requeridos
    this.arregloEncuesta = [];
    this.encuestaSeleccionada = this.inicializarEncuesta();

    //Inicializar atributos paginación
    this.paginaActual = 0;
    this.cantidadMostrar = 0;
    this.cantidadPaginas = 0;
    this.cantidadTotalRegistros = 0;

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
  public inicializarEncuesta(): Encuesta {
    return new Encuesta(0, 0, 0, '', '', '', '', 0, '');
  }

  ngOnInit(): void {
    this.listarEncuestas();
  }

  ngOnDestroy(): void {
    if (this.miSuscripcion) {
      this.miSuscripcion.unsubscribe();
    }
  }

  //Lógica del negocio - Servicios




  public listarEncuestas(): void {
    this.miSuscripcion = this.encuestaService
      .listarEncuestas()
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
