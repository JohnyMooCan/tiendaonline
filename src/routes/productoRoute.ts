import { Router } from "express";
import { getProducto, getProductos } from "../controllers/productoCtrl";
import validadorToken from "./validatoken";

const router = Router();

router.post('/',validadorToken,getProductos)
router.post('/detalle',validadorToken,getProducto)

export default router;