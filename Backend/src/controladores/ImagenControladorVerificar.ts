import fs from 'fs';
import Imagen from '../modelos/imagenes';

class ImagenControladorVerificar {

  public static crearImagen (nomPrivado: string, ba64: string){
    const path = './src/recursos/';
    var decodificacion = ba64.replace(/^data:image\/\w+;base64,/, '');
    fs.readdir(path, (err)=>{
      if(err){
        fs.mkdirSync(path,{recursive:true});
      }
      fs.writeFile(path + nomPrivado,decodificacion,{encoding:'base64'},function(){});
    } )
  }

  public static buscarImagen (registro: Imagen): Imagen {
    const path = './src/recursos/';
    const nombrePrivado = registro.nombrePrivadoImagen;

    if(fs.existsSync(path + nombrePrivado)){
       registro.base64 = fs.readFileSync(path + nombrePrivado, 'base64');
    }
    return registro;
  }

  public static generarString (num: number){
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result1= ' ';
    for ( let i = 0; i < num; i++ ) {
        result1 += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result1;
  }
}
export default ImagenControladorVerificar;
