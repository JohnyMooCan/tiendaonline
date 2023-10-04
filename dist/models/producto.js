"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Producto = void 0;
const sequelize_1 = require("sequelize");
const conexion_1 = __importDefault(require("../bd/conexion"));
//const { DataTypes } = require('sequelize');
exports.Producto = conexion_1.default.define('Producto', {
    idProducto: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING
    },
    precio: {
        type: sequelize_1.DataTypes.DOUBLE
    },
    imagen: {
        type: sequelize_1.DataTypes.STRING
    }
});
