"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetalleCompra = exports.Compra = void 0;
const sequelize_1 = require("sequelize");
const conexion_1 = __importDefault(require("../bd/conexion"));
//const { DataTypes } = require('sequelize');
exports.Compra = conexion_1.default.define('Compra', {
    idUsuario: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    total: {
        type: sequelize_1.DataTypes.DOUBLE
    }
});
exports.DetalleCompra = conexion_1.default.define('DetalleCompra', {
    idProducto: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING
    },
    imagen: {
        type: sequelize_1.DataTypes.STRING
    },
    cantidad: {
        type: sequelize_1.DataTypes.INTEGER
    },
    precio: {
        type: sequelize_1.DataTypes.DOUBLE
    }
}, { timestamps: false });
exports.Compra.hasMany(exports.DetalleCompra);
