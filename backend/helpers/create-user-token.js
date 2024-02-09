const jwt = require("jsonwebtoken") //  O jsonwebtoken é uma biblioteca bastante utilizada para a geração e verificação de JSON Web Tokens (JWT).

const createUserToken = async (user, req, res) => {

    // criando um token
    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, "nossosecret") // O método sign da biblioteca jsonwebtoken é usado para criar um token JWT.O primeiro argumento é um objeto que representa o conteúdo do token. Neste caso, parece incluir o nome do usuário (user.name) e o ID do usuário (user._id). O segundo argumento é a chave secreta usada para assinar o token. Neste caso, a string "nossosecret" está sendo usada como chave secreta. A chave secreta é usada para garantir que o token não tenha sido adulterado.


    // returno de um token

    res.status(200).json({
        message: "Você está autenticado!",
        token: token,
        userId: user._id,
    }) // Após a criação do token, o servidor envia uma resposta HTTP com status 200 (OK) e um objeto JSON no corpo da resposta.
}
module.exports = createUserToken

// helpers fornecem funcionalidades auxiliares para tornar o desenvolvimento mais fácil, eficiente e organizado. 
// Os JWTs são uma forma de representar informações entre duas partes de uma forma que pode ser verificada e confiável. 