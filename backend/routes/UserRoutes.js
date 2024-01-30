const router = require('express').Router()
const UserController = require('../controllers/UserController')


// rotas 

router.post('/register', UserController.register)
router.post('/login', UserController.login)





module.exports = router
//configuracao da rota dos usuarios 