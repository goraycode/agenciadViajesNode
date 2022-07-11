import express from "express";
import {
    paginaInicio,
    paginaNosotros,
    paginaTestimoniales,
    paginaViajes,
    paginaDetalleViaje,
}
    from "../controllers/paginasController.js";
import { guardarTestimonial } from "../controllers/testimonialesController.js";

const router = express.Router();



//get es cuando envias una URL


router.get('/', paginaInicio);

router.get('/nosotros', paginaNosotros);

router.get('/viajes', paginaViajes);

//creamos una nueva ruta para las subpaginas de viajes
// (:viaje) será el comodin y el nonbre del objeto que recibiremos desde el
//controlador
router.get('/viajes/:slug', paginaDetalleViaje)

router.get('/testimoniales', paginaTestimoniales);
router.post('/testimoniales', guardarTestimonial);

export default router;