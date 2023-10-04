import { DataTypes} from 'sequelize'
import sequelize from "../bd/conexion";
//const { DataTypes } = require('sequelize');

export const Producto = sequelize.define('Producto',{
    idProducto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    descripcion: {
        type: DataTypes.STRING
    },
    precio: {
        type: DataTypes.DOUBLE
    },
    imagen:{
        type: DataTypes.STRING
    }
})