const express = require('express') // Importendo la libreria
const app = express() // Inicializamos la variable de la libreria
const UsuarioController = require('../controllers/UsuarioContrillers') //Importando  el controlador
const controller = new UsuarioController();

// creamos nuestros secicios web
app.get('/usuario', controller.getUsuarios)// OBtengo todos los usuarios
app.post('/usuario', controller.createUsuario) // Creo un usuario
app.get('/usuario/:id', controller.getUsuarioById)// Consulto un usuario
app.put('/usuario/:id', controller.updateUsuario)// Actualiza un usuario 
app.delete('/usuario/:id', controller.deleteUsuario)// elimino un usuario
app.post('/login', controller.login)// login


module.exports = app

//// entrar a tutorias para ver el probrema