// en el controllers se encuentra todas las funciones de nuestro aplicativo

const CarroSchema = require("../models/Carro") // Accedemos a los datos del modelo

class CarroController {
    
    async getCarro(req, res) {
      var carros = await CarroSchema.find();
      res.json(carros)  
    }

    async createCarro(req, res){

      var nuevoCarro = {

        modelo: req.body.modelo,
        marca: req.body.marca,
        color: req.body.color,
        cilindraje: req.body.cilindraje,
        placa: req.body.placa,
        linea: req.body.linea,
        capacidad: req.body.capacidad

      }

      await CarroSchema(nuevoCarro).save()

      .then((result) => { 
        res.send({"status": "success", "message": "Guardado correctamente"}) // Usuario registrado
      }).catch((error) => {
        res.send({"status": "error", "message": error.message })// Muestra el errror al crear usuario
      })

    }

    // Encontrar un solo usuario

    async getCarroById(req, res){
      var id = req.params.id
      var carro = await CarroSchema.findById(id)
      res.json(carro)
    }

    async updateCarro(req, res){

      var id = req.params.id;

      var updateCarro = {

        modelo: req.body.modelo,
        marca: req.body.marca,
        color: req.body.color,
        cilindraje: req.body.cilindraje,
        placa: req.body.placa,
        linea: req.body.linea,
        capacidad: req.body.capacidad

      }

      await CarroSchema.findByIdAndUpdate(id, updateCarro, { new: true})
      .then((result) => { 
        res.send({"status": "success", "message": "Usuario Actualizado correctamente"})
      }).catch((error) => {
        res.send({"status": "error", "message": error.message })
      })
    }

    async deleteCarro(req, res){

        var id = req.params.id

        await CarroSchema.deleteOne({_id: id})
        res.json({"status": "success", "message": "Automovil Eliminado correctamente"})

    }

}

module.exports = CarroController 