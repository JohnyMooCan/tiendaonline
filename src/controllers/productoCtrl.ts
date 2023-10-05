import { Request, Response } from "express"
import { Producto } from "../models/producto";
const { Op } = require("sequelize");

export const getProductos = async ( request: Request,response:  Response) => {

    const { busqueda } = request.body;
    const like = {
        where: {
            nombre: {
                [Op.like]: '%'+busqueda+'%'
              }
      
        }
    }
    const lstProductos = await Producto.findAll((busqueda && busqueda != undefined) ? like : {});
    response.json(lstProductos);
}

export const getProducto = async ( request: Request,response:  Response) => {
    try{
    const { busqueda } = request.body;
    const where = {
        where: {
            idProducto: busqueda
        }
    }
        const producto = await Producto.findAll((busqueda && busqueda != undefined) ? where : {});
        response.json(producto);
    }
    catch(error){
        response.status(400).json({
            msg: 'Error al obtener información del producto'
        });

    }
}