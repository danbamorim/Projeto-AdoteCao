const Pet = require('../models/Pet')

// helpers
const getUserByToken = require('../helpers/get-user-by-token')
const getToken = require('../helpers/get-token')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = class PetController {
    // criar um pet
    static async create(req, res) {
        const name = req.body.name
        const age = req.body.age
        const description = req.body.description
        const weight = req.body.weight
        const color = req.body.color
        const images = req.files
        const available = true

        // atualizacao de  imagem

        // validar 
        if (!name) {
            res.status(422).json({ message: 'O nome é obrigatório!' })
            return
        }

        if (!age) {
            res.status(422).json({ message: 'A idade é obrigatória!' })
            return
        }

        if (!weight) {
            res.status(422).json({ message: 'O peso é obrigatório!' })
            return
        }

        if (!color) {
            res.status(422).json({ message: 'A cor é obrigatória!' })
            return
        }

        if (images.length === 0) {
            res.status(422).json({ message: 'A imagem é obrigatória!' })
            return
        }

        // get user

        const token = getToken(req)
        const user = await getUserByToken(token)

        // criar um  pet

        const pet = new Pet({
            name,
            age,
            description,
            weight,
            color,
            available,
            images: [],
            user: {
                _id: user._id,
                name: user.name,
                image: user.image,
                phone: user.phone,
            },
        })

        images.map((image) => {
            pet.images.push(image.filename)
        })


        try {
            const newPet = await pet.save()
            res.status(201).json({
                message: 'Pet cadastrado com sucesso!',
                newPet,
            })
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }

    static async getAll(req, res) {
        //uma requisição GET para obter todos os registros de animais de estimação.        
        const pets = await Pet.find().sort('-createdAt')
        res.status(200).json({
            pets: pets,
        })
    }

    static async getAllUserPets(req, res) {

        //obtém o usuário do token

        const token = getToken(req)
        const user = await getUserByToken(token)
        const pets = await Pet.find({ 'user._id': user._id }).sort('-createdAt')

        res.status(200).json({
            pets,
        })
    }
    static async getAllUserAdoptions(req, res) {

        //obtenha todas as adoções de usuários

        const token = getToken(req)
        const user = await getUserByToken(token)
        const pets = await Pet.find({ 'adopter._id': user._id }).sort('-createdAt')

        res.status(200).json({
            pets,

        })
    }

    static async getPetById(req, res) {
        const id = req.params.id

        // checa se o id é válido 
        if (!ObjectId.isValid(id)) {
            res.status(422).json({ message: 'ID inválido!' })
            return
        }

        // check se o pet existe
        const pet = await Pet.findOne({ _id: id })
        if (!pet) {
            res.status(404).json({ message: 'Pet não encontrado!' })
            return
        }
        res.status(200).json({
            pet: pet,
        })
    }

    // remove a pet
  static async removePetById(req, res) {
    const id = req.params.id

    // check if id is valid
    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: 'ID inválido!' })
      return
    }

    // check if pet exists
    const pet = await Pet.findOne({ _id: id })

    if (!pet) {
      res.status(404).json({ message: 'Pet não encontrado!' })
      return
    }

    // check if user registered this pet
    const token = getToken(req)
    const user = await getUserByToken(token)

    if (pet.user._id.toString() != user._id.toString()) {
      res.status(404).json({
        message:
          'Houve um problema em processar sua solicitação, tente novamente mais tarde!',
      })
      return
    }

    await Pet.findByIdAndDelete(id)

    res.status(200).json({ message: 'Pet removido com sucesso!' })
  }

}
