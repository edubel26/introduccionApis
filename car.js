// configuracion de express 
const express = require('express') //Importando la libreria
const app = express() // Iniciando la variable de la libreria
const port = 3000 // Definimos el puerto a usar

const mongoose = require('mongoose'); // Importo la libreria de mongoose

//Obtengo la cadena de conexion del archivo .anv
require('dotenv').config()
const DB_CONNECTION = process.env.DB_CONNECTION || ''
mongoose.connect(DB_CONNECTION)// creo la cadena de conexion

// Importamos las rutas del otro archivo
app.use(express.urlencoded({extended: true}))// Acceder a la informacion de las urls
app.use(express.json())// Analizar informacion en formato json
const AutoRoutes = require('./routes/AutoRoutes')
app.use('/', AutoRoutes)

// creando el servicio web    
// funcinalidad de nuestra API 
// [get, post, pot, patch, delate ]
// res -> Response -> Respuesta
// req -> Request -> Informacion de entrada
app.get('/', (req, res) => {
    // Muestra en pantalla 
    res.send("Hola mundo del carro") 
})

//Ejecuta el servidor
app.listen(port, () =>{
    console.log("Listen on " + port)
})


