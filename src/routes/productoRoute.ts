import { Router } from "express";
import { getProductos } from "../controllers/productoCtrl";
import validadorToken from "./validatoken";

const router = Router();

router.post('/',validadorToken,getProductos)

export default router;