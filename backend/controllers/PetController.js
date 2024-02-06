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

        //if (!images) {
        //  res.status(422).json({ message: 'A imagem é obrigatória!' })
        // return
        //}
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
}

