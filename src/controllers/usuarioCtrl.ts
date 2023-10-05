import { Request, Response } from "express"
import  Jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import { Usuario } from "../models/usuario";

export const addUsuario = async ( request: Request,response:  Response) => {
    
    //console.log(request.body);
    const { usuario, nombre, apellidos, password} = request.body;

    const existe = await Usuario.findOne({
        where: {
            usuario: usuario
        }
    })

    if(existe){
        return response.status(400).json({
            msg:'El usuario '+ usuario + ' ya existe.'
        })
    }
    
    console.log("continue flujo");
    const pwd = await bcrypt.hash(password,15)
    //console.log(nombre);
    //console.log(password);
    try{
        await Usuario.create(
            {
                usuario: usuario,
                nombre: nombre,
                apellidos: apellidos,
                password: pwd
        })

        response.json({
            msg: 'El usuario '+ usuario + ' se ha creado exitosamente.'

        });
    }
    catch{
        response.status(400).json({
            msg: 'Error al crear usuario'
        });
    }
    

}
export const getUsuario = async ( request: Request,response:  Response) => {

    const { value } = request.body;
    
    const usuario: any = await Usuario.findOne({
        where: {
            idUsuario: value
        }
    })

    if(!usuario){
        return response.status(400).json({
            msg:'El usuario no existe.'
        })
    }

    response.json({
        val_1: usuario.getDataValue('nombre'),
        val_2: usuario.getDataValue('usuario'),
        val_3: usuario.getDataValue('apellidos') 
    })

}
export const login = async ( request: Request,response:  Response) => {
    //Se recibe el nodo nombre como usuario para confundir a intruzos
    const { nombre, password } = request.body;
    
    const usuario: any = await Usuario.findOne({
        where: {
            usuario: nombre 
        }
    })

    if(!usuario){
        return response.status(400).json({
            msg:'El usuario no existe.'
        })
    }

    const valido = await bcrypt.compare(password,usuario.password);
    if(!valido){
       return response.status(400).json({
        msg: 'La contraseña es incorrecta'
       }) 
    }

    //Token para el inicio de sesion
    const token = Jwt.sign({
        usuario: usuario
    },process.env.KEY || 'tiendajohnymoo')

    response.json({
        token: token,
        value: usuario.getDataValue('idUsuario')
    })
}