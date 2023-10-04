import { Router } from "express";
import { addCompra, getCompras } from "../controllers/compraCtrl";
import validadorToken from "./validatoken";

const router = Router();

router.post('/add',validadorToken,addCompra)
router.post('/',validadorToken,getCompras)


export default router;