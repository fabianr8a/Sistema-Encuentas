import { Opcion } from './../modelos/Opcion';
import { Response } from 'express';
import pool from '../configuracion/conexion/conexionBd';
import Pregunta from '../modelos/Pregunta';

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

  protected static async crearEncuesta(sqlCrear: string, sqlPregunta: string, sqlOpcion: string, sqlUsuarioEncuesta: string, parametros: any, parametrosPregunta: Pregunta[], res: Response): Promise<any> {
    await pool.task(async (consulta) => {
      const codigoEncuesta = await consulta.one(sqlCrear, parametros);
      for (const preguntica of parametrosPregunta) {
        const arregloPregunta = [preguntica.codTipoPregunta, codigoEncuesta.codEncuesta, preguntica.descripcionPregunta];
        let codigoPregunta = await consulta.one(sqlPregunta, arregloPregunta);
        if (Number(preguntica.codTipoPregunta) === 3) {
          await this.guardarOpciones(sqlOpcion, preguntica.arregloOpciones, codigoPregunta.codPregunta);
        } else {
          let opcion = [codigoPregunta.codPregunta, " Default"];
          await consulta.none(sqlOpcion, opcion);
        }
      }
      const arregloUsuarioEncuestas = [parametros[6], codigoEncuesta.codEncuesta];
      return await consulta.result(sqlUsuarioEncuesta, arregloUsuarioEncuestas);
    }).then((resultado: any) => {
      res.status(200).json({
        respuesta: "Encuesta creada",
        resultado: resultado
      });
    }).catch((miError: any) => {
      console.log(miError);
      res.status(400).json({ respuesta: 'Error creando la encuesta' });
    });
  }

  //encuesta que se va a modificar
  protected static async seleccionEncuestaModificar(sqlBuscar: string, parametros: any, res: Response): Promise<any> {
    await pool.oneOrNone(sqlBuscar, parametros)
      .then((resultado: any) => {
        if (!resultado) { res.status(400).json({ respuesta: 'Error seleccionando la encuesta a modificar' }); }
        res.status(200).json(resultado);
      })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({ respuesta: 'Error seleccionando la encuesta a modificar' });
      });
  }

  //modificar la encuesta seleccionada
  protected static async modificarLaEncuesta(sqlModificar: string, parametros: any, res: Response): Promise<any> {
    await pool.task(async (consulta: any) => {
      return await consulta.result(sqlModificar, parametros);
    })
      .then(() => {
        res.status(200).json({
          respuesta: "Encuesta modificada",
        });
      })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({ respuesta: 'Error modificando la encuesta' });
      });
  }

  private static async guardarOpciones(sqlOpciones: string, arregloOpciones: Opcion[], codPregunta: number) {
    await pool.task(async (consulta) => {
      for (const objOpcion of arregloOpciones) {
        let opcion = [codPregunta, objOpcion.textoOpcion];
        await consulta.none(sqlOpciones, opcion);
      }
    }
  );
  }
}
export default EncuestaDAO;
