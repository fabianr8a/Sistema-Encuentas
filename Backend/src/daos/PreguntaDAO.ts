import { Response } from 'express';
import pool from '../configuracion/conexion/conexionBd';

class PreguntaDAO {
  protected static async crearLasPreguntas(sql: string, parametros: any, res: Response): Promise<any> {
    await pool.result(sql, parametros)
      .then((resultado: any) => {
        res.status(200).json({
          respuesta: "Pregunta creada",
          resultado: resultado.rowCount
        });
      })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({ respuesta: 'Error creando las preguntas' });
      });
  }

  protected static async seleccionarPregunta(sqlPregunta: string, parametros: any, res: Response): Promise<any> {
    await pool.result(sqlPregunta, parametros)
      .then((resultado: any) => {
        if (!resultado) { res.status(400).json({ respuesta: 'Error seleccionando la pregunta a modificar' }); }
        res.status(200).json(resultado.rows);
        console.log(resultado)
      })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({ respuesta: 'Error seleccionando la pregunta a modificar' });
      });
  }

  protected static async modificarPregunta(sqlModificar: string, parametros: any, res: Response): Promise<any> {
    await pool.task(async (consulta: any) => {
      return await consulta.result(sqlModificar, parametros);
    })
      .then(() => {
        res.status(200).json({
          respuesta: "Pregunta modificada",
        });
      })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({ respuesta: 'Error modificando la pregunta' });
      });
  }
}

export default PreguntaDAO;
