import { TiposDependencia } from './../../../../modelos/tipo_dependencias';
import { observadorAny } from './../../../../utilidades/observadores/tipo-any';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription, map, catchError, finalize } from 'rxjs';
import { Encuesta } from './../../../../modelos/encuesta';
import { Component, OnInit } from '@angular/core';
import { EncuestaService } from 'src/app/servicios/encuesta.service';
import { TipoEventos } from 'src/app/modelos/tipo_eventos';
import { Dependencias } from 'src/app/modelos/dependencias';

@Component({
  selector: 'app-encuesta-resultados',
  templateUrl: './encuesta-resultados.component.html',
  styleUrls: ['./encuesta-resultados.component.css'],
})
export class EncuestaResultadosComponent implements OnInit {
  public objEncuesta: Encuesta;
  public codigoEncuesta: number;
  public miSuscripcion: Subscription;
  public temporal: any;
  public cargaFinalizada: boolean;
  public arregloEvento: TipoEventos[];
  public arregloTiposDependencias: TiposDependencia[];

  constructor(
    public encuestaService: EncuestaService,
    private route: ActivatedRoute)
    {
    this.objEncuesta = this.inicializarEncuesta();
    this.codigoEncuesta = 0;
    this.miSuscripcion = this.temporal;
    this.cargaFinalizada = false;
    this.arregloEvento = [];
    this.arregloTiposDependencias = [];
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
        finalize(() => {
        })
      )
      .subscribe(observadorAny);
  }
}
