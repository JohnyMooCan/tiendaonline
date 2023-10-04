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
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const productoRoute_1 = __importDefault(require("../routes/productoRoute"));
const usuarioRoute_1 = __importDefault(require("../routes/usuarioRoute"));
const carritoRoute_1 = __importDefault(require("../routes/carritoRoute"));
const compraRoute_1 = __importDefault(require("../routes/compraRoute"));
const usuario_1 = require("./usuario");
const carrito_1 = require("./carrito");
const producto_1 = require("./producto");
const compra_1 = require("./compra");
class Server {
    constructor() {
        this.puerto = process.env.PORT || 3000;
        this.app = (0, express_1.default)();
        this.routes();
        this.conectar();
    }
    listen() {
        this.app.listen(process.env.PORT || 3000, function () {
            //console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
        });
    }
    routes() {
        //Habilitamos que lea el formato json
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
        this.app.use('/api/productos', productoRoute_1.default);
        this.app.use('/api/usuario', usuarioRoute_1.default);
        this.app.use('/api/carrito', carritoRoute_1.default);
        this.app.use('/api/compra', compraRoute_1.default);
    }
    conectar() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //creamos la tabla de productos con sequelize
                yield producto_1.Producto.sync();
                yield usuario_1.Usuario.sync();
                yield carrito_1.Carrito.sync();
                yield compra_1.Compra.sync();
                yield compra_1.DetalleCompra.sync();
            }
            catch (error) {
                console.log(error);
                console.log("Error al conectarse a la base de datos");
            }
        });
    }
}
exports.Server = Server;
exports.default = Server;
