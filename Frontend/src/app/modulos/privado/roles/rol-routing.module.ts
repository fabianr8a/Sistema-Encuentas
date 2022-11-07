import { RolEditarComponent } from './rol-editar/rol-editar.component';
import { RolCrearComponent } from './rol-crear/rol-crear.component';
import { ErrorDashComponent } from '../../contenedor/dashboard/error-dash/error-dash.component';
import { RolListarComponent } from './rol-listar/rol-listar.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminGuard } from 'src/app/utilidades/guards/admin.guard';

const routes: Routes = [
  {
    path: 'listar-rol',
    component: RolListarComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'crear-rol',
    component: RolCrearComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'editar-rol/:codRol',
    component: RolEditarComponent,
    canActivate: [AdminGuard],
  },

  { path: '', redirectTo: 'listar-rol', pathMatch: 'full' },
  { path: '**', component: ErrorDashComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RolRoutingModule {}
