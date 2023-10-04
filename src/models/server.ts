import  Express, { Application } from "express";
import cors from 'cors';
import routeProducto from '../routes/productoRoute'
import routeUsuario from '../routes/usuarioRoute'
import routeCarrito from '../routes/carritoRoute'
import routeCompra from '../routes/compraRoute'
import { Usuario } from "./usuario";
import { Carrito } from "./carrito";
import { Producto } from "./producto";
import { Compra, DetalleCompra } from "./compra";


export class Server {
    private app: Application
    private puerto: any;

    constructor(){
        this.puerto = process.env.PORT || 3000;
        this.app = Express();
        this.routes();
        this.conectar();
        
    }

    listen(){
        this.app.listen(process.env.PORT || 3000, function(){
            //console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
          });
          
    }

    routes(){
        //Habilitamos que lea el formato json
        this.app.use(Express.json());
        this.app.use(cors());

        this.app.use('/api/productos',routeProducto);
        this.app.use('/api/usuario',routeUsuario);
        this.app.use('/api/carrito',routeCarrito)
        this.app.use('/api/compra',routeCompra)
    }

    async conectar(){
        try{
            //creamos la tabla de productos con sequelize
            await Producto.sync();
            await Usuario.sync();
            await Carrito.sync();
            await Compra.sync();
            await DetalleCompra.sync();
        }catch(error){
            console.log(error);
            console.log("Error al conectarse a la base de datos");

        }
    }

}

export default Server;