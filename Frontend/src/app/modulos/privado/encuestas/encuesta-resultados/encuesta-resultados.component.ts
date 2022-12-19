import { TiposDependencia } from './../../../../modelos/tipo_dependencias';
import { observadorAny } from './../../../../utilidades/observadores/tipo-any';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription, map, catchError, finalize } from 'rxjs';
import { Encuesta } from './../../../../modelos/encuesta';
import { Component, OnInit, ViewChild } from '@angular/core';
import { EncuestaService } from 'src/app/servicios/encuesta.service';
import { TipoEventos } from 'src/app/modelos/tipo_eventos';
import { PreguntaService } from 'src/app/servicios/pregunta.service';
import { Preguntas } from 'src/app/modelos/preguntas';
import { usuariosRespuestas } from 'src/app/modelos/usuarios-respuestas';
import { ResultadosEncuestasService } from 'src/app/servicios/resultados-encuestas.service';
import { BaseChartDirective } from 'ng2-charts';
import { Opciones } from 'src/app/modelos/opciones';

@Component({
  selector: 'app-encuesta-resultados',
  templateUrl: './encuesta-resultados.component.html',
  styleUrls: ['./encuesta-resultados.component.css'],
})
export class EncuestaResultadosComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartslabels: string[] = [];
  public totales: number[] = [];
  public barChartData = [{ data: [0] }];
  public arregloEvento: TipoEventos[];
  public arregloRespuestas: any[];
  public arregloOpciones: any[] = [];
  public arregloTiposDependencias: TiposDependencia[];
  public arregloPreguntas: Preguntas[] = [];

  //Atributos consumo servicios
  public objEncuesta: Encuesta;
  public objRespuestas: usuariosRespuestas = this.inicializarRespuestas();
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

  public inicializarRespuestas(): usuariosRespuestas {
    return new usuariosRespuestas(0, 0, '', '', 0, '');
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
    return new Encuesta(0, 0, 0, 0, '', '', '', '', 0, '', '', 0);
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
          this.listarRespuestas(this.arregloPreguntas);
          this.listarTextoOpcion(this.arregloPreguntas);
        })
      )
      .subscribe(observadorAny);
  }

  public listarRespuestas(arregloPregunta: Preguntas[]): void {
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
          finalize(() => {})
        )
        .subscribe(observadorAny);
    }
  }

  public listarTextoOpcion(arregloPregunta: Preguntas[]): void {
    for (const encuesta of arregloPregunta) {
      const codPregunta = encuesta.codPregunta;
      if (encuesta.codTipoPregunta === 3) {
        this.miSuscripcion = this.respuestasEncuestas
          .listarRespuestasUnicas(codPregunta)
          .pipe(
            map((respuesta: Opciones[]) => {
              this.arregloOpciones = respuesta;
              this.arregloOpciones.map((opcion: Opciones) => {
                this.barChartslabels.push(opcion.textoOpcion);
                this.totales.push(Number(opcion.contador));
              });
              this.barChartData = [{ data: this.totales }];
              return respuesta;
            }),
            catchError((err) => {
              throw err;
            })
          )
          .subscribe(observadorAny);
      }
    }
  }
}
