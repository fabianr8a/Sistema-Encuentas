import { Response } from 'express';
import pool from '../configuracion/conexion/conexionBd';
import Pregunta from '../modelos/Pregunta';
import { Opcion } from './../modelos/Opcion';

class PreguntaDAO {
  protected static async crearPregunta( sqlPregunta: string, sqlOpcion: string,  parametrosPregunta: Pregunta[], res: Response): Promise<any> {
    await pool.task(async (consulta) => {
      for (const preguntica of parametrosPregunta) {
        const arregloPregunta = [preguntica.codTipoPregunta, preguntica.codEncuesta,preguntica.descripcionPregunta];
        let codigoPregunta = await consulta.one(sqlPregunta, arregloPregunta);
        if (Number(preguntica.codTipoPregunta) === 3) {
          await this.guardarOpciones(sqlOpcion, preguntica.arregloOpciones, codigoPregunta.codPregunta);
        } else {
          let opcion = [codigoPregunta.codPregunta, " Default"];
          await consulta.none(sqlOpcion, opcion);
        }
      }
    }).then((resultado: any) => {
      res.status(200).json({
        respuesta: "Preguntas creadas",
        resultado: resultado
      });
    }).catch((miError: any) => {
      console.log(miError);
      res.status(400).json({ respuesta: 'Error creando las preguntas' });
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

  protected static async listarPregunta(sqlPregunta: string, parametros: any, res: Response): Promise<any> {
    await pool.result(sqlPregunta, parametros)
      .then((resultado: any) => {
        if (!resultado) { res.status(400).json({ respuesta: 'Error listando las preguntas' }); }
        res.status(200).json(resultado.rows);
      })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({ respuesta: 'Error listando las preguntas' });
      });
  }

  protected static async seleccionarPregunta(sqlSeleccionar: string, parametros: any, res: Response): Promise<any> {
    await pool.oneOrNone(sqlSeleccionar, parametros)
      .then((resultado: any) => {
        if(!resultado){ res.status(400).json({ respuesta: 'Error seleccionando la pregunta' });}
        res.status(200).json(resultado);
      })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({ respuesta: 'Error seleccionando la pregunta' });
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

  protected static async eliminarPregunta(sqlEliminar: string, parametros: any, res: Response): Promise<any> {
    await pool.result(sqlEliminar, parametros)
      .then((resultado: any) => {
        res.status(200).json({respuesta: "Pregunta eliminada",
        resultado: resultado.rowCount});
      })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({ respuesta: 'Error eliminando pregunta' });
      });
  }
}

export default PreguntaDAO;
