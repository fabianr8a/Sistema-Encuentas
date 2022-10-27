import { ErrorLandComponent } from 'src/app/modulos/contenedor/landscape/error-land/error-land.component';
import { RegistroComponent } from './registro/registro.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './login/login.component';


const routes: Routes =[
  {path: 'login', component: InicioComponent},
  {path: 'registrar', component: RegistroComponent},


  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '**', component: ErrorLandComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AccesoRoutingModule { }
