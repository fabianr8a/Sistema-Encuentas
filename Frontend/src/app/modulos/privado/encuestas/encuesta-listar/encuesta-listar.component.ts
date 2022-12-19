import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import { Preguntas } from './../../../../modelos/preguntas';
import { Opciones } from './../../../../modelos/opciones';
import { ToastrService } from 'ngx-toastr';
import { mostrarMensaje } from 'src/app/utilidades/mensajes/toas.func';
import { AccesoService } from './../../../../servicios/acceso.service';
import { EncuestaService } from 'src/app/servicios/encuesta.service';
import { Encuesta } from 'src/app/modelos/encuesta';
import { Component, OnInit } from '@angular/core';
import { observadorAny } from 'src/app/utilidades/observadores/tipo-any';
import { Subscription, map, finalize, catchError } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { OpcionesService } from 'src/app/servicios/opciones.service';
import { PreguntaService } from 'src/app/servicios/pregunta.service';

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
  public codigoEncuesta: number;
  public objPregunta:Preguntas;
  public arregloPreguntas: Preguntas[] = [];

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
    public opcionService: OpcionesService,
    public preguntaService: PreguntaService,
    private acceso: AccesoService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    //Inicializar atributos requeridos
    this.arregloEncuesta = [];
    this.encuestaSeleccionada = this.inicializarEncuesta();
    this.objPregunta=this.inicializarPregunta();
    this.codigoEncuesta = 0;

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
    return new Encuesta(0, 0, 0, 0, '', '', '', '', this.acceso.objAcceso.codUsuario, '', '',0);
  }

  public inicializarPregunta():Preguntas{
    return new Preguntas (0,0,'',0,[])
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((parametro: ParamMap) => {
      const valor = String(parametro.get('codEncuesta'));
      this.codigoEncuesta = parseInt(valor) as number;
    });
    this.listarEncuestas(this.acceso.objAcceso.codUsuario);
  }

  ngOnDestroy(): void {
    if (this.miSuscripcion) {
      this.miSuscripcion.unsubscribe();
    }
  }

  //Lógica del negocio - Servicios

  public listarEncuestas(codUsuario: number): void {
    this.miSuscripcion = this.encuestaService
      .listarEncuestas(codUsuario)
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

  public listarPreguntas(codigoEncuesta:number): void {
    this.miSuscripcion = this.preguntaService
      .seleccionarPregunta(codigoEncuesta)
      .pipe(
        map((respuesta: Preguntas[]) => {
          this.arregloPreguntas = respuesta;
          return respuesta;
        }),
        catchError((err) => {
          throw err;
        }),
        finalize(()=>{
          this.cargaFinalizada = true;
        })
      )
      .subscribe(observadorAny);
  }

  public reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
  }

  public eliminarEncuesta(codEncuesta: number): void {
    this.miSuscripcionEliminar = this.encuestaService
      .eliminarEncuesta(codEncuesta)
      .pipe(
        map(() => {
          mostrarMensaje(
            'success',
            'Encuesta eliminada',
            'Exito',
            this.toastr,
          );
        }),
        catchError((miError) => {
          mostrarMensaje(
            'error',
            'No se pudo eliminar la encuesta',
            'Advertencia',
            this.toastr
          );
          throw miError;
        }),
        finalize(()=>{
          this.reloadComponent();
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
