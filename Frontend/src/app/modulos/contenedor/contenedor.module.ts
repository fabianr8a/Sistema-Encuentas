import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ContenedorLandComponent } from './landscape/contenedor-land/contenedor-land.component';
import { ContenedorDashComponent } from './dashboard/contenedor-dash/contenedor-dash.component';
import { CabeceraDashComponent } from './dashboard/cabecera-dash/cabecera-dash.component';
import { InicioDashComponent } from '../privado/inicio/inicio-dash.component';
import { ErrorDashComponent } from './dashboard/error-dash/error-dash.component';
import { ErrorLandComponent } from './landscape/error-land/error-land.component';
import { SidebarDashComponent } from './dashboard/sidebar-dash/sidebar-dash.component';






@NgModule({
  declarations: [
    ContenedorLandComponent,
    ContenedorDashComponent,
    CabeceraDashComponent,
    InicioDashComponent,
    ErrorDashComponent,
    ErrorLandComponent,
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
