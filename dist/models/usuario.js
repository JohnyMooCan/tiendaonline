"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const sequelize_1 = require("sequelize");
const conexion_1 = __importDefault(require("../bd/conexion"));
//const { DataTypes } = require('sequelize');
exports.Usuario = conexion_1.default.define('Usuario', {
    idUsuario: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    usuario: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
    },
    apellidos: {
        type: sequelize_1.DataTypes.STRING
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
});
