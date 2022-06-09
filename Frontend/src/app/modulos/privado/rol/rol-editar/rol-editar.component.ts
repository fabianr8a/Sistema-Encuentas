import { observadorAny } from 'src/app/utilidades/observadores/tipo-any';
import { RolService } from './../../../../servicios/rol.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Rol } from './../../../../modelos/rol';
import { Component, OnInit } from '@angular/core';
import {ARREGLO_ESTADOS_ROL} from 'src/app/utilidades/dominios/estado'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-rol-editar',
  templateUrl: './rol-editar.component.html',
  styleUrls: ['./rol-editar.component.css']
})
export class RolEditarComponent implements OnInit {
  public objRol: Rol;
  public temporal: any;
  public miSuscripcionCrear: Subscription;


  constructor(
    private router: Router,
    private toastrService: ToastrService,
    private rolService: RolService
  ) {
    this.objRol = this.inicializarRol();
    this.miSuscripcionCrear = this.temporal;
  }

  ngOnDestroy(): void {
    if (this.miSuscripcionCrear) {
      this.miSuscripcionCrear.unsubscribe();
    }
  }

  ngOnInit(): void {
  }

  public inicializarRol(): Rol {
    return new Rol(0, '', 0, 0);
  }



}
