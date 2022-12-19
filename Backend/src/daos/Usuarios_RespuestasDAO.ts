import { Response } from 'express';
import pool from '../configuracion/conexion/conexionBd';

class UsuariosRespuestasDAO {

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

  protected static async ResponderEncuesta(sqlResponderFecha: string, sqlResponderAbierta: string, sqlResponderOpcion: string, sqlModificarEstado:string, codigoEncuesta:number, parametrosEncuesta: any[], res: Response): Promise<any> {
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
      await consulta.oneOrNone(sqlModificarEstado,codigoEncuesta);
    }).then((resultado: any) => {
      res.status(200).json({
        respuesta: "Encuesta Contestada",
        resultado: resultado
      });
    }).catch((miError: any) => {
      if(miError.code == '23505'){
        res.status(403).json({respuesta: 'la encuesta ya fue respondida por este usuario'});
      }else{
        console.log(miError);
        res.status(400).json({ respuesta: 'Error respondiendo la encuesta' });
      }
    });
  }

  protected static async validarOpcion(sql: string, parametros: any, res: Response): Promise<any> {
    await pool.result(sql, parametros)
      .then((resultado: any) => {
        res.status(200).json(resultado.rows);
      })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({ respuesta: 'Error en la validacion' });
      });
  }
}

export default UsuariosRespuestasDAO;
