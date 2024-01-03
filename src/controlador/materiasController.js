// materiasController.js
const Materia = require('../models/materias');

// Obtener todas las materias
const obtenerTodasLasMaterias = async () => {
  try {
    const listaMaterias = await Materia.find();
    return listaMaterias;
  } catch (error) {
    throw error;
  }
};

module.exports = { obtenerTodasLasMaterias };