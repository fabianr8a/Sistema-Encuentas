import { mostrarMensaje } from 'src/app/utilidades/mensajes/toas.func';
import { NgForm } from '@angular/forms';
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

@Component({
  selector: 'app-encuesta-editar',
  templateUrl: './encuesta-editar.component.html',
  styleUrls: ['./encuesta-editar.component.css'],
})
export class EncuestaEditarComponent implements OnInit {
  arregloPreguntas: Preguntas[] = [];
  arregloOpciones: Opciones[] = [];

  public arregloEvento: TipoEventos[];
  public arregloTipoPreguntas: TipoPreguntas[];
  public arregloDependencias: Dependencias[];
  public arregloTiposDependencia: TiposDependencia[];

  //Atributos consumo servicios
  public temporal: any;
  public objEncuesta: Encuesta;
  public objPregunta: Preguntas;
  public miSuscripcion: Subscription;
  public cargaFinalizada: boolean;
  public miSuscripcionEliminar: Subscription;
  public codEncuesta: number;

  constructor(
    public tipoEventosService: EncuestaService,
    public tipoPreguntasService: EncuestaService,
    public dependenciasService: EncuestaService,
    public tipoDependenciasService: EncuestaService,
    public encuestaService: EncuestaService,
    public preguntaService: PreguntaService,
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
    this.objPregunta = this.inicializarPregunta();
    this.codEncuesta = 0;

    //Inicializar consumo de servicios
    this.miSuscripcion = this.temporal;
    this.cargaFinalizada = false;
    this.miSuscripcionEliminar = this.temporal;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((parametro: ParamMap) => {
      const valor = String(parametro.get('codEncuesta'));
      this.codEncuesta = parseInt(valor) as number;
      this.encuestaSeleccionada();
      this.listarEventos();
      this.listarTipoPreguntas();
      this.listarDependencias();
      this.obtenerTiposDependencia();
      this.preguntaSeleccionada();
    });
  }

  public encuestaSeleccionada(): void {
    this.miSuscripcion = this.encuestaService
      .seleccionarEncuestaModificar(this.codEncuesta)
      .pipe(
        map((respuesta: Encuesta) => {
          this.objEncuesta = respuesta;
          return respuesta;
        }),
        catchError((err) => {
          throw err;
        })
      )
      .subscribe(observadorAny);
  }

  public preguntaSeleccionada(): void {
    this.miSuscripcion = this.preguntaService
      .seleccionarPregunta(this.codEncuesta)
      .pipe(
        map((respuesta: Preguntas[]) => {
          this.arregloPreguntas = respuesta;
          return respuesta;
        }),
        catchError((err) => {
          throw err;
        })
      )
      .subscribe(observadorAny);
  }

  //Metodos obligatorios
  public inicializarEncuesta(): Encuesta {
    return new Encuesta(0, 0, 0, 0, '', '', '', '', 0, '', '');
  }

  public inicializarPregunta() {
    return new Preguntas(0, 0, '', 0, []);
  }

  //Lógica del negocio - Servicios

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

  //agregar template de preguntas en un array
  public crearPreguntas(tipoPregunta: any): void {
    let codigoPregunta = this.arregloPreguntas.length + 1;
    let objPreguntica = new Preguntas(codigoPregunta, tipoPregunta, '', 0, []);
    this.arregloPreguntas.push(objPreguntica);
    console.log(this.arregloPreguntas);
  }

  public eliminarPregunta(descripcion: string) {
    for (var i = 0; i < this.arregloPreguntas.length; i++) {
      if (this.arregloPreguntas[i].descripcionPregunta == descripcion) {
        this.arregloPreguntas.splice(i, 1);
        break;
      }
    }
  }
  //agregar opciones al tipo de pregunta de seleccion en un json
  public agregarOpciones(codPregunta: number): void {
    let objOpcion = new Opciones(0, codPregunta, '');
    this.arregloPreguntas.map((pregunta) => {
      if (pregunta.codPregunta === codPregunta) {
        pregunta.arregloOpciones.push(objOpcion);
      }
    });
    console.log(this.arregloPreguntas[codPregunta]);
  }

  public eliminarOpciones(id: number) {
    for (var i = 0; i < this.arregloOpciones.length; i++) {
      if (this.arregloOpciones[i].codOpcion == id) {
        this.arregloOpciones.splice(i, 1);
        break;
      }
    }
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

  public modificarPregunta(): void {
    this.miSuscripcion = this.preguntaService
      .modificarPregunta( this.objPregunta)
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

  ngOnDestroy(): void {
    if (this.miSuscripcion) {
      this.miSuscripcion.unsubscribe();
    }
  }
}
