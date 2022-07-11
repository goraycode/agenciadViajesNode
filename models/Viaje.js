import Sequelize, { DataTypes } from "sequelize";
import db from "../config/db.js";

export const Viaje = db.define('viajes', {
    titulo: {
        type: Sequelize.STRING
    },
    precio:{
        type:Sequelize.NUMBER
    },
    fecha_ida:{
        type: Sequelize.DATE
    },
    fecha_vuelta:{
        type: Sequelize.DATE
    },
    imagen:{
        type: Sequelize.STRING
    },
    descripcion:{
        type: Sequelize.STRING
    },
    disponibles:{
        type:Sequelize.NUMBER
    },
    slug:{
        type:Sequelize.STRING
    }

});

