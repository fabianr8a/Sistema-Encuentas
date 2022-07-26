import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EncuestasRoutingModule } from './encuestas-routing.module';
import { ResponderEncuestaComponent } from './responder-encuesta/responder-encuesta.component';
import { ListarEncuestasComponent } from './listar-encuestas/listar-encuestas.component';



@NgModule({
  declarations: [
    ResponderEncuestaComponent,
    ListarEncuestasComponent
  ],
  imports: [
    CommonModule,
    EncuestasRoutingModule
  ]
})
export class EncuestasModule { }
