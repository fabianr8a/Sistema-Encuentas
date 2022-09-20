import cors from 'cors';
import morgan from 'morgan';
import express from 'express';

import rutaAcceso from '../../rutas/AccesoRutas';
import miRutaRol from '../../rutas/RolRutas';
import miRutaUsuario from '../../rutas/UsuarioRutas';
import miRutaEncuesta from '../../rutas/EncuestaRutas';
import miRutaEstudiante from '../../rutas/EstudiantesRutas';


class Servidor {

  public app: express.Application;

  constructor() {
    this.app = express();
    this.cargarConfiguracion();
    this.cargarRutas();
  }

  public cargarConfiguracion(): void {
    this.app.set('PORT', 3210);
    this.app.use(cors());
    this.app.use(morgan('dev'));
    this.app.use(express.json({ limit: '50mb' }));
    this.app.use(express.urlencoded({ extended: true }));
  }

  public cargarRutas(): void {
    // Rutas públicas
    this.app.use('/api/public/access', rutaAcceso);

    // Rutas privadas
    this.app.use('/api/private/rol', miRutaRol);
    this.app.use('/api/private/usuario', miRutaUsuario);
    this.app.use('/api/private/encuesta', miRutaEncuesta);
    this.app.use('/api/private/estudiante', miRutaEstudiante);
  }

  //Arrancar el servidor
  public arrancar(): void {
    this.app.listen(this.app.get('PORT'), () => {
      console.log('YA FUNCIONA EL BACK', this.app.get('PORT'));
    });
  }

}
export default Servidor;
