"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const producto_1 = require("../controllers/producto");
const router = (0, express_1.Router)();
router.get('/', producto_1.getProductos);
exports.default = router;
