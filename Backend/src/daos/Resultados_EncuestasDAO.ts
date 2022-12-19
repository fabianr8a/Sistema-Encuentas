import { Response } from 'express';
import pool from '../configuracion/conexion/conexionBd';

class ResultadosEncuestasDAO {

  protected static async listarRespuestas(sql: string, parametros: any, res: Response): Promise<any> {
    await pool.result(sql, parametros)
      .then((resultado: any) => {
        res.status(200).json(resultado.rows);
      })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({ respuesta: 'Error listando las respuestas' });
      });
  }

  protected static async listarRespuestasUnicas(sqlRepUnicas: string, parametros: any, res: Response): Promise<any> {
    await pool.result(sqlRepUnicas, parametros)
      .then((resultado: any) => {
        res.status(200).json(resultado.rows);
      })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({ respuesta: 'Error listando las respuestas unicas' });
      });
  }
}
export default ResultadosEncuestasDAO;