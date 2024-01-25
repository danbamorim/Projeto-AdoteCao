const mongoose = require('../db/conn')
const { Schema } = mongoose

const Pet = mongoose.model(
  'Pet',
  new Schema({
    name: {
      type: String,
      required: true,
    },  
    age: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    weight: { // peso 
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
    available: {  //estado do pet : se está disponivel ou nao.
      type: Boolean,
    },
    user: Object,
    adopter: Object,
  }, {timestamps: true}),
)

module.exports = Pet