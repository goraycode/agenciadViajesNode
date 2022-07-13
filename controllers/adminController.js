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


const guardarViajeNuevo = (req, res) => {
    let campos = [];
    const { titulo,
        precio,
        fechaIda,
        fechaVuelta,
        imagen,
        descripcion,
        disponibles } = req.body;

    campos = [titulo, precio, fechaIda, fechaVuelta, imagen, descripcion, disponibles];
    const camposvacios = campos.every(campo => campo.trim() === '');
    if (camposvacios) {
        const mensaje = 'Todos los campos son obligatorios';
        res.render('registro', {
            mensaje
        })
    }




}

export {
    paginaAdmin,
    registroViaje,
    guardarViajeNuevo
}