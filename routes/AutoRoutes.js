// en los routes se encuentra todos los servicios web del API de nuestro aplicativo 

const express = require('express') // Importendo la libreria
const app = express() // Inicializamos la variable de la libreria
const CarroController = require('../controllers/CarroContriller') //Importando  el controlador
const controller = new CarroController();

// creamos nuestros secicios web
app.get('/carro', controller.getCarro) // OBtengo todos los Carros
app.post('/carro', controller.createCarro)// Creo un Carro
app.get('/carro/:id', controller.getCarroById)// Consulto un Carro
app.put('/carro/:id', controller.updateCarro)// Actualiza un Carro 
app.delete('/carro/:id', controller.deleteCarro)// elimino un Carro

module.exports = app

