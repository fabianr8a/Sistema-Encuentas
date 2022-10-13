import { ToastrService } from 'ngx-toastr';

export function mostrarMensaje(tipo: string, textoMensaje: string,  alerta: string,  toastr: ToastrService): void {
  const PARAMETROS = {
    closeButton: true,
    enableHtml: true,
    progressBar: true,
    positionClass: 'toast-bottom-right',
    timeOut: 6000,
  };

  switch (tipo) {
    case 'success':
      toastr.success(textoMensaje, alerta, PARAMETROS);
      break;
    case 'info':
      toastr.info(textoMensaje, alerta, PARAMETROS);
      break;
    case 'error':
      toastr.error(textoMensaje, alerta, PARAMETROS);
      break;
    case 'warning':
      toastr.warning(textoMensaje, alerta, PARAMETROS);
      break;
    default:
      toastr.clear(0);
      break;
  }
}
