import { RolEditarComponent } from './rol-editar/rol-editar.component';
import { RolCrearComponent } from './rol-crear/rol-crear.component';
import { ErrorDashComponent } from './../../contenedor/dashboard/error-dash/error-dash.component';
import { RolListarComponent } from './rol-listar/rol-listar.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: 'listar-rol', component: RolListarComponent  },
  { path: 'crear-rol', component: RolCrearComponent  },
  { path: 'editar-rol', component: RolEditarComponent  },


  { path: '', redirectTo: 'listar-rol', pathMatch: 'full' },
  { path: '**', component: ErrorDashComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forChild(routes)],
    exports:[RouterModule],
})
export class RolRoutingModule { }
