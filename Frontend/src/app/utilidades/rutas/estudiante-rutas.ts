import { Routes } from '@angular/router';
import { ErrorDashComponent } from 'src/app/modulos/contenedor/dashboard/error-dash/error-dash.component';
import { InicioDashComponent } from 'src/app/modulos/contenedor/dashboard/inicio-dash/inicio-dash.component';

export const RUTAS_DASHBOARD_ESTUDIANTE: Routes = [
  { path: 'inicio-dash', component: InicioDashComponent },

  {
    path: 'encuestas',
    loadChildren: () =>
      import('../../modulos/privado/administrador/encuestas/encuestas.module').then(
        (m) => m.EncuestasModule
      ),
  },

  { path: '', redirectTo: 'inicio-dash', pathMatch: 'full' },
  { path: '**', component: ErrorDashComponent },
];
