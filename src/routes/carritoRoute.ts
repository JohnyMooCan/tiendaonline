import { Router } from "express";
import { addCarrito, deleteCarrito, getCarrito, vaciaCarrito } from "../controllers/carritoCtrl";
import validadorToken from "./validatoken";

const router = Router();
router.post('/',validadorToken,getCarrito);
router.post('/add',validadorToken,addCarrito);
router.post('/delete',validadorToken,deleteCarrito)
router.post('/vaciar',validadorToken,vaciaCarrito)


export default router;
