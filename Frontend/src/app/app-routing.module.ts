import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VigilanteGuard } from './vigilante.guard';
import { RUTAS_LANDSCAPE } from './utilidades/rutas/landscape-rutas';
import { RUTAS_DASHBOARD } from './utilidades/rutas/dashboard-rutas';
import { ContenedorLandComponent } from './modulos/contenedor/landscape/contenedor-land/contenedor-land.component';
import { ErrorLandComponent } from './modulos/contenedor/landscape/error-land/error-land.component';
import { ContenedorDashComponent } from './modulos/contenedor/dashboard/contenedor-dash/contenedor-dash.component';

const routes: Routes = [
{path: 'land', component: ContenedorLandComponent, children: RUTAS_LANDSCAPE},
{path: 'private', component: ContenedorDashComponent, children: RUTAS_DASHBOARD, canActivate: [VigilanteGuard]},
//Se debe proteger la ruta anterior con los GUARD

{path: '', redirectTo: 'land', pathMatch: 'full'},
{path: '**', component: ErrorLandComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
