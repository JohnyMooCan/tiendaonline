import { DataTypes} from 'sequelize'
import sequelize from "../bd/conexion";
//const { DataTypes } = require('sequelize');

export const Compra = sequelize.define('Compra',{

    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false
     },
     total: {
        type: DataTypes.DOUBLE
     }
})

export const DetalleCompra = sequelize.define('DetalleCompra',{
    idProducto: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING
    },
    imagen: {
        type: DataTypes.STRING
    },
    cantidad: {
        type: DataTypes.INTEGER
    },
    precio: {
        type: DataTypes.DOUBLE
    }
}, { timestamps: false })

Compra.hasMany(DetalleCompra);