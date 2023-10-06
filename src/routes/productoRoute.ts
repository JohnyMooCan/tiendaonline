import { Router } from "express";
import { getProducto, getProductos } from "../controllers/productoCtrl";
import validadorToken from "./validatoken";

const router = Router();

//router.post('/',validadorToken,getProductos)
//router.post('/detalle',validadorToken,getProducto)
//Se elimina la restriccion de tener token para consumir estos servicio
router.post('/',getProductos)
router.post('/detalle',getProducto)

export default router;