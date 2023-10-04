import { Request, Response } from "express"
import { Compra, DetalleCompra } from "../models/compra";

const { Op } = require("sequelize");

export const addCompra = async (request: Request,response:  Response ) => {

 const { value, total, carrito } = request.body;

 console.log(request.body)
 try{
        //Importante colocar el nombre de la asociasion capitalizado
      await Compra.create({
        idUsuario: value,
        total: total,
        DetalleCompras: carrito
        }, {
        include: [ DetalleCompra]
      });


   
    response.json({
    msg: 'La compra se ha realizado exitosamente.'

    });

 }catch(error){

    console.log("ERROR" + error)
    response.status(400).json({
        msg: 'Error al generar la compra, favor de intentar mas tarde.'
    });
 }
}

export const getCompras = async ( request: Request,response:  Response) => {

    const { value } = request.body

    const lstCompra = await Compra.findAll({
        where: {
            idUsuario: value
        },
        order: [
            ['createdAt', 'DESC']
        ],
        include: [DetalleCompra]
    });
    response.json(lstCompra);
}