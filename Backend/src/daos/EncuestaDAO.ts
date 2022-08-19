import { Response } from 'express';
import pool from '../configuracion/conexion/conexionBd';

class EncuestaDAO {

  protected static async listarLasEncuestas(sql: string, parametros: any, res: Response): Promise<any> {
    await pool.result(sql, parametros)
      .then((resultado: any) => {
        res.status(200).json(resultado.rows);
      })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({ respuesta: 'Error en la consulta de encuestas' });
      });
  }

  protected static async listarLosEventos(sql: string, parametros: any, res: Response): Promise<any> {
    await pool.result(sql, parametros)
      .then((resultado: any) => {
        res.status(200).json(resultado.rows);
      })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({ respuesta: 'Error en la consulta de eventos' });
      });
  }

  protected static async listarLasTipoPreguntas(sql: string, parametros: any, res: Response): Promise<any> {
    await pool.result(sql, parametros)
      .then((resultado: any) => {
        res.status(200).json(resultado.rows);
      })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({ respuesta: 'Error en la consulta de tipo preguntas' });
      });
  }

  protected static async listarLasDependencias(sql: string, parametros: any, res: Response): Promise<any> {
    await pool.result(sql, parametros)
      .then((resultado: any) => {
        res.status(200).json(resultado.rows);
      })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({ respuesta: 'Error en la consulta de dependencias' });
      });
  }

  protected static async listarLosTiposDependencia(sql: string, parametros: any, res: Response): Promise<any> {
    await pool.result(sql, parametros)
      .then((resultado: any) => {
        res.status(200).json(resultado.rows);
      })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({ respuesta: 'Error listando el tipo dependencia' });
      });
  }

  protected static async crearEncuesta(sqlCrear: string, sqlPregunta:string, parametros: any, res: Response): Promise<any> {
    await pool.task(async(consulta)=>{
      const codigoEncuesta=await consulta.one(sqlCrear, parametros);
      const arregloPregunta=[parametros[7],codigoEncuesta.codEncuesta,parametros[6]];
      return await consulta.result(sqlPregunta, arregloPregunta);
    })
      .then((resultado: any) => {
        res.status(200).json({respuesta: "Encuesta creada",
        resultado: resultado.rowCount});
      })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({ respuesta: 'Error creando la encuesta' });
      });
  }

  protected static async crearLasPreguntas(sql: string, parametros: any, res: Response): Promise<any> {
    await pool.result(sql, parametros)
      .then((resultado: any) => {
        res.status(200).json({respuesta: "Pregunta creada",
        resultado: resultado.rowCount});
      })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({ respuesta: 'Error creando las preguntas' });
      });
  }
}
export default EncuestaDAO;
