import { Viaje } from "../models/Viaje.js";

const paginaAdmin = async (req, res) => {
    const titulo = 'Panel de administrador';
    const viajes = await Viaje.findAll();
    
    res.render('admin', {
        titulo,
        viajes,
    })
}

const registroViaje = (req, res) => {
    res.render('registro')
}

export {
    paginaAdmin,
    registroViaje
}