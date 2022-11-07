import { EncuestaResultadosComponent } from './encuesta-resultados/encuesta-resultados.component';
import { UsuariosGuard } from './../../../utilidades/guards/usuarios.guard';
import { ErrorDashComponent } from '../../contenedor/dashboard/error-dash/error-dash.component';
import { EncuestaEditarComponent } from './encuesta-editar/encuesta-editar.component';
import { EncuestaCrearComponent } from './encuesta-crear/encuesta-crear.component';
import { EncuestaListarComponent } from './encuesta-listar/encuesta-listar.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminGuard } from 'src/app/utilidades/guards/admin.guard';

const routes: Routes = [
  {
    path: 'listar-encuesta',
    component: EncuestaListarComponent,
    canActivate: [UsuariosGuard],
  },
  {
    path: 'crear-encuesta',
    component: EncuestaCrearComponent,
    canActivate: [UsuariosGuard],
  },
  {
    path: 'editar-encuesta/:codEncuesta',
    component: EncuestaEditarComponent,
    canActivate: [UsuariosGuard],
  },
  {
    path: 'resultados-encuesta/:codEncuesta',
    component: EncuestaResultadosComponent,
    canActivate: [UsuariosGuard],
  },

  { path: '', redirectTo: 'listar-encuesta', pathMatch: 'full' },
  { path: '**', component: ErrorDashComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EncuestasRoutingModule {}
