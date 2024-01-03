const mongoose = require("mongoose");

const alumnoSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true, // Agregando la opción unique para asegurar nombres únicos
  },
  materias: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Materia',
  }],
});

module.exports = mongoose.model('alumnos', alumnoSchema);

/* ACTUALMENTE FUNCIONA 
const mongoose = require("mongoose");

const alumnoSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  materias: {
    type: [String], // Ahora es un Array de Strings
    required: true,
  }
});

module.exports = mongoose.model('alumnos', alumnoSchema);


*/

