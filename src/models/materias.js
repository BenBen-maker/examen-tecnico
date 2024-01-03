// materia.js
const mongoose = require('mongoose');

const materiaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true, // Agregando la opción unique para asegurar nombres únicos
  },
});

const Materia = mongoose.model('Materia', materiaSchema);

module.exports = Materia;