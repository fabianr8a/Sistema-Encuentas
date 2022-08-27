import { Acceso } from 'src/app/modelos/acceso';
import { AccesoService } from './../../../../servicios/acceso.service';
import { Component, OnInit } from '@angular/core';
import { catchError, map, Subscription } from 'rxjs';
import { Imagen } from 'src/app/modelos/imagen';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { observadorAny } from 'src/app/utilidades/observadores/tipo-any';
import { ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-cabecera-dash',
  templateUrl: './cabecera-dash.component.html',
  styleUrls: ['./cabecera-dash.component.css']
})
export class CabeceraDashComponent implements OnInit {
  objUsuarioSesion:Acceso;
  public respuestaToken:Acceso;
  public codUsuario: number;
  public temporal: any;
  public objImagen: Imagen;

  //Propiedad de tipo suscripcion
  public miSuscripcion: Subscription;

  constructor(
    public accesoService:AccesoService,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
  ) {
    this.objUsuarioSesion= accesoService.obtenerAcceso();
    this.objImagen = this.inicializarImagen();
    this.respuestaToken = this.accesoService.objAcceso;
    this.miSuscripcion = this.temporal;
    this.codUsuario = 0;
   }

  ngOnInit(): void {
    this.route.paramMap.subscribe((parametro :ParamMap)=>{
      const valor = String(parametro.get('codUsuario'));
      this.codUsuario = parseInt(valor) as number;
      this.iniIma();
    })
  }

  ngOnDestroy(): void {
    if (this.miSuscripcion) {
      this.miSuscripcion.unsubscribe();
    }
  }

  public inicializarImagen(): Imagen {
    return new Imagen(0, '', '', '', '');
  }

  toggleSidenav = () => {
    document.body.classList.toggle('sb-sidenav-toggled');
    document.body.classList.toggle('sb-nav-fixed');
  };

  public iniIma(): void {
    this.miSuscripcion = this.usuarioService
    .buscarUnaImagen(this.objUsuarioSesion.codUsuario)
      .pipe(
        map((respuesta:Imagen)=>{
          this.objImagen = respuesta;
          return respuesta;
        }),
        catchError((err)=>{
          throw err;
        })
        )
      .subscribe(observadorAny);
  }
}
