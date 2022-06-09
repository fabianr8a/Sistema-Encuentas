import { Routes } from '@angular/router';
import { ErrorLandComponent } from 'src/app/modulos/contenedor/landscape/error-land/error-land.component';

export const RUTAS_LANDSCAPE: Routes = [
  {path: 'public', loadChildren:
  ()=> import('../../modulos/publico/acceso/acceso.module').
  then(m =>m.AccesoModule)},

  {path: '', redirectTo: 'public', pathMatch: 'full'},
  {path: '**', component: ErrorLandComponent}
];
