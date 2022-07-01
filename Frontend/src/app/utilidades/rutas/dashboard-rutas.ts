import { Routes } from '@angular/router';
import { ErrorDashComponent } from 'src/app/modulos/contenedor/dashboard/error-dash/error-dash.component';
import { InicioDashComponent } from 'src/app/modulos/contenedor/dashboard/inicio-dash/inicio-dash.component';

export const RUTAS_DASHBOARD: Routes = [
  { path: 'inicio-dash', component: InicioDashComponent },
  {
    path: 'usuario',
    loadChildren: () =>
      import('../../modulos/privado/usuario/usuario.module').then((m) => m.UsuarioModule),
  },

  {
    path: 'roles',
    loadChildren: () =>
      import('../../modulos/privado/rol/rol.module').then(
        (m) => m.RolModule
      ),
  },

  {
    path: 'encuestas',
    loadChildren: () =>
      import('../../modulos/privado/encuestas/encuestas.module').then(
        (m) => m.EncuestasModule
      ),
  },

  { path: '', redirectTo: 'inicio-dash', pathMatch: 'full' },
  { path: '**', component: ErrorDashComponent },
];
