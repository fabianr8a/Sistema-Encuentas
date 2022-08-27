import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EncuestasRoutingModule } from './encuestas-routing.module';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { EncuestaCrearComponent } from '../encuestas/encuesta-crear/encuesta-crear.component';
import { EncuestaListarComponent } from '../encuestas/encuesta-listar/encuesta-listar.component';
import { EncuestaEditarComponent } from '../encuestas/encuesta-editar/encuesta-editar.component';
import { OcultarComponenteDirective } from './directivas/ocultar-componente.directive';
import { NgPipesModule } from 'ngx-pipes';


@NgModule({
  declarations: [
    EncuestaCrearComponent,
    EncuestaEditarComponent,
    EncuestaListarComponent,
    OcultarComponenteDirective,
  ],
  imports: [
    CommonModule,
    EncuestasRoutingModule,
    NgxPaginationModule,
    FormsModule,
    NgPipesModule,
    TypeaheadModule.forRoot()
  ]
})
export class EncuestasModule { }
