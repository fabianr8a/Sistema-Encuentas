import { Response } from 'express';
import pool from '../configuracion/conexion/conexionBd';
import ImagenControlador from '../controladores/ImagenControladorVerificar';

class ImagenDAO{

  protected static async actualizarImagen(sqlCrearIma: string, sqlActualizar: string,
    parametros: any, res: Response): Promise<any> {
      await pool.task(async consulta =>{
        const codUsu = parametros[0];
        const nombre_publico = parametros[1];
        const nombre_privado = parametros[2];
        const tipoImagen = parametros[3];
        const nuevaImagen = await consulta.one(sqlCrearIma, [nombre_publico,nombre_privado,tipoImagen]);
        await consulta.none(sqlActualizar, [nuevaImagen.codImagen, codUsu]);
      })
      .then((resultado: any) => {
        res.status(200).json(resultado);
      })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({ respuesta: 'Error al actualizar la Imagen' });
      });
  }

  protected static async buscarUnaImagen(sqlCodImagen: string,
      sqlBuscarAll: string, parametro: any, res: Response): Promise<any> {
      await pool.task(async consulta =>{
        const tmp = await consulta.one(sqlCodImagen, parametro);
        return await consulta.result(sqlBuscarAll, tmp.codImagen);
      })
      .then((resultado: any) => {
        const arreglo = resultado.rows;
        const imagen = ImagenControlador.buscarImagen(arreglo[0]);
        res.status(200).json(imagen);
      })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({ respuesta: 'Error buscando la Imagen' });
      });
  }
}

export default ImagenDAO;
