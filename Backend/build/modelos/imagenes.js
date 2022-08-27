"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Imagen {
    constructor(cod, nomPub, nomPri, tip, ba64) {
        this.codImagen = cod;
        this.nombrePublicoImagen = nomPub;
        this.nombrePrivadoImagen = nomPri;
        this.tipoImagen = tip;
        this.base64 = ba64;
    }
}
exports.default = Imagen;
