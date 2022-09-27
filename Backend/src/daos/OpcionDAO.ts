import { Response } from 'express';
import pool from '../configuracion/conexion/conexionBd';

class OpcionDAO {
  protected static async crearLasOpciones(sql: string, parametros: any, res: Response): Promise<any> {
    await pool.result(sql, parametros)
      .then((resultado: any) => {
        res.status(200).json({
          respuesta: "Opciones creadas",
          resultado: resultado.rowCount
        });
      })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({ respuesta: 'Error creando las opciones' });
      });
  }
}

export default OpcionDAO;
