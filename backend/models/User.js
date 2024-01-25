const mongoose = require('../db/conn')
const { Schema } = mongoose // Schema é geralmente usada para definir a estrutura dos documentos que serão armazenados no MongoDB.
// essa linha de código permite que você use diretamente a propriedade Schema de mongoose em vez de ter que referenciá-la como mongoose.Schemaem todo o código, o que pode tornar o código mais conciso e legível.


const User = mongoose.model(
  'User',
  new Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    phone: {
      type: String,
    },
  }, {timestamps: true}),
)

module.exports = User