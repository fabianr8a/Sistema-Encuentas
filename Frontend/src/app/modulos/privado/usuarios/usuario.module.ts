import { NgxPaginationModule } from 'ngx-pagination';
import {FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuCrearComponent } from './usuarios-crear/usu-crear.component';
import { UsuEditarComponent } from './usuarios-editar/usu-editar.component';
import { UsuListarComponent } from './usuarios-listar/usu-listar.component';
import { UsuDatosComponent } from './usuarios-perfil/usu-datos.component';
import { NgPipesModule } from 'ngx-pipes';




@NgModule({
  declarations: [
    UsuCrearComponent,
    UsuEditarComponent,
    UsuListarComponent,
    UsuDatosComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    FormsModule,
    NgxPaginationModule,
    NgPipesModule,

  ]
})
export class UsuarioModule { }
