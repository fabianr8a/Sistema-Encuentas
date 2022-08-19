import { Routes } from '@angular/router';
import { ErrorDashComponent } from 'src/app/modulos/contenedor/dashboard/error-dash/error-dash.component';
import { InicioDashComponent } from 'src/app/modulos/contenedor/dashboard/inicio-dash/inicio-dash.component';

export const RUTAS_DASHBOARD: Routes = [
  { path: 'inicio-dash', component: InicioDashComponent },
  {
    path: 'usuario',
    loadChildren: () =>
      import('../../modulos/privado/usuarios/usuario.module').then((m) => m.UsuarioModule),
  },

  {
    path: 'roles',
    loadChildren: () =>
      import('../../modulos/privado/roles/rol.module').then(
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

  {
    path: 'estudiante',
    loadChildren: () =>
      import('../../modulos/privado/estudiante/encuestas/estudiante.module').then(
        (m) => m.EstudianteModule
      ),
  },

  { path: '', redirectTo: 'inicio-dash', pathMatch: 'full' },
  { path: '**', component: ErrorDashComponent },
];
