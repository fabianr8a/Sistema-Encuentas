import { observadorAny } from 'src/app/utilidades/observadores/tipo-any';
import { mostrarMensaje } from 'src/app/utilidades/mensajes/toas.func';
import { RolService } from 'src/app/servicios/rol.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Rol } from 'src/app/modelos/rol';
import { Component, OnInit } from '@angular/core';
import { Subscription, map,catchError } from 'rxjs';

@Component({
  selector: 'app-rol-crear',
  templateUrl: './rol-crear.component.html',
  styleUrls: ['./rol-crear.component.css']
})
export class RolCrearComponent implements OnInit {
  public objRol: Rol;
  public temporal: any;
  public clickCrear: boolean;
  public miSuscripcionCrear: Subscription;


  constructor(
    private router: Router,
    private toastrService: ToastrService,
    private rolService: RolService
  ) {
    this.objRol = this.inicializarRol();
    this.clickCrear = false;
    this.miSuscripcionCrear = this.temporal;
  }

  ngOnDestroy(): void {
    if (this.miSuscripcionCrear) {
      this.miSuscripcionCrear.unsubscribe();
    }
  }

  ngOnInit(): void {
  }

  // Métodos obligatorios
  public inicializarRol(): Rol {
    return new Rol(0, '', 0, 0);
  }

  // Eventos Formularios
  public crearRol(miFormulario: NgForm): void {
    this.clickCrear = true;
    this.miSuscripcionCrear = this.rolService
      .crearRol(this.objRol)
      .pipe(
        map(() => {
          mostrarMensaje(
            'success',
            'Rol creado correctamente',
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
            'No se puede crear el rol',
            'advertencia',
            this.toastrService
          );
          throw miError;
        })
      )
      .subscribe(observadorAny);
  }

}
