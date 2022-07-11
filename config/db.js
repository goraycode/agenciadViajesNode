import Sequelize from "sequelize";
import dotenv from 'dotenv/config';


/* dotenv es para ocultar la variable de entorno que en este 
caso el host local, el nombre de la base de datos, usuaruo y password
y si lo subimos a GITHUB ya no podrá ver  los credenciales*/




//pasamos el nombre de la base de datos, el nombre de usuario, el password y el cuarto una serie de opciones

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: '3306',
    dialect: 'mysql',
    define: {
        /* para evitar que se creen nuevos registros cuando se actualice  */
        timestamps: false
    },
    /* configuracion de sequelize */
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorAliases: false
});

export default db;