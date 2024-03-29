"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const AccesoRutas_1 = __importDefault(require("../../rutas/AccesoRutas"));
const RolRutas_1 = __importDefault(require("../../rutas/RolRutas"));
const UsuarioRutas_1 = __importDefault(require("../../rutas/UsuarioRutas"));
const EncuestaRutas_1 = __importDefault(require("../../rutas/EncuestaRutas"));
const EstudiantesRutas_1 = __importDefault(require("../../rutas/EstudiantesRutas"));
const PreguntaRutas_1 = __importDefault(require("../../rutas/PreguntaRutas"));
const OpcionesRutas_1 = __importDefault(require("../../rutas/OpcionesRutas"));
const ResultadosEncuestaRutas_1 = __importDefault(require("../../rutas/ResultadosEncuestaRutas"));
class Servidor {
    constructor() {
        this.app = (0, express_1.default)();
        this.cargarConfiguracion();
        this.cargarRutas();
    }
    cargarConfiguracion() {
        this.app.set('PORT', 3210);
        this.app.use((0, cors_1.default)());
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use(express_1.default.json({ limit: '50mb' }));
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    cargarRutas() {
        // Rutas públicas
        this.app.use('/api/public/access', AccesoRutas_1.default);
        // Rutas privadas
        this.app.use('/api/private/rol', RolRutas_1.default);
        this.app.use('/api/private/usuario', UsuarioRutas_1.default);
        this.app.use('/api/private/encuesta', EncuestaRutas_1.default);
        this.app.use('/api/private/estudiante', EstudiantesRutas_1.default);
        this.app.use('/api/private/pregunta', PreguntaRutas_1.default);
        this.app.use('/api/private/opciones', OpcionesRutas_1.default);
        this.app.use('/api/private/resultados', ResultadosEncuestaRutas_1.default);
    }
    //Arrancar el servidor
    arrancar() {
        this.app.listen(this.app.get('PORT'), () => {
            console.log('YA FUNCIONA EL BACK', this.app.get('PORT'));
        });
    }
}
exports.default = Servidor;
