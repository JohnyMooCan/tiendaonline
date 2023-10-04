"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const compraCtrl_1 = require("../controllers/compraCtrl");
const validatoken_1 = __importDefault(require("./validatoken"));
const router = (0, express_1.Router)();
router.post('/add', validatoken_1.default, compraCtrl_1.addCompra);
router.post('/', validatoken_1.default, compraCtrl_1.getCompras);
exports.default = router;
