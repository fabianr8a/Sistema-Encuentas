import {Observer} from 'rxjs';

export const observadorAny: Observer<any> ={
  next(){},

  error(miError){
    console.log(miError);
  },
  complete(){
    console.log('Completo todo');
  }
}
