"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
class ImagenControladorVerificar {
    static crearImagen(nomPrivado, ba64) {
        const path = './src/recursos/';
        var decodificacion = ba64.replace(/^data:image\/\w+;base64,/, '');
        fs_1.default.readdir(path, (err) => {
            if (err) {
                fs_1.default.mkdirSync(path, { recursive: true });
            }
            fs_1.default.writeFile(path + nomPrivado, decodificacion, { encoding: 'base64' }, function () { });
        });
    }
    static buscarImagen(registro) {
        const path = './src/recursos/';
        const nombrePrivado = registro.nombrePrivadoImagen;
        if (fs_1.default.existsSync(path + nombrePrivado)) {
            registro.base64 = fs_1.default.readFileSync(path + nombrePrivado, 'base64');
        }
        return registro;
    }
    static generarString(num) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result1 = ' ';
        for (let i = 0; i < num; i++) {
            result1 += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result1;
    }
}
exports.default = ImagenControladorVerificar;
