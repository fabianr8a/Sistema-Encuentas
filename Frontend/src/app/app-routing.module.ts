
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VigilanteGuard } from './vigilante.guard';
import { RUTAS_LANDSCAPE } from './utilidades/rutas/ruta-componente-publico';
import { RUTAS_DASHBOARD } from './utilidades/rutas/rutas-privadas';
import { ContenedorLandComponent } from './modulos/contenedor/landscape/contenedor-land/contenedor-land.component';
import { ContenedorDashComponent } from './modulos/contenedor/dashboard/contenedor-dash/contenedor-dash.component';

const routes: Routes = [
{path: 'land', component: ContenedorLandComponent, children: RUTAS_LANDSCAPE},
{path: 'private', component: ContenedorDashComponent, children: RUTAS_DASHBOARD, canActivate: [VigilanteGuard]},



{path: '', redirectTo: 'land', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
