import { Usuarios } from '../../../../../modelos/usuarios';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usu-crear',
  templateUrl: './usu-crear.component.html',
  styleUrls: ['./usu-crear.component.css'],
})
export class UsuCrearComponent implements OnInit {
  public tmpBase64: any;
  public objUsuario: Usuarios;

  constructor(
    public toastrService: ToastrService
  ) {
    this.objUsuario = this.inicializarUsuario();
  }

  ngOnInit(): void {}

  //Métodos obligatorios
  // ****************/
  public inicializarUsuario(): Usuarios {
    return new Usuarios(0, '','','','','','',0,'','',0,0);
  }

  public seleccionarFoto(input: any): any {
    if (!input.target.files[0] || input.target.files[0].length === 0) {
      return;
    }
    const mimeType = input.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      const parametros = {
        closeButton: true,
        enableHtml: true,
        progressBar: true,
        positionClass: 'toast-top-right',
        timeOut: 8000,
      };
      this.toastrService.error(
        'Solo se permiten <strong>imágenes</strong>',
        'Advertencia',
        parametros
      );
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(input.target.files[0]);
    reader.onload = () => {
      this.tmpBase64 = reader.result;
    };
  }

  //Lógica del negocio
}
