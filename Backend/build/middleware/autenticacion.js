"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.secretaria = exports.administrador = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let rol;
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers['autorizacion'];
    if (!authHeader)
        return res.status(403).json({ respuesta: "No tiene un token valido" });
    const token = authHeader && authHeader.split(' ')[1];
    try {
        jsonwebtoken_1.default.verify(token, 'laClaveSuperSecreta');
        const decoded = jsonwebtoken_1.default.decode(token);
        rol = decoded.nombreRol;
        next();
    }
    catch (error) {
        return res.status(401).json({ respuesta: "No autorizado" });
    }
});
exports.verifyToken = verifyToken;
const administrador = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (rol === 'Administrador') {
            next();
        }
        else
            return res.status(403).json({ respuesta: "No es Administrador" });
    }
    catch (error) {
        return res.status(500).json({ respuesta: "Error en la peticion" });
    }
});
exports.administrador = administrador;
const secretaria = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (rol === 'Secretaria') {
            next();
        }
        else
            return res.status(403).json({ respuesta: "No es Secretaria" });
    }
    catch (error) {
        return res.status(500).json({ respuesta: "Error en la peticion" });
    }
});
exports.secretaria = secretaria;
