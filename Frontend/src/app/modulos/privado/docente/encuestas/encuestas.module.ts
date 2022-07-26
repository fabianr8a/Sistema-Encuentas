import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EncuestasRoutingModule } from './encuestas-routing.module';
import { CrearEncuestaComponent } from '../encuestas/crear-encuesta/crear-encuesta.component';
import { ListarEncuestaComponent } from '../encuestas/listar-encuesta/listar-encuesta.component';



@NgModule({
  declarations: [
    CrearEncuestaComponent,
    ListarEncuestaComponent
  ],
  imports: [
    CommonModule,
    EncuestasRoutingModule
  ]
})
export class EncuestasModule { }
