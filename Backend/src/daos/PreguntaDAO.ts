import { Response } from 'express';
import pool from '../configuracion/conexion/conexionBd';

class PreguntaDAO {
  protected static async crearPregunta( parametros:any, sqlPregunta: string, sqlOpcion: string, parametrosPregunta: any[], res: Response): Promise<any> {
    await pool.task(async (consulta) => {
        const codigoEncuesta = parametros[1]
      parametrosPregunta.map(async (pregunta: any) => {
        const arregloPregunta = [pregunta.codTipoPregunta, codigoEncuesta.codEncuesta, pregunta.descripcionPregunta];
        console.log(arregloPregunta)
        let codigoPregunta = await consulta.one(sqlPregunta, arregloPregunta);
        if (pregunta.codTipoPregunta == 3) {
          pregunta.arregloOpciones.map(async (opcion: any) => {
            const arregloOpciones = [codigoPregunta.codPregunta, opcion.textoOpcion];
            await consulta.none(sqlOpcion, arregloOpciones);
          });
        };
      });
    })
      .then((resultado: any) => {
        res.status(200).json({
          respuesta: "Encuesta creada",
          resultado: resultado.rowCount
        });
      })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({ respuesta: 'Error creando la encuesta' });
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
