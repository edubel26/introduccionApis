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
const UserRoutes = require('./routes/UserRoutes')
app.use('/', UserRoutes)

// creando el servicio web 
// funcinalidad de nuestra API 
// [get, post, pot, patch, delate ]
// res -> Response -> Respuesta
// req -> Request -> Informacion de entrada
app.get('/', (req, res) => {
    // Muestra en pantalla 
    res.send("Hola mundo") 
})

/** Servicio Wed 1 */
app.get('/saludo', (req, res) => {
    res.send("Hola")
})

/** Servicio Wed 2 */
app.get('/despedirse', (req, res) =>{
    res.send("Adios")
})

/** Servicio Wed 3 */
app.get('/golpe', (req, res) =>{
    res.send("Puño")
})

/** Servicio Wed 4 */
app.get('/golpePie', (req, res) => {
    res.send("Patada")
})
/** Servicio Wed 5 */
app.get('/golpeCombo', (req, res) => {
    res.send("Arte marcial")
})

/** Servicio Wed con informacion 1 */
app.get('/saludo/:nombre', (req, res) => {
    var nombre = req.params.nombre
    res.send("hola " + nombre)
})

app.get('/saludo/:nombre/:edad', (req, res) => {
    var nombre = req.params.nombre
    var edad = req.params.edad
    res.send("hola, me llamo " + nombre + " y tengo " + edad)
})

/** Servicio Wed con informacion 1 */
app.get('/despedirse/:nombre', (req, res) => {
    var nombre = req.params.nombre
    res.send("Adios "+nombre)
}) 

/** Servicio Wed con informacion Mascotas */

app.get('/mascota/:tipo', (req, res) => {
    var tipo = req.params.tipo
    var animal = ""
    if(tipo == "perro"){
        animal = "Guau"
    }else if(tipo == "gato"){
        animal = "Miau"
    }else if(tipo == "pajaro"){
        animal = "pio pio"
    }else if(tipo == "serpiente"){
        animal = "Zsssssss"
    }else{
        animal = "No conozco el animal"
    }
    res.send(animal)

})

// Solicitud por POST
app.post('/crear/usuario', (req, res) =>{
    res.send("Estoy creando un usuario")
})

// Solicitud por PUT
app.put('/actualizar/usuario', (req, res) =>{
    res.send("Estoy actualizando un usuario con PUT")
})

// Solicitud por PATCH
app.patch('/actualizar/usuario', (req, res) =>{
    res.send("Estoy actualizando un usuario con PATCH")
})

//Solicitud por DELETE
app.delete('/eliminar/usuario', (req, res) =>{
    res.send("Estoy eliminando un usuario ")
})

//Ejecuta el servidor
app.listen(port, () =>{
    console.log("Listen on " + port)
})


app.use(express.urlencoded({extended: true}))// Acceder a la informacion de las urls
app.use(express.json())// Analizar informacion en formato json
const AutoRoutes = require('./routes/AutoRoutes')
app.use('/carros', AutoRoutes)