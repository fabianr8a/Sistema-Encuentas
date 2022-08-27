import { Request, Response } from 'express';
import ImagenDAO from '../daos/ImagenDAO';
import { SQL_IMA } from '../repositorios/Imagenes_sql';
import ImagenControladorVerificar from './ImagenControladorVerificar';
import { nanoid } from 'nanoid'

class ImagenControlador extends ImagenDAO{

  public buscarUnaImagen(req: Request, res: Response) {
    const codUsu = req.params.codUsuario;
    const losParametros = [codUsu];
    ImagenControlador.buscarUnaImagen(
      SQL_IMA.BUSCAR_COD_IMAGEN,
      SQL_IMA.BUSCAR_IMAGEN,
      losParametros, res);
  }

  public actualizarImagen(req: Request, res: Response) {
    const codUsu = req.params.codUsuario;
    const sing = '_IMA';
    const stringAle = nanoid(5);
    const nombrePrivado = codUsu + sing + stringAle + '.' + req.body.tipoImagen.split('/')[1];
    ImagenControladorVerificar.crearImagen(nombrePrivado, req.body.base64);
    const misParametros = [
      codUsu,
      req.body.nombrepublicoImagen,
      nombrePrivado,
      req.body.tipoImagen,
    ];
      ImagenControlador.actualizarImagen(SQL_IMA.CREAR_IMAGEN,
        SQL_IMA.MODIFICAR_USUARIO_IMAGEN,
      misParametros, res);
  }

}

const imagenControlador = new ImagenControlador();
export default imagenControlador;
