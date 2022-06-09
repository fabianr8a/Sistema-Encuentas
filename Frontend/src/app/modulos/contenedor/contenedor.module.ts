import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ErrorLandComponent } from './landscape/error-land/error-land.component';
import { InicioLandComponent } from './landscape/inicio-land/inicio-land.component';
import { ContenedorLandComponent } from './landscape/contenedor-land/contenedor-land.component';

import { ContenedorDashComponent } from './dashboard/contenedor-dash/contenedor-dash.component';
import { CabeceraDashComponent } from './dashboard/cabecera-dash/cabecera-dash.component';
import { CuerpoDashComponent } from './dashboard/cuerpo-dash/cuerpo-dash.component';
import { InicioDashComponent } from './dashboard/inicio-dash/inicio-dash.component';
import { ErrorDashComponent } from './dashboard/error-dash/error-dash.component';
import { SidebarDashComponent } from './dashboard/navbar-sidebar/sidebar-dash/sidebar-dash.component';




@NgModule({
  declarations: [
    ContenedorLandComponent,
    InicioLandComponent,
    ErrorLandComponent,
    ContenedorDashComponent,
    CabeceraDashComponent,
    CuerpoDashComponent,
    InicioDashComponent,
    ErrorDashComponent,
    SidebarDashComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    ContenedorLandComponent,
    ContenedorDashComponent
  ]
})
export class ContenedorModule { }
