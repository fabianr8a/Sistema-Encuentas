import { Preguntas } from './../../../../modelos/preguntas';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { mostrarMensaje } from 'src/app/utilidades/mensajes/toas.func';
import { NgForm } from '@angular/forms';
import { Encuesta } from './../../../../modelos/encuesta';
import { TiposDependencia } from './../../../../modelos/tipo_dependencias';
import { Dependencias } from './../../../../modelos/dependencias';
import { TipoPreguntas } from './../../../../modelos/tipo_preguntas';
import { observadorAny } from 'src/app/utilidades/observadores/tipo-any';
import { Subscription, finalize, map, catchError } from 'rxjs';
import { OnInit } from '@angular/core';
import { TipoEventos } from 'src/app/modelos/tipo_eventos';
import { EncuestaService } from 'src/app/servicios/encuesta.service';
import { Component } from '@angular/core';
import { AccesoService } from 'src/app/servicios/acceso.service';
import { Opciones } from 'src/app/modelos/opciones';

@Component({
  selector: 'app-encuesta-crear',
  templateUrl: './encuesta-crear.component.html',
  styleUrls: ['./encuesta-crear.component.css'],
})
export class EncuestaCrearComponent implements OnInit {
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
  public objOpciones: Opciones;
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
    private acceso: AccesoService
  ) {
    //Inicializar atributos requeridos
    this.arregloEvento = [];
    this.arregloTipoPreguntas = [];
    this.arregloDependencias = [];
    this.arregloTiposDependencia = [];
    this.objEncuesta = this.inicializarEncuesta();
    this.objPregunta = this.inicializarPregunta();
    this.objOpciones = this.inicializarOpciones();

    //Inicializar consumo de servicios
    this.miSuscripcion = this.temporal;
    this.cargaFinalizada = false;
    this.miSuscripcionEliminar = this.temporal;
  }

  ngOnDestroy(): void {
    if (this.miSuscripcion) {
      this.miSuscripcion.unsubscribe();
    }
    if (this.miSuscripcionEliminar) {
      this.miSuscripcionEliminar.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.listarEventos();
    this.listarTipoPreguntas();
    this.listarDependencias();
    this.obtenerTiposDependencia();

  }

  //Metodos obligatorios
  public inicializarEncuesta(): Encuesta {
    return new Encuesta(0, 0,0,0,'','','','',this.acceso.objAcceso.codUsuario,'','');
  }

  public inicializarPregunta() {
    return new Preguntas(0, 0, '', 0, []);
  }

  public inicializarOpciones() {
    return new Opciones(0, 0, '');
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

  //agregar preguntas en un array
  public crearPreguntas(tipoPregunta: any): void {
    let codigoPregunta = this.arregloPreguntas.length + 1;
    let objPreguntica = new Preguntas(codigoPregunta,tipoPregunta,'',0,[]);
    this.arregloPreguntas.push(objPreguntica);
    console.log(this.arregloPreguntas)
  }

  public eliminarPregunta(codigo:number) {
    for (var i = 0; i < this.arregloPreguntas.length; i++) {
      if (this.arregloPreguntas[i].codPregunta == codigo) {
        this.arregloPreguntas.splice(i, 1);
        break;
      }
    }
  }

  //agregar opciones al tipo de pregunta de seleccion en un array
  public agregarOpciones(codPregunta: number): void {
    let objOpcion = new Opciones(0, codPregunta, '');
    this.arregloPreguntas.map((pregunta) => {
      if (pregunta.codPregunta === codPregunta) {
        pregunta.arregloOpciones.push(objOpcion);
      }
    });
  }

  public eliminarOpciones(indicePregunta: number, indiceOpcion: number) {
    this.arregloPreguntas[indicePregunta].arregloOpciones.splice(
      indiceOpcion,1
    );
  }


  public crearEncuesta(formulario: NgForm): void {
    if (this.objEncuesta.fechaCierreEncuesta<this.objEncuesta.fechaCreacionEncuesta) {
      mostrarMensaje(
        'error',
        'Las fechas no son correctas',
        'Error',
        this.toastrService
      );
    }else
    this.miSuscripcion = this.encuestaService
      .crearEncuesta(this.objEncuesta, this.arregloPreguntas)
      .pipe(
        map(() => {
          mostrarMensaje(
            'success',
            'Se creó la encuesta',
            'Exito',
            this.toastrService
          );
          this.router.navigate(['/private/encuestas/listar-encuesta']);
        }),
        catchError((miError) => {
          mostrarMensaje(
            'error',
            'No se puede crear la encuesta',
            'Error',
            this.toastrService
          );
          formulario.resetForm();
          throw miError;
        }),
      )
      .subscribe(observadorAny);
  }
}
