import { observadorAny } from './../../../../../utilidades/observadores/tipo-any';
import { Component, OnInit } from '@angular/core';
import { Subscription, map, catchError, finalize } from 'rxjs';
import { Acceso } from 'src/app/modelos/acceso';
import { AccesoService } from 'src/app/servicios/acceso.service';


@Component({
  selector: 'app-sidebar-dash',
  templateUrl: './sidebar-dash.component.html',
  styleUrls: ['./sidebar-dash.component.css']
})
export class SidebarDashComponent implements OnInit {
  public respuestaToken:Acceso;



constructor( private acceso:AccesoService ) {
  this.respuestaToken = this.acceso.objAcceso;
}

ngOnInit(): void {
}



}
