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
exports.vaciaCarrito = exports.deleteCarrito = exports.addCarrito = exports.getCarrito = void 0;
const carrito_1 = require("../models/carrito");
const sequelize_1 = require("sequelize");
const conexion_1 = __importDefault(require("../bd/conexion"));
const getCarrito = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { value } = request.body;
    try {
        /*const lstProductos = await Carrito.findAll({
            where: {
                idUsuario: value
            }
        })*/
        //https://sequelize.org/docs/v6/core-concepts/raw-queries/
        //NOTA: Capitalizar el nombre de las tablas ya que en heroku se crean capitalizadas las tablas
        const lstProductos = yield conexion_1.default.query("SELECT c.idCarrito, c.idUsuario,p.idProducto,p.nombre ,p.imagen,c.cantidad,c.precio FROM Carritos AS c INNER JOIN Productos AS p ON c.idProducto = p.idProducto WHERE c.idUsuario = :idUsuaro", {
            replacements: { idUsuaro: value },
            type: sequelize_1.QueryTypes.SELECT
        });
        response.json(lstProductos);
    }
    catch (error) {
        console.log("ERROR");
        console.log(error);
        response.status(400).json({
            msg: 'Error al obtener el carrito'
        });
    }
});
exports.getCarrito = getCarrito;
const addCarrito = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUsuario, idProducto, precio, cantidad } = request.body;
    console.log(request.body);
    try {
        //Primero identificamos si ya existe el producto en el carrito
        const existente = yield carrito_1.Carrito.findOne({
            where: {
                idUsuario: idUsuario,
                idProducto: idProducto
            }
        });
        //Si existe actualizamos la cantidad
        if (existente) {
            // console.log("SI EXISTE")
            // console.log(existente);
            //existente.getDataValue("cantidad")
            const cantidadActual = existente.getDataValue("cantidad");
            yield carrito_1.Carrito.update({ cantidad: cantidadActual + parseInt(cantidad) }, {
                where: {
                    idUsuario: idUsuario,
                    idProducto: idProducto
                }
            });
        }
        else {
            yield carrito_1.Carrito.create({
                idUsuario: idUsuario,
                idProducto: idProducto,
                precio: precio,
                cantidad: cantidad
            });
        }
        response.json({
            msg: 'El producto se ha agregado correctamente en el carrito'
        });
    }
    catch (error) {
        //console.log("ERROR" + error)
        response.status(400).json({
            msg: 'Error al guardar el producto en el carrito'
        });
    }
});
exports.addCarrito = addCarrito;
const deleteCarrito = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { value, idProducto } = request.body;
    try {
        yield carrito_1.Carrito.destroy({
            where: {
                idUsuario: value,
                idProducto: idProducto
            }
        });
        response.json({
            msg: 'El producto se ha eliminado correctamente de el carrito'
        });
    }
    catch (error) {
        response.status(400).json({
            msg: 'Error al eliminar el producto en el carrito.'
        });
    }
});
exports.deleteCarrito = deleteCarrito;
const vaciaCarrito = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { value } = request.body;
    try {
        yield carrito_1.Carrito.destroy({
            where: {
                idUsuario: value
            }
        });
        response.json({
            msg: 'El carrito se ha vaciado correctamente'
        });
    }
    catch (error) {
        response.status(400).json({
            msg: 'Error al vaciar el carrito.'
        });
    }
});
exports.vaciaCarrito = vaciaCarrito;
