import { NgForm } from '@angular/forms';
import { mostrarMensaje } from 'src/app/utilidades/mensajes/toas.func';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Encuesta } from 'src/app/modelos/encuesta';
import { TiposDependencia } from './../../../../modelos/tipo_dependencias';
import { Dependencias } from './../../../../modelos/dependencias';
import { TipoPreguntas } from './../../../../modelos/tipo_preguntas';
import { TipoEventos } from './../../../../modelos/tipo_eventos';
import { Component, OnInit } from '@angular/core';
import { Preguntas } from 'src/app/modelos/preguntas';
import { Subscription, map, finalize, catchError, switchMap } from 'rxjs';
import { EncuestaService } from 'src/app/servicios/encuesta.service';
import { ToastrService } from 'ngx-toastr';
import { observadorAny } from 'src/app/utilidades/observadores/tipo-any';
import { Opciones } from 'src/app/modelos/opciones';
import { PreguntaService } from 'src/app/servicios/pregunta.service';
import { OpcionesService } from 'src/app/servicios/opciones.service';

@Component({
  selector: 'app-encuesta-editar',
  templateUrl: './encuesta-editar.component.html',
  styleUrls: ['./encuesta-editar.component.css'],
})
export class EncuestaEditarComponent implements OnInit {
  arregloPreguntas: Preguntas[] = [];
  arregloPreguntasNuevas:Preguntas[]=[];

  public arregloEvento: TipoEventos[];
  public arregloTipoPreguntas: TipoPreguntas[];
  public arregloDependencias: Dependencias[];
  public arregloTiposDependencia: TiposDependencia[];

  //Atributos consumo servicios
  public temporal: any;
  public objEncuesta: Encuesta;
  public objPreguntaNueva: Preguntas;
  public miSuscripcion: Subscription;
  public cargaFinalizada: boolean;
  public miSuscripcionEliminar: Subscription;
  public codigoEncuesta: number;

  constructor(
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
    this.objPreguntaNueva = this.inicializarPregunta();
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
    this.miSuscripcion = this.encuestaService
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
    this.miSuscripcion = this.encuestaService
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

  public listarDependencias(): void {
    this.miSuscripcion = this.encuestaService
      .listarDependencias()
      .pipe(
        map((resultado: Dependencias[]) => {
          this.arregloDependencias = resultado;
        }),
        finalize(() => {
          this.cargaFinalizada = true;
        })
      )
      .subscribe(observadorAny);
  }

  public obtenerTiposDependencia(): void {
    this.miSuscripcion = this.encuestaService
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
    return new Encuesta(0, 0, 0, 0, '', '', '', '', 0, '', '',0);
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

  public modificarEncuesta(): void {
    if (this.objEncuesta.fechaCierreEncuesta<this.objEncuesta.fechaCreacionEncuesta) {
      mostrarMensaje(
        'error',
        'Las fechas no son correctas',
        'Error',
        this.toastrService
      );
    }else
    this.miSuscripcion = this.encuestaService
      .modificarEncuesta(this.objEncuesta)
      .pipe(
        map(() => {
          mostrarMensaje(
            'success',
            'Encuesta modificada correctamente',
            'Exito',
            this.toastrService
          );
          this.router.navigate(['/private/encuestas/listar-encuesta']);
        }),
        catchError((miError) => {
          mostrarMensaje(
            'error',
            'No se modifico la encuesta',
            'Advertencia',
            this.toastrService
          );
          throw miError;
        })
      )
      .subscribe(observadorAny);
  }

   //MODIFICAR LISTAR Y ELIMINAR PREGUNTAS//

   public inicializarPregunta() {
    return new Preguntas(0, 0, '', 0, []);
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

  public modificarPregunta(objPreguntaModificar:Preguntas): void {
    this.miSuscripcion = this.preguntaService
      .modificarPregunta(objPreguntaModificar)
      .pipe(
        map(() => {
          mostrarMensaje(
            'success',
            'Pregunta modificada correctamente',
            'Exito',
            this.toastrService
          );
        }),
        catchError((miError) => {
          mostrarMensaje(
            'error',
            'No se modifico la pregunta',
            'Advertencia',
            this.toastrService
          );
          throw miError;
        })
      )
      .subscribe(observadorAny);
  }

  public limpiarPregunta(opcion: Opciones) {
    this.miSuscripcionEliminar = this.opcionService
      .eliminarOpciones(opcion.codOpcion)
      .pipe(
        map(() => {
          this.listarPreguntas(this.codigoEncuesta);
        }),
        catchError((miError) => {
          mostrarMensaje(
            'error',
            'No se pudo eliminar la opcion',
            'Advertencia',
            this.toastrService
          );
          throw miError;
        }),
      )
      .subscribe(observadorAny);
  }

  public eliminarPregunta(codPregunta: number): void {
    this.miSuscripcionEliminar = this.preguntaService
      .eliminarPregunta(codPregunta)
      .pipe(
        map(() => {
          this.listarPreguntas(this.codigoEncuesta);
          mostrarMensaje(
            'success',
            'Pregunta eliminada',
            'Exito',
            this.toastrService,
          );
        }),
        catchError((miError) => {
          mostrarMensaje(
            'error',
            'No se pudo eliminar la pregunta',
            'Advertencia',
            this.toastrService
          );
          throw miError;
        }),
        finalize(()=>{
          this.reloadComponent()
        }),
      )
      .subscribe(observadorAny);
  }

  //MODIFICAR LISTAR Y ELIMINAR OPCIONES//

  public inicializarOpcion(){
    return new Opciones (0,0,'')
  }

  public eliminarOpciones(opcion: Opciones) {
    this.miSuscripcionEliminar = this.opcionService
      .eliminarOpciones(opcion.codOpcion)
      .pipe(
        map((respuesta) => {
          this.listarPreguntas(this.codigoEncuesta);
          mostrarMensaje(
            'success',
            'Opcion eliminada',
            'Exito',
            this.toastrService
          );
          return respuesta;
        }),
        catchError((miError) => {
          mostrarMensaje(
            'error',
            'No se pudo eliminar la opcion',
            'Advertencia',
            this.toastrService
          );
          throw miError;
        })
      )
      .subscribe(observadorAny);
  }

  public modificarOpcion(opcion:Opciones): void {
    this.miSuscripcion = this.opcionService
      .modificarOpcion(opcion)
      .pipe(
        map(() => {
          mostrarMensaje(
            'success',
            'Opción modificada correctamente',
            'Exito',
            this.toastrService
          );
        }),
        catchError((miError) => {
          mostrarMensaje(
            'error',
            'No se modifico la opción',
            'Advertencia',
            this.toastrService
          );
          throw miError;
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

  //CREAR NUEVAS PREGUNTAS Y OPCIONES
  public crearPreguntasNuevas(tipoPregunta: number): void {
    let codigoPregunta = this.arregloPreguntasNuevas.length + 1;
    let objPregunta = new Preguntas(codigoPregunta, tipoPregunta, '', this.codigoEncuesta, []);
    this.arregloPreguntasNuevas.push(objPregunta);
  }

  public eliminarPreguntaNueva(codigo:number) {
    for (var i = 0; i < this.arregloPreguntasNuevas.length; i++) {
      if (this.arregloPreguntasNuevas[i].codPregunta == codigo) {
        this.arregloPreguntasNuevas.splice(i, 1);
        break;
      }
    }
  }

  public agregarOpcionesNuevas(codPregunta: number): void {
    let objOpcion = new Opciones(0, codPregunta, '');
    this.arregloPreguntasNuevas.map((preguntaNueva) => {
      if (preguntaNueva.codPregunta === codPregunta) {
        preguntaNueva.arregloOpciones.push(objOpcion);
      }
    });
  }

  public eliminarOpcionesNuevas(indicePregunta: number, indiceOpcion:number){
    this.arregloPreguntasNuevas[indicePregunta].arregloOpciones.splice(indiceOpcion,1);
  }


  public guardarPreguntasNuevas(formulario:NgForm): void {
    this.miSuscripcion = this.preguntaService
      .crearPregunta(this.arregloPreguntasNuevas)
      .pipe(
        map(() => {
          mostrarMensaje(
            'success',
            'Pregunta(s) creada(s)',
            'Exito',
            this.toastrService,
          );
        }),
        catchError((miError) => {
          mostrarMensaje(
            'error',
            'No se creo la pregunta',
            'Error',
            this.toastrService
          );
          formulario.resetForm();
          throw miError;
        }),
        finalize(()=>{
          this.reloadComponent()
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
