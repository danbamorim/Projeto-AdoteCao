const User = require('../models/User')

const jwt = require('jsonwebtoken') // importando jwt

const bcrypt = require('bcrypt') // importando o bcrypt

const createUserToken = require('../helpers/create-user-token')

const getToken = require('../helpers/get-token')

const getUserByToken = require('../helpers/get-user-by-token')

module.exports = class UserController {
    static async register(req, res) {
        const { name, email, phone, password, confirmpassword } = req.body
        if (!name) {
            res.status(422).json({ message: 'o nome é obrigatório! ' })
            return
        }
        if (!email) {
            res.status(422).json({ message: 'o email é obrigatório! ' })
            return
        }
        if (!phone) {
            res.status(422).json({ message: ' o telefone é obrigatório!  ' })
            return
        }
        if (!password) {
            res.status(422).json({ message: 'a senha é obrigatório! ' })
            return
        }
        if (!confirmpassword) {
            res.status(422).json({ message: 'a confirmação de senha é obrigatório! ' })
            return
        }
        if (password !== confirmpassword) {
            res.status(422).json({ message: ' as senhas precisam ser iguais! ' })
            return
        }

        // checar se o usuario existe

        const userExists = await User.findOne({ email: email })
        if (userExists) {
            res.status(422).json({ message: ' Por favor utilize outro email ' })
            return
        }

        // criar uma senha 

        const salt = await bcrypt.genSalt(12) //para gerar um hash seguro de uma senha. 
        const passwordHash = await bcrypt.hash(password, salt)

        // criar um usuario 

        const user = new User({
            name,
            email,
            phone,
            password: passwordHash,
        })

        try {
            const newUser = await user.save()
            await createUserToken(newUser, req, res)
        } catch (error) {
            res.status(500).json({ mensagem: error })
        }
    }

    static async login(req, res) {

        // criando uma obrigação do usario colocar email e senha 
        const { email, password } = req.body
        if (!email) {
            res.status(422).json({ message: 'O e-mail é obrigatório' })
            return
        }
        if (!password) {
            res.status(422).json({ message: 'a senha é obrigatória' })
            return
        }

        // checar se o usuario existe 
        const user = await User.findOne({ email: email })
        if (!user) {
            res.status(422).json({ message: ' não tem usuario com este email' })
            return
        }

        //checar se a senha bate com a mesma senha do db (banco de dados)
        const checkPassword = await bcrypt.compare(password, user.password)

        if (!checkPassword) {
            res.status(422).json({ message: ' senha inválida' })
            return
        }
        await createUserToken(user, req, res)
    }

    // o código verifica se há um token de autorização na requisição, decodifica esse token para obter o ID do usuário, busca esse usuário no banco de dados e retorna as informações do usuário (sem a senha) ou null se não houver token de autorização
    static async checkUser(req, res) {
        let currentUser
        console.log(req.headers.authorization)
        if (req.headers.authorization) {
            const token = getToken(req)
            const decoded = jwt.verify(token, 'nossosecret')

            currentUser = await User.findById(decoded.id)

            currentUser.password = undefined
        } else {
            currentUser = null
        }

        res.status(200).send(currentUser)
    }

    // busca o usuário no banco de dados, responde com um erro se o usuário não for encontrado e, se encontrado, retorna as informações do usuário.
    static async getUserById(req, res) {
        const id = req.params.id

        const user = await User.findById(id).select('-password')

        if (!user) {
            res.status(422).json({
                message: 'Usuário não encontrado!'
            })
            return
        }
        res.status(200).json({ user })
    }

    static async editUser(req, res) {
        const id = req.params.id

        // verifica se o usuario existe
        const token = getToken(req)
        const user = await getUserByToken(token)

        const { name, email, phone, password, confirmpassword } = req.body
        
        let image = ''

        // validações
        if (!name) {
            res.status(422).json({ message: 'o nome é obrigatório! ' })
            return
        }
        if (!email) {
            res.status(422).json({ message: 'o email é obrigatório! ' })
            return
        }

        // checar se o email ja esta em uso
        const userExists = await User.findOne({ email: email })
        if (user.email !== email && userExists) {
            res.status(422).json({
                message: 'Esse email esta sendo utilizado por favor mude!',
            })
            return
        }

        user.email = email

        if (!phone) {
            res.status(422).json({ message: ' o telefone é obrigatório!  ' })
            return
        }
        if (!password) {
            res.status(422).json({ message: 'a senha é obrigatório! ' })
            return
        }
        if (!confirmpassword) {
            res.status(422).json({ message: 'a confirmação de senha é obrigatório! ' })
            return
        }
        if (password !== confirmpassword) {
            res.status(422).json({ message: ' as senhas precisam ser iguais! ' })
            return
        }
    }
}