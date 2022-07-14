import path from 'path';
import multer from "multer";
import { Viaje } from "../models/Viaje.js";
import { DATE } from 'sequelize';

const paginaAdmin = async (req, res) => {
    const titulo = 'Panel de administrador';
    const viajes = await Viaje.findAll();

    res.render('admin', {
        titulo,
        viajes,
    })
}

const registroViaje = (req, res) => {
    const titulo = 'Agregar viaje';
    res.render('registro', {
        titulo
    })
}

//guardamos la imagen en public/image
//Find extension of file
const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/img/");
    },
    filename: function (req, file, cb) {
        const { titulo } = req.body;
        const fileName = titulo.toLowerCase().trim();
        const ext = file.mimetype.split("/")[1];
        cb(null, `destinos_${fileName}${path.extname(file.originalname)}`);

    },
});

const guardarViajeNuevo = async (req, res) => {
    //validamos las entradas
    let campos = [];
    const { titulo,
        precio,
        fechaIda,
        fechaVuelta,
        descripcion,
        disponibles } = req.body;

    campos = [titulo, precio, fechaIda, fechaVuelta, descripcion, disponibles];

    const camposvacios = campos.some(campo => campo.trim() === '');
    if (camposvacios) {
        const mensaje = 'Todos los campos son obligatorios';
        res.render('registro', {
            mensaje
        })
    } else {
        const tituloMenor = titulo.toLowerCase().trim();
        //almacenamos los datos en la base de datos
        try {
            await Viaje.create({
                titulo,
                precio,
                fecha_ida: fechaIda,
                fecha_vuelta: fechaVuelta,
                imagen: tituloMenor,
                descripcion,
                disponibles,
                slug: `viaje-${tituloMenor}`

            });


            //redireccionamos al panel principal
            res.redirect('/admin');

        } catch (error) {
            console.error(error)
        }
    }





}

export {
    paginaAdmin,
    registroViaje,
    guardarViajeNuevo,
    multerStorage
}