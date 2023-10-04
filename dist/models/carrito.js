"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Carrito = void 0;
const sequelize_1 = require("sequelize");
const conexion_1 = __importDefault(require("../bd/conexion"));
//const { DataTypes } = require('sequelize');
exports.Carrito = conexion_1.default.define('Carrito', {
    idCarrito: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idUsuario: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    idProducto: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    precio: {
        type: sequelize_1.DataTypes.DOUBLE
    },
    cantidad: {
        type: sequelize_1.DataTypes.INTEGER
    }
});
