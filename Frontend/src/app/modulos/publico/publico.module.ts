import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AccesoRoutingModule } from './publico-routing.module';
import { InicioComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';


@NgModule({
  declarations: [
    InicioComponent,
    RegistroComponent,
  ],
  imports: [
    CommonModule,
    AccesoRoutingModule,
    FormsModule,
    RouterModule
  ]
})
export class AccesoModule { }
