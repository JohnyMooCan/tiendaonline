"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productoCtrl_1 = require("../controllers/productoCtrl");
const router = (0, express_1.Router)();
//router.post('/',validadorToken,getProductos)
//router.post('/detalle',validadorToken,getProducto)
//Se elimina la restriccion de tener token para consumir estos servicio
router.post('/', productoCtrl_1.getProductos);
router.post('/detalle', productoCtrl_1.getProducto);
exports.default = router;
