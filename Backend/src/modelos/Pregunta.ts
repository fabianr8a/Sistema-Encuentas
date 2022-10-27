import { Opcion } from './Opcion';
class Pregunta {
    public codPregunta: number;
    public codTipoPregunta: number;
    public descripcionPregunta: any;
    public codEncuesta: number;
    public arregloOpciones: Opcion[];


    constructor(
        codPregunta: number,
        codTipoPregunta: number,
        descripcionPregunta: any,
        codEncuesta: number,
        arregloOpciones: Opcion[]
    ) {
        this.codPregunta = codPregunta;
        this.codTipoPregunta = codTipoPregunta;
        this.descripcionPregunta = descripcionPregunta;
        this.codEncuesta = codEncuesta;
        this.arregloOpciones = arregloOpciones;
    }
}

export default Pregunta;
