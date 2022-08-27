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

@Component({
  selector: 'app-encuesta-crear',
  templateUrl: './encuesta-crear.component.html',
  styleUrls: ['./encuesta-crear.component.css'],
})
export class EncuestaCrearComponent implements OnInit {
  arregloPreguntas: Preguntas[] = [];
  opciones = [{ id: 0, opcion: '', placeholder: 'Opción' }];
  text = ((document.getElementById("pregunFecha") as HTMLTextAreaElement));

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
    private router: Router
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

  //agregar preguntas en un array
  public agregarPreguntas(tipoPregunta: any): void {
    let indice=this.arregloPreguntas.length;
    let objPreguntica = new Preguntas(indice, tipoPregunta, '', 0);
    this.arregloPreguntas.push(objPreguntica);
    console.log(this.arregloPreguntas);
  }



  public getInputValue(inputValue:string){
    console.log(inputValue);
  }




  //agregar opciones al tipo de pregunta de seleccion en un json
  public agregarOpciones(opcion: string): void {
    let indice=this.opciones.length;
    this.opciones.push({
      id: indice,
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

  public eliminarPreguntas(id: number) {
    for (var i = 0; i < this.arregloPreguntas.length; i++) {
      if (this.arregloPreguntas[i].codPregunta == id) {
        this.arregloPreguntas.splice(i, 1);
        break;
      }
    }
  }

  public crearEncuesta(formulario: NgForm): void {
    this.miSuscripcion = this.encuestaService
      .crearEncuesta(this.objEncuesta, this.arregloPreguntas)
      .pipe(
        map(() => {
          formulario.resetForm();
          mostrarMensaje(
            'success',
            'Se creó la encuesta',
            'Exito',
            this.toastrService
          );
          this.router.navigate(['/private/encuestas/listar-encuesta']);
        }),
        catchError((miError) => {
          formulario.resetForm();
          mostrarMensaje(
            'error',
            'No se puede crear la encuesta',
            'Error',
            this.toastrService
          );
          throw miError;
        })
      )
      .subscribe(observadorAny);
  }
}
