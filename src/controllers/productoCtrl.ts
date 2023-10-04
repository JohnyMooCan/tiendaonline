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