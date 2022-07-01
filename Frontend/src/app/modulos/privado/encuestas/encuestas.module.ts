import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EncuestasRoutingModule } from './encuestas-routing.module';
import { EncuestaCrearComponent } from './encuesta-crear/encuesta-crear.component';
import { EncuestaEditarComponent } from './encuesta-editar/encuesta-editar.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';



@NgModule({
  declarations: [
    EncuestaCrearComponent,
    EncuestaEditarComponent
  ],
  imports: [
    CommonModule,
    EncuestasRoutingModule,
    NgxPaginationModule,
    FormsModule,
    TypeaheadModule.forRoot()
  ]
})
export class EncuestasModule { }
