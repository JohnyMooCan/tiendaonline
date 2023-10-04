import { Sequelize } from "sequelize";
const sequelize = new Sequelize('euwrt0f9c2felu1a', 'rl8k6thqm5cglvjy', 'a0j01x1osz7d013q', {
    host: 'dt3bgg3gu6nqye5f.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    dialect: 'mysql',   
});

//Config Local
/*const sequelize = new Sequelize('id21335029_tiendabd', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',   
});*/

export default sequelize;