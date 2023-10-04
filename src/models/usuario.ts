import { DataTypes} from 'sequelize'
import sequelize from "../bd/conexion";
//const { DataTypes } = require('sequelize');

export const Usuario = sequelize.define('Usuario',{
    idUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
})