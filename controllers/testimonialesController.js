import { Testimonial } from "../models/Testimoniales.js";


const guardarTestimonial = async (req, res) => {

    //PARA SABER LOS DATOS QUE ENVIO LA PERSONA y extraer los valores

    const { nombre, correo, mensaje } = req.body;
    let errores = [];
    let validarEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (nombre.trim() === '') {
        errores.push('Campo nombre vacio')
    }
    if (correo.trim() === '') {
        errores.push('Campo correo vacio')
    } else if (!validarEmail.test(correo)) {
        errores.push('No es un correo válido')
    }

    if (mensaje.trim() === '') {
        errores.push('Campo mensaje vacio')
    }
    if (errores.length > 0) {

        //consultamos la base de datos y los testimoniales existentes
        const testimonios = await Testimonial.findAll();

        //mostrar la vista con errores
        res.render('testimoniales', {
            pagina: 'testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimonios
        })
    } else {
        //guardar los datos en la base de datos

        try {

            await Testimonial.create({ nombre, email: correo, mensaje });
            //redireccionamos y mostramos la página de testimoniales
            res.redirect('/testimoniales');
        } catch (error) {
            console.error(error)
        }

    }

}


export {
    guardarTestimonial
}