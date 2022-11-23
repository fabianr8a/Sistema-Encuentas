import { TiposDependencia } from './../../../../modelos/tipo_dependencias';
import { observadorAny } from './../../../../utilidades/observadores/tipo-any';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription, map, catchError, finalize } from 'rxjs';
import { Encuesta } from './../../../../modelos/encuesta';
import { Component, OnInit } from '@angular/core';
import { EncuestaService } from 'src/app/servicios/encuesta.service';
import { TipoEventos } from 'src/app/modelos/tipo_eventos';
import { PreguntaService } from 'src/app/servicios/pregunta.service';
import { Preguntas } from 'src/app/modelos/preguntas';
import { UsuarioEncuestaService } from 'src/app/servicios/usuario-respuestas.service';
import { usuariosRespuestas } from 'src/app/modelos/usuarios-respuestas';
import { ResultadosEncuestasService } from 'src/app/servicios/resultados-encuestas.service';

@Component({
  selector: 'app-encuesta-resultados',
  templateUrl: './encuesta-resultados.component.html',
  styleUrls: ['./encuesta-resultados.component.css'],
})
export class EncuestaResultadosComponent implements OnInit {

  public arregloEvento: TipoEventos[];
  arregloRespuestas: any[];
  public arregloTiposDependencias: TiposDependencia[];
  arregloPreguntas: Preguntas[] = [];

  //Atributos consumo servicios
  public objEncuesta: Encuesta;
  public miSuscripcion: Subscription;
  public temporal: any;
  public cargaFinalizada: boolean;
  public codigoEncuesta: number;

  constructor(
    public encuestaService: EncuestaService,
    public preguntaService: PreguntaService,
    public respuestasEncuestas: ResultadosEncuestasService,
    private route: ActivatedRoute
  ) {
    this.objEncuesta = this.inicializarEncuesta();
    this.codigoEncuesta = 0;
    this.miSuscripcion = this.temporal;
    this.cargaFinalizada = false;
    this.arregloEvento = [];
    this.arregloTiposDependencias = [];
    this.arregloRespuestas = [];
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((parametro: ParamMap) => {
      const valor = String(parametro.get('codEncuesta'));
      this.codigoEncuesta = parseInt(valor) as number;
    });
    this.listarEncuesta();
    this.listarEventos();
    this.listarTiposDependencias();
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

  public listarTiposDependencias(): void {
    this.miSuscripcion = this.encuestaService
      .listarTipoDependencias()
      .pipe(
        map((resultado: TiposDependencia[]) => {
          this.arregloTiposDependencias = resultado;
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
        finalize(() => {
          this.listarPreguntas(this.objEncuesta.codEncuesta);
        })
      )
      .subscribe(observadorAny);
  }

  //LISTAR PREGUNTAS

  public inicializarPregunta() {
    return new Preguntas(0, 0, '', 0, []);
  }

  public listarPreguntas(codigoEncuesta: number): void {
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
          this.listarRespuesta(this.arregloPreguntas);
        })
      )
      .subscribe(observadorAny);
  }

  public listarRespuesta(arregloPregunta: Preguntas[]): void {
    for (const encuesta of arregloPregunta) {
      const codPregunta = encuesta.codPregunta;
      this.miSuscripcion = this.respuestasEncuestas
        .listarRespuestas(codPregunta)
        .pipe(
          map((respuesta: usuariosRespuestas[]) => {
            this.arregloRespuestas.push(respuesta);
            return respuesta;
          }),
          catchError((err) => {
            throw err;
          }),
          finalize(()=> {
          })
        )
        .subscribe(observadorAny);
    }
  }



}

