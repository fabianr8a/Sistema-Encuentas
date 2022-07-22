import { observadorAny } from '../../../../../utilidades/observadores/tipo-any';
import { Subscription, finalize, map } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { TipoEventos } from 'src/app/modelos/tipo_eventos';
import { EncuestaService } from 'src/app/servicios/encuesta.service';

@Component({
  selector: 'app-encuesta-crear',
  templateUrl: './encuesta-crear.component.html',
  styleUrls: ['./encuesta-crear.component.css']
})
export class EncuestaCrearComponent implements OnInit {
  public arregloEvento:TipoEventos[];
  public eventoSeleccionado:TipoEventos;
   seleccionados:string[]=[];

  //Atributos consumo servicios
  public tmp: any;
  public miSuscripcion: Subscription;
  public miSuscripcionEliminar: Subscription;
  public cargaFinalizada: boolean;

  constructor(
    public tipoEventosService: EncuestaService,
  ) {
    //Inicializar atributos requeridos
    this.arregloEvento = [];
    this.eventoSeleccionado = this.inicializarEvento();

    //Inicializar consumo de servicios
    this.miSuscripcion = this.tmp;
    this.miSuscripcionEliminar = this.tmp;
    this.cargaFinalizada = false;
  }

   //Metodos obligatorios
   public inicializarEvento():TipoEventos  {
    return new TipoEventos(0, '');
  }

  ngOnInit(): void {
    this.listarEventos();
  }

  //Lógica del negocio - Servicios

  public listarEventos(): void {
    this.miSuscripcion = this.tipoEventosService
      .listarEventos()
      .pipe(
        map((resultado: TipoEventos[]) => {
          this.arregloEvento = resultado;
          this.arregloEvento.map((encuesta) => {
          });
        }),
        finalize(() => {
          this.cargaFinalizada = true;
        })
      )
      .subscribe(observadorAny);
  }

}
