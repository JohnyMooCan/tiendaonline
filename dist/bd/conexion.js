"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('euwrt0f9c2felu1a', 'rl8k6thqm5cglvjy', 'a0j01x1osz7d013q', {
    host: 'dt3bgg3gu6nqye5f.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    dialect: 'mysql',
});
//Config Local
/*const sequelize = new Sequelize('id21335029_tiendabd', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});*/
exports.default = sequelize;
