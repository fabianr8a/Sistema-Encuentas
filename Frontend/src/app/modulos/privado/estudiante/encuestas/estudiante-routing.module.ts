import { ErrorDashComponent } from 'src/app/modulos/contenedor/dashboard/error-dash/error-dash.component';
import { ResponderEncuestaComponent } from './responder-encuesta/responder-encuesta.component';
import { ListarEncuestasComponent } from './listar-encuestas/listar-encuestas.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: 'listar-encuesta', component: ListarEncuestasComponent  },
  { path: 'responder-encuesta', component: ResponderEncuestaComponent },



  { path: '', redirectTo: 'listar-encuesta', pathMatch: 'full' },
  { path: '**', component: ErrorDashComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forChild(routes)],
    exports:[RouterModule],
})
export class EstudianteRoutingModule { }
