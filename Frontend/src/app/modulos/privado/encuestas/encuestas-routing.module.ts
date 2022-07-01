import { ErrorDashComponent } from './../../contenedor/dashboard/error-dash/error-dash.component';
import { EncuestaEditarComponent } from './encuesta-editar/encuesta-editar.component';
import { EncuestaCrearComponent } from './encuesta-crear/encuesta-crear.component';
import { EncuestaListarComponent } from './../encuestas/encuesta-listar/encuesta-listar.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: 'listar-encuesta', component: EncuestaListarComponent  },
  { path: 'crear-encuesta', component: EncuestaCrearComponent  },
  { path: 'editar-encuesta/:codEncuesta', component: EncuestaEditarComponent  },


  { path: '', redirectTo: 'listar-encuesta', pathMatch: 'full' },
  { path: '**', component: ErrorDashComponent },
];



@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forChild(routes)],
    exports:[RouterModule],
})
export class EncuestasRoutingModule { }
