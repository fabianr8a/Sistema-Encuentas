import { Router } from 'express';
import accesoControlador from '../controladores/AccesoControlador';


class AccesoRutas {
  public rutaAcceso: Router;

  constructor() {
    this.rutaAcceso = Router();
    this.crearRutas();
  }

  public crearRutas(): void {
    this.rutaAcceso.post('/login', accesoControlador.validarSesion);
    this.rutaAcceso.post('/register', accesoControlador.crearUsuario);
  }
}
const accesoRutas = new AccesoRutas();
export default accesoRutas.rutaAcceso;
