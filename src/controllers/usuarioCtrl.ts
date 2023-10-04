import { Request, Response } from "express"
import  Jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import { Usuario } from "../models/usuario";

export const addUsuario = async ( request: Request,response:  Response) => {
    
    //console.log(request.body);
    const { nombre, password} = request.body;

    const existe = await Usuario.findOne({
        where: {
            nombre: nombre
        }
    })

    if(existe){
        return response.status(400).json({
            msg:'El usuario '+ nombre + ' ya existe.'
        })
    }
    
    console.log("continue flujo");
    const pwd = await bcrypt.hash(password,15)
    //console.log(nombre);
    //console.log(password);
    try{
        await Usuario.create(
            {
                nombre: nombre,
                password: pwd
        })

        response.json({
            msg: 'El usuario '+ nombre + ' se ha creado exitosamente.'

        });
    }
    catch{
        response.status(400).json({
            msg: 'Error al crear usuario'
        });
    }
    

}

export const login = async ( request: Request,response:  Response) => {
    
    const { nombre, password } = request.body;
    
    const usuario: any = await Usuario.findOne({
        where: {
            nombre: nombre
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
        nombre: nombre
    },process.env.KEY || 'tiendajohnymoo')

    response.json({
        token: token,
        value: usuario.getDataValue('idUsuario')
    })
}