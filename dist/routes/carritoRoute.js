"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const carritoCtrl_1 = require("../controllers/carritoCtrl");
const validatoken_1 = __importDefault(require("./validatoken"));
const router = (0, express_1.Router)();
router.post('/', validatoken_1.default, carritoCtrl_1.getCarrito);
router.post('/add', validatoken_1.default, carritoCtrl_1.addCarrito);
router.post('/delete', validatoken_1.default, carritoCtrl_1.deleteCarrito);
router.post('/vaciar', validatoken_1.default, carritoCtrl_1.vaciaCarrito);
exports.default = router;
