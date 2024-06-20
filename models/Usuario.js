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
        unique: true,
        validate: {
            validator: function(correo){
                // Agregar aqui la expresion regular
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
            },
            message: props => props.value + " No es un correo electrónico válido!"
        }
    },
    password: {
        type: String,
        required: true
    }
})

module.exports =  mongoose.model('usuario', UserSchema)