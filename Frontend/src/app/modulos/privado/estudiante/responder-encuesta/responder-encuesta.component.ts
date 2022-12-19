import { TiposDependencia } from './../../../../modelos/tipo_dependencias';
import { Router, ActivatedRoute } from '@angular/router';
import { PreguntaService } from 'src/app/servicios/pregunta.service';
import { EncuestaService } from './../../../../servicios/encuesta.service';
import { ParamMap } from '@angular/router';
import { TipoEventos } from './../../../../modelos/tipo_eventos';
import { TipoPreguntas } from './../../../../modelos/tipo_preguntas';
import { Dependencias } from './../../../../modelos/dependencias';
import { Encuesta } from './../../../../modelos/encuesta';
import { Preguntas } from './../../../../modelos/preguntas';
import { observadorAny } from './../../../../utilidades/observadores/tipo-any';
import { mostrarMensaje } from 'src/app/utilidades/mensajes/toas.func';
import { catchError, map, finalize, Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { usuariosRespuestas } from 'src/app/modelos/usuarios-respuestas';
import { AccesoService } from 'src/app/servicios/acceso.service';
import { UsuarioEncuestaService } from 'src/app/servicios/usuario-respuestas.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-responder-encuesta',
  templateUrl: './responder-encuesta.component.html',
  styleUrls: ['./responder-encuesta.component.css']
})
export class ResponderEncuestaComponent implements OnInit {

  arregloPreguntas: Preguntas[] = [];
  arregloRespuestas: usuariosRespuestas[];

  public arregloEvento: TipoEventos[];
  public arregloTipoPreguntas: TipoPreguntas[];
  public arregloDependencias: Dependencias[];
  public arregloTiposDependencia: TiposDependencia[];
  public objUsuPreguntas: usuariosRespuestas;


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
    public usuarioEncuestaService: UsuarioEncuestaService,
    private toastrService: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private acceso: AccesoService,
  ) {
    //Inicializar atributos requeridos
    this.arregloEvento = [];
    this.arregloTipoPreguntas = [];
    this.arregloDependencias = [];
    this.arregloTiposDependencia = [];
    this.arregloRespuestas = [];
    this.objEncuesta = this.inicializarEncuesta();
    this.objUsuPreguntas = this.inicializarUsuariosPreguntas();
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
        finalize(() => {
          this.llenarRespuestas();
        })
      )
      .subscribe(observadorAny);
  }

  public inicializarUsuariosPreguntas() {
    return new usuariosRespuestas(0, 0, '', '', 0,'');
  }

  public llenarRespuestas(): void {
    this.arregloPreguntas.map((objPregunta: Preguntas) => {
      this.arregloRespuestas.push(new usuariosRespuestas(this.acceso.objAcceso.codUsuario, objPregunta.codPregunta, '', '', 0,''));
    });
  }

  public enviarEncuesta(formulario: NgForm): void {
    this.miSuscripcion = this.usuarioEncuestaService
      .responderEncuesta(this.arregloRespuestas,this.objEncuesta.codEncuesta)
      .pipe(
        map(() => {
          mostrarMensaje(
            'success',
            'Encuesta Respondida',
            'Exito',
            this.toastrService
          );
          this.router.navigate(['/private/estudiante/listar-encuesta']);
        }),
        catchError((err) => {
          if(err.status === 403){
            mostrarMensaje(
              'error',
              'Esta encuesta solo puede ser respondida una vez',
              'Error',
              this.toastrService
            );
          }else{
            mostrarMensaje(
              'error',
              'No se pudo responder la encuesta',
              'Error',
              this.toastrService
            );
          }
          throw err;
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
