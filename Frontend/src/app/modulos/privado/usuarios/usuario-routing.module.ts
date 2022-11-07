import { ErrorDashComponent } from 'src/app/modulos/contenedor/dashboard/error-dash/error-dash.component';
import { UsuDatosComponent } from './usuarios-perfil/usu-datos.component';
import { UsuEditarComponent } from './usuarios-editar/usu-editar.component';
import { UsuCrearComponent } from './usuarios-crear/usu-crear.component';
import { UsuListarComponent } from './usuarios-listar/usu-listar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/utilidades/guards/admin.guard';

const routes: Routes = [
  {
    path: 'listar-usuario',
    component: UsuListarComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'crear-usuario',
    component: UsuCrearComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'editar-usuario/:codUsuario',
    component: UsuEditarComponent,
    canActivate: [AdminGuard],
  },
  { path: 'perfil-usuario/:codUsuario', component: UsuDatosComponent },

  { path: '', redirectTo: 'listar-usuario', pathMatch: 'full' },
  { path: '**', component: ErrorDashComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioRoutingModule {}
