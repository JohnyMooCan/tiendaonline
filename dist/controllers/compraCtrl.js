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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompras = exports.addCompra = void 0;
const compra_1 = require("../models/compra");
const { Op } = require("sequelize");
const addCompra = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { value, total, carrito } = request.body;
    console.log(request.body);
    try {
        //Importante colocar el nombre de la asociasion capitalizado
        yield compra_1.Compra.create({
            idUsuario: value,
            total: total,
            DetalleCompras: carrito
        }, {
            include: [compra_1.DetalleCompra]
        });
        response.json({
            msg: 'La compra se ha realizado exitosamente.'
        });
    }
    catch (error) {
        console.log("ERROR" + error);
        response.status(400).json({
            msg: 'Error al generar la compra, favor de intentar mas tarde.'
        });
    }
});
exports.addCompra = addCompra;
const getCompras = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { value } = request.body;
    const lstCompra = yield compra_1.Compra.findAll({
        where: {
            idUsuario: value
        },
        order: [
            ['createdAt', 'DESC']
        ],
        include: [compra_1.DetalleCompra]
    });
    response.json(lstCompra);
});
exports.getCompras = getCompras;
