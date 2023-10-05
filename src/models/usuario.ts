import { DataTypes} from 'sequelize'
import sequelize from "../bd/conexion";
//const { DataTypes } = require('sequelize');

export const Usuario = sequelize.define('Usuario',{
    idUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    usuario: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
    },
    apellidos: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
})