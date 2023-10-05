"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioCtrl_1 = require("../controllers/usuarioCtrl");
const router = (0, express_1.Router)();
router.post('/', usuarioCtrl_1.addUsuario);
router.post('/login', usuarioCtrl_1.login);
router.post('/data', usuarioCtrl_1.getUsuario);
exports.default = router;
