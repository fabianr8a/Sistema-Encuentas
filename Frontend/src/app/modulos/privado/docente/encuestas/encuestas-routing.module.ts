
import { ErrorDashComponent } from './../../../contenedor/dashboard/error-dash/error-dash.component';

import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarEncuestaComponent } from '../../docente/encuestas/listar-encuesta/listar-encuesta.component';
import { CrearEncuestaComponent } from './crear-encuesta/crear-encuesta.component';

const routes: Routes = [
  { path: 'listar-encuesta', component: ListarEncuestaComponent  },
  { path: 'crear-encuesta', component: CrearEncuestaComponent  },



  { path: '', redirectTo: 'listar-encuesta', pathMatch: 'full' },
  { path: '**', component: ErrorDashComponent },
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class EncuestasRoutingModule { }
