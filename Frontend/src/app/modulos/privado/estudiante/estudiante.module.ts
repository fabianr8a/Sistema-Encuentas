import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstudianteRoutingModule } from './estudiante-routing.module';
import { ResponderEncuestaComponent } from './responder-encuesta/responder-encuesta.component';
import { ListarEncuestasComponent } from './listar-encuestas/listar-encuestas.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgPipesModule } from 'ngx-pipes';


@NgModule({
  declarations: [
    ResponderEncuestaComponent,
    ListarEncuestasComponent
  ],
  imports: [
    CommonModule,
    EstudianteRoutingModule,
    NgxPaginationModule,
    FormsModule,
    NgPipesModule,
    RouterModule
  ]
})
export class EstudianteModule { }
