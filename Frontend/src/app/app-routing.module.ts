import { RUTAS_DASHBOARD_SECRETARIA } from './utilidades/rutas/secretaria-rutas';
import { RUTAS_DASHBOARD_INVITADO } from './utilidades/rutas/invitado-rutas';
import { RUTAS_DASHBOARD_ESTUDIANTE } from './utilidades/rutas/estudiante-rutas';
import { RUTAS_DASHBOARD_DOCENTE } from './utilidades/rutas/docente-rutas';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VigilanteGuard } from './vigilante.guard';
import { RUTAS_LANDSCAPE } from './utilidades/rutas/landscape-rutas';
import { RUTAS_DASHBOARD_ADMINISTRADOR } from './utilidades/rutas/administrador-rutas';
import { ContenedorLandComponent } from './modulos/contenedor/landscape/contenedor-land/contenedor-land.component';
import { ErrorLandComponent } from './modulos/contenedor/landscape/error-land/error-land.component';
import { ContenedorDashComponent } from './modulos/contenedor/dashboard/contenedor-dash/contenedor-dash.component';

const routes: Routes = [
{path: 'land', component: ContenedorLandComponent, children: RUTAS_LANDSCAPE},
{path: 'administrador', component: ContenedorDashComponent, children: RUTAS_DASHBOARD_ADMINISTRADOR, canActivate: [VigilanteGuard]},
{path: 'docente', component: ContenedorDashComponent, children: RUTAS_DASHBOARD_DOCENTE, canActivate: [VigilanteGuard]},
{path: 'estudiante', component: ContenedorDashComponent, children: RUTAS_DASHBOARD_ESTUDIANTE, canActivate: [VigilanteGuard]},
{path: 'invitado', component: ContenedorDashComponent, children: RUTAS_DASHBOARD_INVITADO, canActivate: [VigilanteGuard]},
{path: 'secretaria', component: ContenedorDashComponent, children: RUTAS_DASHBOARD_SECRETARIA, canActivate: [VigilanteGuard]},


{path: '', redirectTo: 'land', pathMatch: 'full'},
{path: '**', component: ErrorLandComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
