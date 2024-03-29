import { Router } from '@angular/router';
import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { catchError, map, Subscription, finalize } from 'rxjs';
import { Acceso } from 'src/app/modelos/acceso';
import { Imagen } from 'src/app/modelos/imagen';
import { AccesoService } from 'src/app/servicios/acceso.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { observadorAny } from 'src/app/utilidades/observadores/tipo-any';


@Component({
  selector: 'app-sidebar-dash',
  templateUrl: './sidebar-dash.component.html',
  styleUrls: ['./sidebar-dash.component.css']
})
export class SidebarDashComponent implements OnInit {

  public respuestaToken: Acceso;
  public temporal: any;
  public objImagen: Imagen;
  public codUsuario: number;
  public miSuscripcion: Subscription;

  constructor(
    private acceso: AccesoService,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    public router: Router,
  ) {
    this.objImagen = this.inicializarImagen();
    this.respuestaToken = this.acceso.objAcceso;
    this.miSuscripcion = this.temporal;
    this.codUsuario = 0;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((parametro: ParamMap) => {
      const valor = String(parametro.get('codUsuario'));
      this.codUsuario = parseInt(valor) as number;
    })
    this.iniIma();
  }

  ngOnDestroy(): void {
    if (this.miSuscripcion) {
      this.miSuscripcion.unsubscribe();
    }
  }

  reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
  }

  public inicializarImagen(): Imagen {
    return new Imagen(0, '', '', '', '');
  }

  public iniIma(): void {
    this.miSuscripcion = this.usuarioService
      .buscarUnaImagen(this.acceso.objAcceso.codUsuario)
      .pipe(
        map((respuesta: Imagen) => {
          this.objImagen = respuesta;
          return respuesta;
        }),
        catchError((err) => {
          throw err;
        }),
      )
      .subscribe(observadorAny);
  }
}
