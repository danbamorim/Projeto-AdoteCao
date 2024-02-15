const Pet = require('../models/Pet')

// helpers
const getUserByToken = require ('../helpers/get-user-by-token')
const getToken = require('../helpers/get-token')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = class PetController {
  // create a pet
  static async create(req, res) {
    const name = req.body.name
    const age = req.body.age
    const description = req.body.description
    const weight = req.body.weight
    const color = req.body.color
    const images = req.files
    const available = true

    // console.log(req.body)
    console.log(images)
    // return

    // validações
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

    if (!images) {
      res.status(422).json({ message: 'A imagem é obrigatória!' })
      return
    }

    // get(pegar) user
    const token = getToken(req)
    const user = await getUserByToken(token)

    // cria pet
    const pet = new Pet({
      name: name,
      age: age,
      description: description,
      weight: weight,
      color: color,
      available: available,
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
    }) //A função map() é uma função de ordem superior que é usada para iterar sobre todos os elementos de um array e criar um novo array com base nos elementos do array original, aplicando uma transformação definida pela função passada como argumento.

    try {
      const newPet = await pet.save()

      res.status(201).json({
        message: 'Pet cadastrado com sucesso!',
        newPet: newPet,
      })
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }

  // obter todos os animais de estimação registrados
  static async getAll(req, res) {
    const pets = await Pet.find().sort('-createdAt')

    res.status(200).json({
      pets: pets,
    })
  }

  // obter todos os animais de estimação dos usuários
  static async getAllUserPets(req, res) {
    // get (pegar) user
    const token = getToken(req)
    const user = await getUserByToken(token)

    const pets = await Pet.find({ 'user._id': user._id })

    res.status(200).json({
      pets,
    })
  }

 // obtém todas as adoções de usuários
  static async getAllUserAdoptions(req, res) {
    // get(pegar) user
    const token = getToken(req)
    const user = await getUserByToken(token)

    const pets = await Pet.find({ 'adopter._id': user._id })

    res.status(200).json({
      pets,
    })
  }

 //obtém um animal de estimação específico
  static async getPetById(req, res) {
    const id = req.params.id

    // verifica se o id é válido
    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: 'ID inválido!' })
      return
    }

    //verifica se existe pet
    const pet = await Pet.findOne({ _id: id })

    if (!pet) {
      res.status(404).json({ message: 'Pet não encontrado!' })
      return
    }

    res.status(200).json({
      pet: pet,
    })
  }

  // remover o pet
  static async removePetById(req, res) {
    const id = req.params.id

    // checar se o id é válido 
    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: 'ID inválido!' })
      return
    }

    // checar se o pet existe 
    const pet = await Pet.findOne({ _id: id })

    if (!pet) {
      res.status(404).json({ message: 'Pet não encontrado!' })
      return
    }

    // checar se o usuario registrou o pet
    const token = getToken(req)
    const user = await getUserByToken(token)

    if (pet.user._id.toString() != user._id.toString()) {
      res.status(404).json({
        message:
          'Houve um problema em processar sua solicitação, tente novamente mais tarde!',
      })
      return
    }

    await Pet.findByIdAndRemove(id)

    res.status(200).json({ message: 'Pet removido com sucesso!' })
  }

  // pet atualizar um pet
  static async updatePet(req, res) {
    const id = req.params.id
    const name = req.body.name
    const age = req.body.age
    const description = req.body.description
    const weight = req.body.weight
    const color = req.body.color
    const images = req.files
    const available = req.body.available

    const updateData = {}

    // checar se o pet existe
    const pet = await Pet.findOne({ _id: id })

    if (!pet) {
      res.status(404).json({ message: 'Pet não encontrado!' })
      return
    }

    // verifique se o usuário registrou o pet
    const token = getToken(req)
    const user = await getUserByToken(token)

    if (pet.user._id.toString() != user._id.toString()) {
      res.status(404).json({
        message:
          'Houve um problema em processar sua solicitação, tente novamente mais tarde!',
      })
      return
    }

    // validacoes
    if (!name) {
      res.status(422).json({ message: 'O nome é obrigatório!' })
      return
    } else {
      updateData.name = name
    }

    if (!age) {
      res.status(422).json({ message: 'A idade é obrigatória!' })
      return
    } else {
      updateData.age = age
    }

    if (!weight) {
      res.status(422).json({ message: 'O peso é obrigatório!' })
      return
    } else {
      updateData.weight = weight
    }

    if (!color) {
      res.status(422).json({ message: 'A cor é obrigatória!' })
      return
    } else {
      updateData.color = color
    }

    if (!images) {
      res.status(422).json({ message: 'A imagem é obrigatória!' })
      return
    } else {
      updateData.images = []
      images.map((image) => {
        updateData.images.push(image.filename)
      })
    }

    if (!available) {
      res.status(422).json({ message: 'O status é obrigatório!' })
      return
    } else {
      updateData.available = available
    }

    updateData.description = description

    await Pet.findByIdAndUpdate(id, updateData)

    res.status(200).json({ pet: pet, message: 'Pet atualizado com sucesso!' })
  }

  // agendar  uma visita
  static async schedule(req, res) {
    const id = req.params.id

    // checar se o pet existe
    const pet = await Pet.findOne({ _id: id })

    // verifique se o usuário possui o pet
    const token = getToken(req)
    const user = await getUserByToken(token)

    console.log(pet)

    if (pet.user._id.equals(user._id)) {
      res.status(422).json({
        message: 'Você não pode agendar uma visita com seu próprio Pet!',
      })
      return
    }

    // verifique se o usuário já adotou o pet
    if (pet.adopter) {
      if (pet.adopter._id.equals(user._id)) {
        res.status(422).json({
          message: 'Você já agendou uma visita para este Pet!',
        })
        return
      }
    }

    // adicionar usuário ao animal de estimação
    pet.adopter = {
      _id: user._id,
      name: user.name,
      image: user.image,
    }

    console.log(pet)

    await Pet.findByIdAndUpdate(pet._id, pet)

    res.status(200).json({
      message: `A visita foi agendada com sucesso, entre em contato com ${pet.user.name} no telefone: ${pet.user.phone}`,
    })
  }

  // concluir uma adoção do pet
  static async concludeAdoption(req, res) {
    const id = req.params.id

    // verifique se existe o pet
    const pet = await Pet.findOne({ _id: id })

    pet.available = false

    await Pet.findByIdAndUpdate(pet._id, pet)

    res.status(200).json({
      pet: pet,
      message: `Parabéns! O ciclo de adoção foi finalizado com sucesso!`,
    })
  }
}