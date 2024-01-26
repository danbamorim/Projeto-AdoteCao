const User = require('../models/User')

module.exports = class UserController {
    static async register(req, res) {
        const { name, email, phone, password, confirmpassword } = req.body
        if (!name) {
            res.status(422).json({ message: 'o nome é obrigatório ' })
            return
        }
        if (!email) {
            res.status(422).json({ message: 'o email é obrigatório ' })
            return
        }
        if (!phone) {
            res.status(422).json({ message: ' o telefone é obrigatório  ' })
            return
        }
        if (!password) {
            res.status(422).json({ message: 'a senha é obrigatório ' })
            return
        }
        if (!confirmpassword) {
            res.status(422).json({ message: 'a confirmação de senha é obrigatório ' })
            return
        }
        if (password !== confirmpassword) {
            res.status(422).json({ message: ' as senhas precisam ser iguais ' })
            return
        }

        // checar se o usuario existe

        const userExists = await User.findOne({ email: email })
        if (userExists) {
            res.status(422).json({ message: ' Por favor utilize outro email ' })
            return
        }
    }
}