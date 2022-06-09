import pgPromise from 'pg-promise';
import {opcionesPG} from './opcionesConexion';
import variableConexion from '../dominios/varBaseDatos';

const pgp = pgPromise(opcionesPG);
const pool = pgp(variableConexion);

pool.connect()
.then((conn)=>{
 console.log('Conexión lista con', variableConexion.database);
 conn.done();
})
.catch((miErrorcito)=>{
  console.log(miErrorcito);
});

export default pool;
