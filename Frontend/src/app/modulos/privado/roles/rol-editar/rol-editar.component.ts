import { ARREGLO_ESTADOS } from './../../../../utilidades/dominios/estados';
import { observadorAny } from 'src/app/utilidades/observadores/tipo-any';
import { mostrarMensaje } from 'src/app/utilidades/mensajes/toas.func';
import { RolService } from 'src/app/servicios/rol.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute} from '@angular/router';
import { Subscription, map, catchError, switchMap } from 'rxjs';
import { Rol } from 'src/app/modelos/rol';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-rol-editar',
  templateUrl: './rol-editar.component.html',
  styleUrls: ['./rol-editar.component.css'],
})
export class RolEditarComponent implements OnInit {

  public temporal: any;
  public arregloEstados: any[];
  public miSuscripcion: Subscription;
  public clickCrear: boolean;
  public objRol: Rol;
  public cargaFinalizada: boolean;

  constructor(
    private router: Router,
    private toastrService: ToastrService,
    private rolService: RolService,
    private route: ActivatedRoute
  ) {
    this.miSuscripcion = this.temporal;
    this.clickCrear = false;
    this.cargaFinalizada = false;
    this.objRol=this.inicializarRol();
    this.arregloEstados = ARREGLO_ESTADOS;
  }

  ngOnInit(): void {
    this.miSuscripcion=this.route.params
      .pipe(switchMap(({codRol})=>this.rolService.buscarUnRol(codRol)))
      .subscribe(rol=>this.objRol=rol)
  }

  public inicializarRol(): Rol {
    return new Rol(0, '', 0, 0);
  }

  public modificarRol(miFormulario: NgForm): void {
    this.clickCrear = true;
    this.miSuscripcion = this.rolService
      .modificarRol(this.objRol)
      .pipe(
        map(() => {
          mostrarMensaje(
            'success',
            'Rol actualizado correctamente',
            'exito',
            this.toastrService
          );
          this.router.navigate(['/private/roles/listar-rol']);
          this.clickCrear = false;
        }),
        catchError((miError) => {
          miFormulario.resetForm();
          mostrarMensaje(
            'error',
            'No se puede actualizar el rol',
            'advertencia',
            this.toastrService
          );
          throw miError;
        })
      )
      .subscribe(observadorAny);
  }

  ngOnDestroy(): void {
    if (this.miSuscripcion) {
      this.miSuscripcion.unsubscribe();
    }
  }



}
