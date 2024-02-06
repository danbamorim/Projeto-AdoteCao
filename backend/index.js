const express = require('express')
const cors = require('cors') //O CORS é uma política de segurança que visa proteger os Usuários, impedindo que scripts maliciosos de um site acessem recursos em outro domínio sem permissão.

const app = express()

// Config JSON  
app.use(express.json())

//O código está dizendo ao servidor para aceitar solicitações de origem http://localhost:3000 e permitir o envio de credenciais durante essas solicitações (usando o parâmetro credentials: true).
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))


// Public folder for images
app.use(express.static('public'))


// Rotas 

const PetRoutes = require('./routes/PetRoutes')
const UserRoutes = require('./routes/UserRoutes')

app.use('/pets', PetRoutes)
app.use('/users', UserRoutes)

app.listen(5000)



