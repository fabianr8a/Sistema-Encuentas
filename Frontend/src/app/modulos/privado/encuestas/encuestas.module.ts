import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EncuestasRoutingModule } from './encuestas-routing.module';
import { EncuestaCrearComponent } from '../encuestas/encuesta-crear/encuesta-crear.component';
import { EncuestaListarComponent } from '../encuestas/encuesta-listar/encuesta-listar.component';
import { EncuestaEditarComponent } from '../encuestas/encuesta-editar/encuesta-editar.component';
import { NgPipesModule } from 'ngx-pipes';
import { EncuestaResultadosComponent } from './encuesta-resultados/encuesta-resultados.component';
import { ScrollToTopComponent } from '../../contenedor/shared/scroll-to-top/scroll-to-top.component';


@NgModule({
  declarations: [
    EncuestaCrearComponent,
    EncuestaEditarComponent,
    EncuestaListarComponent,
    EncuestaResultadosComponent,
    ScrollToTopComponent,
  ],
  imports: [
    CommonModule,
    EncuestasRoutingModule,
    NgxPaginationModule,
    FormsModule,
    NgPipesModule,
  ]
})
export class EncuestasModule { }
