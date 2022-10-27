"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Pregunta {
    constructor(codPregunta, codTipoPregunta, descripcionPregunta, codEncuesta, arregloOpciones) {
        this.codPregunta = codPregunta;
        this.codTipoPregunta = codTipoPregunta;
        this.descripcionPregunta = descripcionPregunta;
        this.codEncuesta = codEncuesta;
        this.arregloOpciones = arregloOpciones;
    }
}
exports.default = Pregunta;
