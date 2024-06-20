const UserSchema = require("../models/Usuario") // Accedemos a los datos del modelo
const bcrypt = require('bcrypt') //Importamos la libreria de encriptar 
const jwt = require("jsonwebtoken") // Importamos la libreria de token  

class UsuarioController {
    
    async getUsuarios(req, res) {
      var usuarios = await UserSchema.find();
      res.json(usuarios)  
    }

    async createUsuario(req, res){

      const hashedpassword = await bcrypt.hash(req.body.password, 10) // forma de Guardar la contraseña criptada 

      var nuevoUsuario = {
          nombre: req.body.nombre,
          apellidos: req.body.apellidos,
          correo: req.body.correo,
          password: hashedpassword, // Guardo la contraseña hasehada
         // forma de hacer el guardado de contraseña normal  
         //password: req.body.password

      }

        // forma normal de realizar la creacion de usuario

        //   await  UserSchema(nuevoUsuario).save();
        //   res.send("guardado correctamente")
        // 

      await UserSchema(nuevoUsuario).save()
      // forma de hacerlo con "Promesas" para evitar errores en guardar usuario
      .then((result) => { 
        res.send({"status": "success", "message": "Guardado correctamente"}) // Usuario registrado
      }).catch((error) => {
        res.send({"status": "error", "message": error.message })// Muestra el errror al crear usuario
      })

    }

    // Encontrar un solo usuario

    async getUsuarioById(req, res){
      var id = req.params.id
      var usuario = await UserSchema.findById(id)
      res.json(usuario)
    }

    async updateUsuario(req, res){
      
      const hashedpassword = await bcrypt.hash(req.body.password, 10) // forma de Guardar la contraseña criptada 

      var id = req.params.id;

      var updateUser = {
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        correo: req.body.correo,
        password: hashedpassword, // Guardo la contraseña hasehada
      }

      await UserSchema.findByIdAndUpdate(id, updateUser, { new: true})
      
      // forma normal de realizar la actualizacion del usuario
      // res.json({"status": "success", "message": "Usuario Actualizado correctamente"})

      // forma de hacerlo con "Promesas" para evitar errores al actualizar
      .then((result) => { 
        res.send({"status": "success", "message": "Usuario Actualizado correctamente"}) // Usuario actualizado
      }).catch((error) => {
        res.send({"status": "error", "message": error.message })// Muestra el errror al actualizar al usuario
      })
    }


    async deleteUsuario(req, res){

        var id = req.params.id

        await UserSchema.deleteOne({_id: id})

        res.json({"status": "success", "message": "Usuario Eliminado correctamente"})

    }

    async login(req,res){
      // Capturo el correo y a contraseña ingresados
      var correo = req.body.correo;
      var password = req.body.password

      //Buscar el usuario por el correo
      var usuario = await UserSchema.findOne({correo})
      if(usuario){
        // Comparar la contraseña ingresada con la registrado por el usuario  
                                                  // Ingreso    Almacenado[Encriptado]
        var verificacionClave = await bcrypt.compare(password, usuario.password)
        //Si la verificacion de la clave es exitosa
        if(verificacionClave){

          //Creo un token  con la informacion codificada del usuario
          usuario.password = null 
          const token = jwt.sign({usuario}, 'secret', { expiresIn: '1h'})

          res.send({"status": "success",
                    "message": "Bienvenido" + usuario.nombre + " " + usuario.apellidos,
                    "user_id": usuario._id,
                    "token": token
                  })
        }else{
          res.status(401).send({"status": "Error", "message": "Datos invalidos"})
        }
      }else{
        // Cuando el correo ingresado no esta registrado
        res.status(401).send({"status": "Error", "message": " El correo ingresado no existe"})
      }
    }

}

module.exports = UsuarioController 