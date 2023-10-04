"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validadorToken = (request, response, next) => {
    // console.log("validador token")
    //Obtenemos el token de la sesion
    const token = request.headers['authorization'];
    if (token != undefined && token.startsWith('Bearer')) {
        try {
            const btoken = token.slice(7);
            //console.log(btoken);
            jsonwebtoken_1.default.verify(btoken, process.env.KEY || 'tiendajohnymoo');
            next();
        }
        catch (_a) {
            response.status(401).json({
                msg: 'Token invalido.'
            });
        }
    }
    else {
        response.status(401).json({
            msg: 'Acceso denegado.'
        });
    }
};
exports.default = validadorToken;
