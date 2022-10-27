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
  arregloPreguntasNuevas: Preguntas[] = [];

  public arregloEvento: TipoEventos[];
  public arregloTipoPreguntas: TipoPreguntas[];
  public arregloDependencias: Dependencias[];
  public arregloTiposDependencia: TiposDependencia[];


  //Atributos consumo servicios
  public temporal: any;
  public objEncuesta: Encuesta;
  public objPregunta:Preguntas;
  public objPreguntaNueva: Preguntas;
  public objOpcion:Opciones;
  public miSuscripcion: Subscription;
  public cargaFinalizada: boolean;
  public miSuscripcionEliminar: Subscription;
  public codigoEncuesta: number;
  public codigoOpcion:number;


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
    this.objPreguntaNueva = this.inicializarPregunta();
    this.objPregunta=this.inicializarPregunta();
    this.objOpcion=this.inicializarOpcion();
    this.codigoEncuesta = 0;
    this.codigoOpcion=0,


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
    this.listarDependencias();
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

  public listarDependencias(): void {
    this.miSuscripcion = this.dependenciasService
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

  public modificarEncuesta(): void {
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
    return new Preguntas(0, 0, '', 0, [],[]);
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
          this.arregloPreguntas.map((pregunta)=>{
            if (pregunta.codTipoPregunta===3) {
              this.listarOpciones(pregunta.codPregunta);
            }
          })
        })
      )
      .subscribe(observadorAny);
  }

  public modificarPregunta(objPreguntaNuevaModificar:Preguntas): void {
    this.miSuscripcion = this.preguntaService
      .modificarPregunta(objPreguntaNuevaModificar)
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

  public eliminarPregunta(codPregunta: number): void {
    this.miSuscripcionEliminar = this.preguntaService
      .eliminarPregunta(codPregunta)
      .pipe(
        map((respuesta) => {
          this.listarPreguntas(this.codigoEncuesta);
          mostrarMensaje(
            'success',
            'Pregunta eliminada',
            'Exito',
            this.toastrService
          );
          return respuesta;
        }),
        catchError((miError) => {
          mostrarMensaje(
            'error',
            'No se pudo eliminar la pregunta',
            'Advertencia',
            this.toastrService
          );
          throw miError;
        })
      )
      .subscribe(observadorAny);
  }

  //MODIFICAR LISTAR Y ELIMINAR OPCIONES//

  public inicializarOpcion(){
    return new Opciones (0,0,'')
  }

  public listarOpciones(codigoPregunta:number): void {
    this.miSuscripcion = this.opcionService
      .listarOpciones(codigoPregunta)
      .pipe(
        map((respuesta: Opciones[]) => {
          this.objPregunta.arregloOpciones = respuesta;
          return respuesta;
        }),
        catchError((err) => {
          throw err;
        })
      )
      .subscribe(observadorAny);
  }

  public eliminarOpciones(opcion: Opciones) {
    this.miSuscripcionEliminar = this.opcionService
      .eliminarOpciones(opcion.codOpcion)
      .pipe(
        map((respuesta) => {
          this.listarOpciones(opcion.codPregunta);
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
          this.listarOpciones(opcion.codOpcion);
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


  //CREAR NUEVAS PREGUNTAS Y OPCIONES
  public crearPreguntas(tipoPregunta: any): void {
    let codigoPregunta = this.arregloPreguntasNuevas.length + 1;
    let objPreguntica = new Preguntas(codigoPregunta, tipoPregunta, '', this.codigoEncuesta, [],[]);
    this.arregloPreguntasNuevas.push(objPreguntica);
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
        preguntaNueva.arregloOpcionesNuevas.push(objOpcion);
      }
    });
  }

  public eliminarOpcionesNuevas(indicePregunta: number, indiceOpcion:number){
    this.arregloPreguntasNuevas[indicePregunta].arregloOpcionesNuevas.splice(indiceOpcion,1);
  }

  public guardarPreguntas(): void {
    this.miSuscripcion = this.preguntaService
      .crearPregunta(this.arregloPreguntasNuevas)
      .pipe(
        map(() => {
          mostrarMensaje(
            'success',
            'Creación exitosa',
            'Exito',
            this.toastrService,
          );
          console.log(this.arregloPreguntasNuevas)
          this.router.navigate(['/private/encuestas/listar-encuesta']);
        }),
        catchError((miError) => {
          mostrarMensaje(
            'error',
            'No se creo la nueva información',
            'Error',
            this.toastrService
          );
          throw miError;
        })
      )
      .subscribe(observadorAny);
  }

  ngOnDestroy(): void {
    if (this.miSuscripcion) {
      this.miSuscripcion.unsubscribe();
    }
  }


}
