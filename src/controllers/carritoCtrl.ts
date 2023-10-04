import { Request, Response } from "express"
import { Carrito } from "../models/carrito";
import { QueryTypes} from 'sequelize'
import sequelize from "../bd/conexion";

export const getCarrito = async (request: Request,response:  Response ) => {
    const { value } = request.body


    try{
        /*const lstProductos = await Carrito.findAll({
            where: {
                idUsuario: value
            }
        })*/
        //https://sequelize.org/docs/v6/core-concepts/raw-queries/
        //NOTA: Capitalizar el nombre de las tablas ya que en heroku se crean capitalizadas las tablas
        const lstProductos = await sequelize.query("SELECT c.idCarrito, c.idUsuario,p.idProducto,p.nombre ,p.imagen,c.cantidad,c.precio FROM Carritos AS c INNER JOIN Productos AS p ON c.idProducto = p.idProducto WHERE c.idUsuario = :idUsuaro",
        {
            replacements: { idUsuaro: value },
            type: QueryTypes.SELECT
          });
        
        response.json(lstProductos);
    }
    catch(error){
        console.log("ERROR");
        console.log(error)

        response.status(400).json({
            msg: 'Error al obtener el carrito'
        });
    }
}

export const addCarrito = async (request: Request,response:  Response ) => {

 const { idUsuario, idProducto, precio, cantidad} = request.body;
 console.log(request.body)

 try{
    //Primero identificamos si ya existe el producto en el carrito
    const existente = await Carrito.findOne({
        where: {
            idUsuario: idUsuario,
            idProducto: idProducto
        }
    })
    //Si existe actualizamos la cantidad
    if(existente){
       // console.log("SI EXISTE")
       // console.log(existente);
       //existente.getDataValue("cantidad")
       const cantidadActual: number = existente.getDataValue("cantidad"); 
        await Carrito.update({ cantidad: cantidadActual + parseInt(cantidad) },{
            where: {
                idUsuario: idUsuario,
                idProducto: idProducto
            }
        })
    }
    else{

        await Carrito.create({
            idUsuario: idUsuario,
            idProducto: idProducto,
            precio: precio,
            cantidad: cantidad
        });
    }

    response.json({
        msg: 'El producto se ha agregado correctamente en el carrito'

    });

 }catch(error){

    //console.log("ERROR" + error)
    response.status(400).json({
        msg: 'Error al guardar el producto en el carrito'
    });
 }
}
export const deleteCarrito = async (request: Request,response:  Response ) => {
    const { value, idProducto} = request.body;
    try{
        await Carrito.destroy({
            where: {
                idUsuario: value,
                idProducto: idProducto
            }
        })
        response.json({
            msg: 'El producto se ha eliminado correctamente de el carrito'
    
        });
    }
    catch(error){
        response.status(400).json({
            msg: 'Error al eliminar el producto en el carrito.'
        });
    }
 }

 export const vaciaCarrito = async (request: Request,response:  Response ) => {
    const { value } = request.body;

    try{
        await Carrito.destroy({
            where: {
                idUsuario: value
            }
        })
        response.json({
            msg: 'El carrito se ha vaciado correctamente'
    
        });

    }
    catch(error){
        response.status(400).json({
            msg: 'Error al vaciar el carrito.'
        });
    }


 }