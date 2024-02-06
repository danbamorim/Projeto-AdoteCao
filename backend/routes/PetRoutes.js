const router = require('express').Router()

const PetController = require('../controllers/PetController')

const verifyToken = require('../helpers/verify-token')
router.post('/create', verifyToken, PetController.create)

module.exports = router










//configuracao da rota dos pets