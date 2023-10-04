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
exports.login = exports.addUsuario = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const usuario_1 = require("../models/usuario");
const addUsuario = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log(request.body);
    const { nombre, password } = request.body;
    const existe = yield usuario_1.Usuario.findOne({
        where: {
            nombre: nombre
        }
    });
    if (existe) {
        return response.status(400).json({
            msg: 'El usuario ' + nombre + ' ya existe.'
        });
    }
    console.log("continue flujo");
    const pwd = yield bcrypt_1.default.hash(password, 15);
    //console.log(nombre);
    //console.log(password);
    try {
        yield usuario_1.Usuario.create({
            nombre: nombre,
            password: pwd
        });
        response.json({
            msg: 'El usuario ' + nombre + ' se ha creado exitosamente.'
        });
    }
    catch (_a) {
        response.status(400).json({
            msg: 'Error al crear usuario'
        });
    }
});
exports.addUsuario = addUsuario;
const login = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, password } = request.body;
    const usuario = yield usuario_1.Usuario.findOne({
        where: {
            nombre: nombre
        }
    });
    if (!usuario) {
        return response.status(400).json({
            msg: 'El usuario no existe.'
        });
    }
    const valido = yield bcrypt_1.default.compare(password, usuario.password);
    if (!valido) {
        return response.status(400).json({
            msg: 'La contraseña es incorrecta'
        });
    }
    //Token para el inicio de sesion
    const token = jsonwebtoken_1.default.sign({
        nombre: nombre
    }, process.env.KEY || 'tiendajohnymoo');
    response.json({
        token: token,
        value: usuario.getDataValue('idUsuario')
    });
});
exports.login = login;
