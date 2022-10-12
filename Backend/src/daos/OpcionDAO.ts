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

  protected static async listarOpcion(sqlOpciones: string, parametros: any, res: Response): Promise<any> {
    await pool.result(sqlOpciones, parametros)
      .then((resultado: any) => {
        if (!resultado) { res.status(400).json({ respuesta: 'Error listando las opciones' }); }
        res.status(200).json(resultado.rows);
        console.log(resultado)
      })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({ respuesta: 'Error listando las opciones' });
      });
  }

  protected static async eliminarOpcion(sqlEliminar: string, parametros: any, res: Response): Promise<any> {
    await pool.result(sqlEliminar, parametros)
      .then((resultado: any) => {
        res.status(200).json({respuesta: "Opcion eliminada",
        resultado: resultado.rowCount});
      })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({ respuesta: 'Error eliminando opcion' });
      });
  }

  protected static async seleccionarOpcion(sqlSeleccionar: string, parametros: any, res: Response): Promise<any> {
    await pool.oneOrNone(sqlSeleccionar, parametros)
      .then((resultado: any) => {
        if(!resultado){ res.status(400).json({ respuesta: 'Error seleccionando la opcion' });}
        res.status(200).json(resultado);
      })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({ respuesta: 'Error seleccionando la opcion' });
      });
  }

  protected static async modificarOpcion(sqlModificar: string, parametros: any, res: Response): Promise<any> {
    await pool.task(async(consulta:any)=>{
      return await consulta.result(sqlModificar,parametros);
    })
      .then(() => {
        res.status(200).json({respuesta: "Opcion modificada",
        });
      })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({ respuesta: 'Error modificando la opcion' });
      });
  }
}

export default OpcionDAO;
