import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolRoutingModule } from './rol-routing.module';
import { RolCrearComponent } from './rol-crear/rol-crear.component';
import { RolEditarComponent } from './rol-editar/rol-editar.component';
import { RolListarComponent } from './rol-listar/rol-listar.component';
import { TypeaheadModule} from 'ngx-bootstrap/typeahead';
import { EncuestaListarComponent } from '../encuestas/encuesta-listar/encuesta-listar.component';



@NgModule({
  declarations: [
    RolCrearComponent,
    RolEditarComponent,
    RolListarComponent,
    EncuestaListarComponent
  ],
  imports: [
    CommonModule,
    RolRoutingModule,
    NgxPaginationModule,
    FormsModule,
    TypeaheadModule.forRoot()
  ]
})
export class RolModule { }
