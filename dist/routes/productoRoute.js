"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productoCtrl_1 = require("../controllers/productoCtrl");
const validatoken_1 = __importDefault(require("./validatoken"));
const router = (0, express_1.Router)();
router.post('/', validatoken_1.default, productoCtrl_1.getProductos);
router.post('/detalle', validatoken_1.default, productoCtrl_1.getProducto);
exports.default = router;
