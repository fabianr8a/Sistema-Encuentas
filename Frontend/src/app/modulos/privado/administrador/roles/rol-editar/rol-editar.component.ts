import { observadorAny } from 'src/app/utilidades/observadores/tipo-any';
import { mostrarMensaje } from 'src/app/utilidades/mensajes/toas.func';
import { RolService } from '../../../../../servicios/rol.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription, map, catchError, finalize, switchMap, tap } from 'rxjs';
import { Rol } from '../../../../../modelos/rol';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';




@Component({
  selector: 'app-rol-editar',
  templateUrl: './rol-editar.component.html',
  styleUrls: ['./rol-editar.component.css'],
})
export class RolEditarComponent implements OnInit {
  public temporal: any;
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
        map((respuesta) => {
          mostrarMensaje(
            'success',
            'Rol actualizado correctamente',
            'exito',
            this.toastrService
          );
          this.router.navigate(['/private/roles/listar-rol']);
          //miFormulario.resetForm();
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
