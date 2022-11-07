import { ContenedorModule } from './../contenedor/contenedor.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollToTopComponent } from '../contenedor/shared/scroll-to-top/scroll-to-top.component';



@NgModule({
  declarations: [
    ScrollToTopComponent
  ],
  imports: [
    CommonModule,
    ContenedorModule
  ]
})
export class PrivadoModule { }
