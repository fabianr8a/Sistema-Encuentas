import { Response } from 'express';
import pool from '../configuracion/conexion/conexionBd';

class UsuarioDAO {

  protected static async obtenerTodosUsu(sql: string, parametros: any, res: Response): Promise<any> {
    await pool.result(sql, parametros)
      .then((resultado: any) => {
        res.status(200).json(resultado.rows);
      })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({ respuesta: 'Error en la consulta Usuario' });
      });
  }
  protected static async buscarUsuario(sql: string, parametros: any, res: Response): Promise<any> {
    await pool.result(sql, parametros)
      .then((resultado: any) => {
        res.status(200).json(resultado.rows);
      })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({ respuesta: 'Error buscando el Usuario' });
      });
  }

  protected static async crearUsuario(sqlExiste: string,
    sqlCrearUsu: string,
    sqlAgreAcceso: string,
    sqlTodoListo: string,
    parametros: any,
    res: Response): Promise<any> {

    await pool.task(async consulta =>{
      const correooo = parametros[6];
      const correo = await consulta.one(sqlExiste, correooo);

      if (correo.existe == 0) {
        const codigoRol = parametros[0];
        const documento = parametros[1];
        const tipoDocumento = parametros[2];
        const nombres = parametros[3];
        const apellidos = parametros[4];
        const telefono = parametros[5];
        const nuevoUsuario = await consulta.one(sqlCrearUsu, [codigoRol, documento, tipoDocumento, nombres, apellidos, telefono]);
        const clavecita = parametros[7];
        await consulta.none(sqlAgreAcceso, [nuevoUsuario.codUsuario, correooo, clavecita]);
        return await consulta.result(sqlTodoListo, [nuevoUsuario.codUsuario]);
      } else {
        return await consulta.result(sqlTodoListo, [-1]);
      }
    })
      .then((resultado: any) => {
        res.status(200).json({respuesta: "Usuario creado",
        resultado: resultado.rowCount});
      })
      .catch((miError: any) => {

        if(miError.code == '23505'){
          res.status(403).json({respuesta: 'el documento ya existe'});
        }else{
          console.log(miError);
          res.status(400).json({ respuesta: 'Error al crear el Usuario' });
        }
      });
  }

  protected static async buscarUnUsuario(sqlBuscar: string, parametro: any, res: Response): Promise<any> {
    await pool.oneOrNone(sqlBuscar, parametro)
      .then((resultado: any) => {
        if(!resultado){ res.status(400).json({ respuesta: 'Error buscando el Usuario' });}
        res.status(200).json(resultado);
      })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({ respuesta: 'Error buscando el Usuario' });
      });
  }


  protected static async actualizarUsuario(sqlBuscar: string, parametros: any, res: Response): Promise<any> {
    await pool.oneOrNone(sqlBuscar, parametros)
      .then((resultado: any) => {
        res.status(200).json(resultado);
      })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({ respuesta: 'Error al actualizar el Usuario' });
      });
  }



}
export default UsuarioDAO;
