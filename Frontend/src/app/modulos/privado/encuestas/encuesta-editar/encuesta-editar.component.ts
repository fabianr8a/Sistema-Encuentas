import { mostrarMensaje } from 'src/app/utilidades/mensajes/toas.func';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

@Component({
  selector: 'app-encuesta-editar',
  templateUrl: './encuesta-editar.component.html',
  styleUrls: ['./encuesta-editar.component.css'],
})
export class EncuestaEditarComponent implements OnInit {
  pregunt: number[] = [];
  nuevaPregunta = [{ id: 0, descripcion: '', tipoPregunta: 0 }];
  opciones = [{ id: 1, opcion: '', placeholder: 'Opción' }];

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

  constructor(
    public tipoEventosService: EncuestaService,
    public tipoPreguntasService: EncuestaService,
    public dependenciasService: EncuestaService,
    public tipoDependenciasService: EncuestaService,
    public encuestaService: EncuestaService,
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

    //Inicializar consumo de servicios
    this.miSuscripcion = this.temporal;
    this.cargaFinalizada = false;
    this.miSuscripcionEliminar = this.temporal;
  }

  ngOnInit(): void {
    this.initEncuesta();

    this.listarEventos();
    this.listarTipoPreguntas();
    this.listarDependencias();
  }

  public initEncuesta(): void {
    this.miSuscripcion = this.route.params
      .pipe(
        switchMap(({ codEncuesta }) =>
          this.encuestaService.seleccionarEncuestaModificar(codEncuesta)))
      .subscribe(encuesta => this.objEncuesta = encuesta);
  }

  //Metodos obligatorios
  public inicializarEncuesta(): Encuesta {
    return new Encuesta(0, 0, 0, '', '', '', '', 0, '');
  }

  public inicializarPregunta() {
    return new Preguntas(0, 0, '', 0);
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

  public obtenerTiposDependencia(codDependencia: number): void {
    this.miSuscripcion = this.tipoDependenciasService
      .listarTipoDependencias(codDependencia)
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
  public listarPreguntas(pregunta: number): void {
    this.pregunt.push(pregunta);
  }

  //agregar opciones al tipo de pregunta de seleccion en un json
  public agregarOpciones(opcion: string): void {
    const generateId = () => Math.random();
    this.opciones.push({
      id: generateId(),
      opcion: opcion,
      placeholder: 'Opción',
    });
    console.log(this.opciones);
  }

  public eliminarOpciones(id: number) {
    for (var i = 0; i < this.opciones.length; i++) {
      if (this.opciones[i].id == id) {
        this.opciones.splice(i, 1);
        break;
      }
    }
  }

  public modificarEncuesta(formulario: NgForm): void {
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
          formulario.resetForm();
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
