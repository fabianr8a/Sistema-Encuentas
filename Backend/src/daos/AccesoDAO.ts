import jwt from 'jsonwebtoken';
import { Response } from 'express';
import pool from '../configuracion/conexion/conexionBd';
import { nanoid } from 'nanoid';

class AccesoDAO {

  protected static async iniciarSesion(sql: string, parametros: any, res: Response): Promise<any> {
    await pool.task(async consulta => {
      const fila = await consulta.result(sql, parametros);
      return fila;
    }).then((fila) => {
      const arreglo = fila.rows;
      if (arreglo.length == 0) {
        res.status(400).json({ msg: 'Usuario no encontrado' });
      } else {
        const miTokencito = jwt.sign({ datos:arreglo, alg: 'HS256', typ: 'JWT' }, 'LaClaveSuperSecreta');
        res.status(200).json({ tokenFullStack: miTokencito,nombreRol:arreglo[0].nombreRol});
        console.log(fila)
      }
    })
      .catch((miError) => {
        console.log(miError);
        res.status(400).json({ msg: 'Error en la consulta' });
      });
  }

  protected static async crearElUsuario(sqlExiste: string,
    sqlAgreUsu: string,
    sqlAgreAcceso: string,
    sqlAgreIngreso: string,
    sqlTodoListo: string,
    parametros: any,
    res: Response): Promise<any> {

    await pool.task(async consulta => {
      const correito = parametros[0];
      const correo = await consulta.one(sqlExiste, correito);
      //console.log(cantidadCorreos);

      if (correo.existe == 0) {
        const nombres = parametros[1];
        const apellidos = parametros[2];
        const documento = parametros[3];
        const nuevoUsuario = await consulta.one(sqlAgreUsu, [documento, nombres, apellidos]);
        const clavecita = parametros[4];
        await consulta.none(sqlAgreAcceso, [nuevoUsuario.codUsuario, correito, clavecita]);
        await consulta.none(sqlAgreIngreso, [nuevoUsuario.codUsuario]);
        console.log(nuevoUsuario)
        return await consulta.result(sqlTodoListo, [nuevoUsuario.codUsuario]);
      } else {
        return await consulta.result(sqlTodoListo, [-1]);
      }
    })

      .then(resultado => {
        const arreglo = resultado.rows;
        const codUsuarioNuevo = arreglo[0].codUsuario;
        const rolUsuarioNuevo = arreglo[0].nombreRol;
        const correoUsuarioNuevo = arreglo[0].correoAcceso;

        if (arreglo.length > 0) {
          const miTokencito = jwt.sign({
            codUsuario: codUsuarioNuevo,
            nombreRol: rolUsuarioNuevo,
            correoAcceso: correoUsuarioNuevo
          },
            'LaClaveSuperSecreta');
          res.status(200).json({ token: miTokencito});
        } else {
          res.status(400).json({ mensaje: 'No funciona' });
        }
      })
      .catch((miError) => {
        console.log(miError);
        res.status(400).json({ msg: 'Error en la creación del usuario' });
      });
  }


}
export default AccesoDAO;
