const router = require('express').Router()
const UserController = require ('../controllers/UserController')


// * lembrete -- middleware refere-se a funções intermediárias que têm acesso ao objeto de solicitação (request), ao objeto de resposta (response) e à próxima função no ciclo de solicitação-resposta (normalmente chamada de next). Os middlewares são usados para executar código entre o momento em que a solicitação é recebida pelo servidor e o momento em que a resposta é enviada de volta ao cliente.

const verifyToken = require('../helpers/verify-token')
const {imageUpload} = require("../helpers/image-upload")

// rotas, Use GET para solicitar dados , POST para enviar dados, Patch para atualizacao

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/checkuser', UserController.checkUser)
router.get('/:id', UserController.getUserById)
router.patch('/edit/:id',verifyToken, imageUpload.single("image"), UserController.editUser)


module.exports = router
//configuracao da rota dos usuarios 