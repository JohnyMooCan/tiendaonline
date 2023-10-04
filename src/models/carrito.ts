import { DataTypes} from 'sequelize'
import sequelize from "../bd/conexion";
//const { DataTypes } = require('sequelize');

export const Carrito = sequelize.define('Carrito',{
    idCarrito: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idProducto: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precio: {
        type: DataTypes.DOUBLE
    },
    cantidad: {
        type: DataTypes.INTEGER
    }
})