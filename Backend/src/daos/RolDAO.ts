import { Response } from 'express';
import pool from '../configuracion/conexion/conexionBd';

class RolDAO {

  protected static async obtenerTodos(sql: string, parametros: any, res: Response): Promise<any> {
    await pool.result(sql, parametros)
      .then((resultado: any) => {
        res.status(200).json(resultado.rows);
      })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({ respuesta: 'Error en la consulta rol' });
      });
  }

  protected static async buscarRol(sql: string, parametros: any, res: Response): Promise<any> {
    await pool.result(sql, parametros)
      .then((resultado: any) => {
        res.status(200).json(resultado.rows);
      })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({ respuesta: 'Error buscando rol' });
      });
  }




  protected static async eliminarRol(sqlEliminar: string, parametros: any, res: Response): Promise<any> {
    await pool.result(sqlEliminar, parametros)
      .then((resultado: any) => {
        res.status(200).json({respuesta: "Rol eliminado",
        resultado: resultado.rowCount});
      })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({ respuesta: 'Error eliminando rol' });
      });
  }

  protected static async crearRol(sqlCrear: string, parametros: any, res: Response): Promise<any> {
    await pool.result(sqlCrear, parametros)
      .then((resultado: any) => {
        res.status(200).json({respuesta: "Rol creado",
        resultado: resultado.rowCount});
      })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({ respuesta: 'Error creando el rol' });
      });
  }



}
export default RolDAO;
