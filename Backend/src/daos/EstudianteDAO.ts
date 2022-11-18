import { Response } from 'express';
import pool from '../configuracion/conexion/conexionBd';

class EstudianteDAO {

  protected static async listarLasEncuestas(sql: string, parametros: any, res: Response): Promise<any> {
    await pool.result(sql, parametros)
      .then((resultado: any) => {
        res.status(200).json(resultado.rows);
      })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({ respuesta: 'Error en la consulta de encuestas estudiantes' });
      });
  }

  protected static async ResponderEncuesta(sqlResponderFecha: string, sqlResponderAbierta: string, sqlResponderOpcion: string, parametrosEncuesta: any[], res: Response): Promise<any> {
    await pool.task(async (consulta) => {
      for (const encuesta of parametrosEncuesta) {
        if (encuesta.respuestaAbierta != '') {
          const arregloEncuestaAbierta = [encuesta.codUsuario, encuesta.codPregunta, encuesta.respuestaAbierta];
          await consulta.none(sqlResponderAbierta, arregloEncuestaAbierta);
        }
        if (encuesta.respuestaFecha != '') {
          const arregloEncuestaFecha = [encuesta.codUsuario, encuesta.codPregunta, encuesta.respuestaFecha];
          await consulta.none(sqlResponderFecha, arregloEncuestaFecha);
        }
        if (encuesta.codOpcion != 0) {
          const arregloEncuestasOpcion = [encuesta.codUsuario, encuesta.codPregunta, encuesta.codOpcion];
          await consulta.none(sqlResponderOpcion, arregloEncuestasOpcion);
        }
      }
    }).then((resultado: any) => {
      res.status(200).json({
        respuesta: "Encuesta Contestada",
        resultado: resultado
      });
    }).catch((miError: any) => {
      console.log(miError);
      res.status(400).json({ respuesta: 'Error al responder la encuesta' });
    });
  }
}

export default EstudianteDAO;
