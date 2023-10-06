"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioCtrl_1 = require("../controllers/usuarioCtrl");
const validatoken_1 = __importDefault(require("./validatoken"));
const router = (0, express_1.Router)();
router.post('/', usuarioCtrl_1.addUsuario);
router.post('/login', usuarioCtrl_1.login);
router.post('/data', validatoken_1.default, usuarioCtrl_1.getUsuario);
exports.default = router;
