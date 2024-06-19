const mongoose = require("mongoose") // Importar la libreria

const UserSchema = new mongoose.Schema({
    
    nombre: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    }, 
    correo: {
        type: String,
        required: true,
        unique: true 
    },
    password: {
        type: String,
        required: true
    }
})

module.exports =  mongoose.model('usuario', UserSchema)