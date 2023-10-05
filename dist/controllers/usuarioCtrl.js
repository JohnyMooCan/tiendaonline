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
exports.login = exports.getUsuario = exports.addUsuario = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const usuario_1 = require("../models/usuario");
const addUsuario = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log(request.body);
    const { usuario, nombre, apellidos, password } = request.body;
    const existe = yield usuario_1.Usuario.findOne({
        where: {
            usuario: usuario
        }
    });
    if (existe) {
        return response.status(400).json({
            msg: 'El usuario ' + usuario + ' ya existe.'
        });
    }
    console.log("continue flujo");
    const pwd = yield bcrypt_1.default.hash(password, 15);
    //console.log(nombre);
    //console.log(password);
    try {
        yield usuario_1.Usuario.create({
            usuario: usuario,
            nombre: nombre,
            apellidos: apellidos,
            password: pwd
        });
        response.json({
            msg: 'El usuario ' + usuario + ' se ha creado exitosamente.'
        });
    }
    catch (_a) {
        response.status(400).json({
            msg: 'Error al crear usuario'
        });
    }
});
exports.addUsuario = addUsuario;
const getUsuario = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { value } = request.body;
    const usuario = yield usuario_1.Usuario.findOne({
        where: {
            idUsuario: value
        }
    });
    if (!usuario) {
        return response.status(400).json({
            msg: 'El usuario no existe.'
        });
    }
    response.json({
        val_1: usuario.getDataValue('nombre'),
        val_2: usuario.getDataValue('usuario'),
        val_3: usuario.getDataValue('apellidos')
    });
});
exports.getUsuario = getUsuario;
const login = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    //Se recibe el nodo nombre como usuario para confundir a intruzos
    const { nombre, password } = request.body;
    const usuario = yield usuario_1.Usuario.findOne({
        where: {
            usuario: nombre
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
        usuario: usuario
    }, process.env.KEY || 'tiendajohnymoo');
    response.json({
        token: token,
        value: usuario.getDataValue('idUsuario')
    });
});
exports.login = login;
