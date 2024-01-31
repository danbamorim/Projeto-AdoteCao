const jwt = require('jsonwebtoken')
const getToken = require('./get-token')

// middleware para validar o token
const checkToken = (req, res, next) => {
    if (req.headers.authorization) {
        return res.status(401).json({ message: 'Acesso Negado!' })
    }
    const token = getToken(req)
    if (!token) {
        return res.status(401).json({ message: 'Acesso Negado!' })
    }
}
module.exports = checkToken