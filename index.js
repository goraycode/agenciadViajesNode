//nos traemos todo de express
import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';


//para ejecutar express
const app = express();

//Conectar la base de datos
db.authenticate()
    .then(() => console.log('Base de datos conectada'))
    .catch(error => console.error(error));

//definir puerto
const port = process.env.PORT || 4000;

//habilitar PUG
app.set('view engine', 'pug');


//obtener el año actual
app.use((req, res, next) => {
    //enviar variables a otro archivo o una vista, es mediante lo locals
    res.locals.unaVariable = (new Date()).getFullYear();
    //se va a repetir multiples veces porque app.use se ejecuta en diferentes métodos como GET, POST y más


    //ya terminé, entonces vamonos al sigueinte middelware, es para que no se detenga en la ejecución anterior
    next();

    //si no pasa al siguiente middelware, por más que escribimos next()
    //podemos forzar a escribir return next();
});

//nombre de la página
app.use((req, res, next) => {
    res.locals.nombrePagina = 'Agencia de viajes'
    next();
})

//Obtner body parser para leer los datos del formulario
app.use(express.urlencoded({ extended: true }));



//definir la carpeta publica
app.use(express.static('public'));

//para usar todos las opciones como PUT, PATCH, GET, POST Y DELETE USAMOS
//EL SIGUIENTE CODIGO
app.use('/', router);



//arranca el servidor
app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
})