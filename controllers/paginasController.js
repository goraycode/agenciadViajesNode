import { Testimonial } from "../models/Testimoniales.js";
import { Viaje } from "../models/Viaje.js";

//request es lo que yo envio
//response es lo que express me envia o responde

const paginaInicio = async (req, res) => {

    
    try {
        //para que ambos promises se ejecuten al mismo tiempo
        //y no esperar que finalicé el otro para recién empezar
        const [viajes, testimonios] = await Promise.all([Viaje.findAll({ limit: 3 }), Testimonial.findAll({ limit: 3 })]);
        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            subtitulo: 'Viajes',
            viajes,
            testimonios

        });
    } catch (error) {
        console.error(error)
    }
}

const paginaNosotros = (req, res) => {
    //pasar variables a una vista
    const viajes = 'Viajes a Perú'
    res.render('nosotros', {
        destino: viajes,
        pagina: 'Nosotros'
    });
}

const paginaViajes = async (req, res) => {

    //consultas base de datos BD
    const viajes = await Viaje.findAll();

    res.render('viajes', {
        pagina: 'Viajes',
        viajes
    })
}


//Muestra un viaje por su slug
const paginaDetalleViaje = async (req, res) => {
    //accedemos a la ruta para ique nos devuelva
    const { slug } = req.params;


    try {
        const resultado = await Viaje.findOne({ where: { slug } });
        res.render('viaje', {
            pagina: 'Información viaje',
            resultado
        })
    } catch (e) {
        console.error(e)
    }
}

//mostrar los testimonios
const paginaTestimoniales = async (req, res) => {
    //consultas a la base de datos
    const testimonios = await Testimonial.findAll();
    res.render('testimoniales', {
        pagina: 'Testimoniales',
        testimonios
    })
}




export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaDetalleViaje,
    paginaTestimoniales,
}