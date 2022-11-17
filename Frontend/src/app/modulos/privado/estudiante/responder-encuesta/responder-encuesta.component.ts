import { TiposDependencia } from './../../../../modelos/tipo_dependencias';
import { Router, ActivatedRoute } from '@angular/router';
import { OpcionesService } from './../../../../servicios/opciones.service';
import { PreguntaService } from 'src/app/servicios/pregunta.service';
import { EncuestaService } from './../../../../servicios/encuesta.service';
import { ParamMap } from '@angular/router';
import { TipoEventos } from './../../../../modelos/tipo_eventos';
import { TipoPreguntas } from './../../../../modelos/tipo_preguntas';
import { Dependencias } from './../../../../modelos/dependencias';
import { Encuesta } from './../../../../modelos/encuesta';
import { Preguntas } from './../../../../modelos/preguntas';
import { Opciones } from './../../../../modelos/opciones';
import { observadorAny } from './../../../../utilidades/observadores/tipo-any';
import { mostrarMensaje } from 'src/app/utilidades/mensajes/toas.func';
import { catchError, map, finalize, Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-responder-encuesta',
  templateUrl: './responder-encuesta.component.html',
  styleUrls: ['./responder-encuesta.component.css']
})
export class ResponderEncuestaComponent implements OnInit {

  arregloPreguntas: Preguntas[] = [];
  arregloOpciones: Opciones[] = [];


  public arregloEvento: TipoEventos[];
  public arregloTipoPreguntas: TipoPreguntas[];
  public arregloDependencias: Dependencias[];
  public arregloTiposDependencia: TiposDependencia[];


  //Atributos consumo servicios
  public temporal: any;
  public objEncuesta: Encuesta;
  public miSuscripcion: Subscription;
  public cargaFinalizada: boolean;
  public miSuscripcionEliminar: Subscription;
  public codigoEncuesta: number;

  constructor(
    public tipoEventosService: EncuestaService,
    public tipoPreguntasService: EncuestaService,
    public dependenciasService: EncuestaService,
    public tipoDependenciasService: EncuestaService,
    public encuestaService: EncuestaService,
    public preguntaService: PreguntaService,
    public opcionService: OpcionesService,
    private toastrService: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    //Inicializar atributos requeridos
    this.arregloEvento = [];
    this.arregloTipoPreguntas = [];
    this.arregloDependencias = [];
    this.arregloTiposDependencia = [];
    this.objEncuesta = this.inicializarEncuesta();
    this.codigoEncuesta = 0;



    //Inicializar consumo de servicios
    this.miSuscripcion = this.temporal;
    this.cargaFinalizada = false;
    this.miSuscripcionEliminar = this.temporal;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((parametro: ParamMap) => {
      const valor = String(parametro.get('codEncuesta'));
      this.codigoEncuesta = parseInt(valor) as number;
    });
    this.listarEncuesta();
    this.listarEventos();
    this.listarTipoPreguntas();
    this.obtenerTiposDependencia();

  }

  public listarEventos(): void {
    this.miSuscripcion = this.tipoEventosService
      .listarEventos()
      .pipe(
        map((resultado: TipoEventos[]) => {
          this.arregloEvento = resultado;
        }),
        finalize(() => {
          this.cargaFinalizada = true;
        })
      )
      .subscribe(observadorAny);
  }

  public listarTipoPreguntas(): void {
    this.miSuscripcion = this.tipoPreguntasService
      .listarTipoPreguntas()
      .pipe(
        map((resultado: TipoPreguntas[]) => {
          this.arregloTipoPreguntas = resultado;
        }),
        finalize(() => {
          this.cargaFinalizada = true;
        })
      )
      .subscribe(observadorAny);
  }



  public obtenerTiposDependencia(): void {
    this.miSuscripcion = this.tipoDependenciasService
      .listarTipoDependencias()
      .pipe(
        map((respuesta) => {
          this.arregloTiposDependencia = respuesta;
        }),
        catchError((err) => {
          throw err;
        }),
        finalize(() => {
          this.cargaFinalizada = true;
        })
      )
      .subscribe(observadorAny);
  }

  //MODIFICAR y LISTAR ENCUESTA//

  public inicializarEncuesta(): Encuesta {
    return new Encuesta(0, 0, 0, 0, '', '', '', '', 0, '', '');
  }

  public listarEncuesta(): void {
    this.miSuscripcion = this.encuestaService
      .seleccionarEncuestaModificar(this.codigoEncuesta)
      .pipe(
        map((respuesta: Encuesta) => {
          this.objEncuesta = respuesta;
          return respuesta;
        }),
        catchError((err) => {
          throw err;
        }),
        finalize(()=>{
          this.listarPreguntas(this.objEncuesta.codEncuesta);
        })
      )
      .subscribe(observadorAny);
  }


   //MODIFICAR LISTAR Y ELIMINAR PREGUNTAS//



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
      )
      .subscribe(observadorAny);
  }



















  ngOnDestroy(): void {
    if (this.miSuscripcion) {
      this.miSuscripcion.unsubscribe();
    }
  }


}
