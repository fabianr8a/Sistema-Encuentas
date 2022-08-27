import { ErrorDashComponent } from 'src/app/modulos/contenedor/dashboard/error-dash/error-dash.component';
import { UsuDatosComponent } from './usu-datos/usu-datos.component';
import { UsuEditarComponent } from './usu-editar/usu-editar.component';
import { UsuCrearComponent } from './usu-crear/usu-crear.component';
import { UsuListarComponent } from './usu-listar/usu-listar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'listar-usuario', component: UsuListarComponent  },
  { path: 'crear-usuario', component: UsuCrearComponent  },
  { path: 'editar-usuario/:codUsuario', component: UsuEditarComponent  },
  { path: 'perfil-usuario/:codUsuario', component: UsuDatosComponent  },

  { path: '', redirectTo: 'listar-usuario', pathMatch: 'full' },
  { path: '**', component: ErrorDashComponent },
];

@NgModule({
  declarations: [],
  imports:
    [CommonModule,RouterModule.forChild(routes)],
    exports:[RouterModule],
})
export class UsuarioRoutingModule { }
