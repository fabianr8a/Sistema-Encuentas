"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const servidor_1 = __importDefault(require("./configuracion/api/servidor"));
const elServidorArriba = new servidor_1.default();
console.clear();
elServidorArriba.arrancar();
