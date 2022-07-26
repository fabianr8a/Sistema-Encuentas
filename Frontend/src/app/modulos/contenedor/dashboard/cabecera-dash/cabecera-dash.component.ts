import { Acceso } from 'src/app/modelos/acceso';
import { AccesoService } from './../../../../servicios/acceso.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-cabecera-dash',
  templateUrl: './cabecera-dash.component.html',
  styleUrls: ['./cabecera-dash.component.css']
})
export class CabeceraDashComponent implements OnInit {
  objUsuarioSesion:Acceso;
  public respuestaToken:Acceso;

  constructor(public accesoService:AccesoService) {
    this.objUsuarioSesion= accesoService.obtenerAcceso();
    this.respuestaToken = this.accesoService.objAcceso;
   }

  ngOnInit(): void {
  }

  toggleSidenav = () => {
    document.body.classList.toggle('sb-sidenav-toggled');
    document.body.classList.toggle('sb-nav-fixed');
  };
}
