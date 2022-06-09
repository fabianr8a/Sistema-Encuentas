import pgPromise from 'pg-promise';
import {camelizeColumns, IClient} from './funcionesConexion';

export const opcionesPG: pgPromise.IInitOptions<IClient> = {
  receive(data, result, e) {
    // console.log('result: ', result);
    // console.log('event: ', e);
    camelizeColumns(data);
  }
};
