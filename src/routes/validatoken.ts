import { Request, Response, NextFunction } from "express"
import  jwt from "jsonwebtoken";

const validadorToken = (request: Request,response: Response, next: NextFunction) =>{
   // console.log("validador token")
    //Obtenemos el token de la sesion
    const token = request.headers['authorization'];

    if(token != undefined && token.startsWith('Bearer')){
        try{

            const btoken = token.slice(7);
            //console.log(btoken);
            jwt.verify(btoken, process.env.KEY || 'tiendajohnymoo')
            
            next();
        }
        catch{
            response.status(401).json({
                msg: 'Token invalido.'
            })
        }
        
    }
    else{
        response.status(401).json({
            msg: 'Acceso denegado.'
        })
    }

   
}

export default validadorToken;