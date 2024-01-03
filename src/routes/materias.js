// materias.js
const express = require('express');
const router = express.Router();
const Materia  = require('../models/materias');

// Obtener una materia por su ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const materia = await Materia.findById(id);

    if (materia) {
      res.status(200).json(materia);
    } else {
      res.status(404).json({ error: 'Materia no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la materia por ID' });
  }
});
//ver todos las materias
router.get('/', async (req, res) => {
  // Lógica para obtener todos los alumnos de la base de datos
  try {
    const listaMaterias = await Materia.find();
    res.status(200).json(listaMaterias);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la lista de alumnos' });
  }
});
// Crear una nueva materia
router.post('/', async (req, res) => {
  try {
      const { nombre } = req.body;

      // Verificar si la materia ya existe en la base de datos
      const materiaExistente = await Materia.findOne({ nombre });

      if (materiaExistente) {
          return res.status(400).json({ error: 'La materia ya existe' });
      }

      // Crear y guardar la nueva materia en la base de datos
      const nuevaMateria = new Materia({ nombre });
      await nuevaMateria.save();

      res.status(201).json(nuevaMateria);
  } catch (error) {
      console.error('Error al agregar la materia:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
  }
});
// Ruta para actualizar un materia por su ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  Materia
    .updateOne({ _id: id }, { $set: { nombre } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});((error) => res.json({ message: error }));

// Borrar un materia
router.delete('/:id', async (req, res) => {

  try {
    const { id } = req.params;

    // Buscar y borrar el alumno por ID
    await Materia.findByIdAndDelete(id);

    res.status(200).json({ message: 'materia borrado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al borrar el materia' });
  }
});
module.exports = router;