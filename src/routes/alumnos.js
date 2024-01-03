// alumnos.js
const express = require('express');
const router = express.Router();
const Alumnos = require('../models/alumnos'); // Cambiado el nombre de la variable para reflejar el modelo


// Rutas para alumnos

router.get('/', async (req, res) => {
  // Lógica para obtener todos los alumnos de la base de datos
  try {
    const listaAlumnos = await Alumnos.find();
    res.status(200).json(listaAlumnos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la lista de alumnos' });
  }
});
// Obtener el ID de un alumno por nombre
router.get('/alumnos/buscar', async (req, res) => {
  const { nombre } = req.query;

  try {
    const alumno = await Alumnos.findOne({ nombre });

    if (alumno) {
      res.status(200).json({ _id: alumno._id });
    } else {
      res.status(404).json({ error: 'Alumno no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar el alumno por nombre' });
  }
});
// Añadir una nueva ruta para obtener un alumno por nombre
router.get('/buscar/:nombre', async (req, res) => {
  const { nombre } = req.params;

  try {
    const alumno = await Alumnos.findOne({ nombre });

    if (alumno) {
      res.status(200).json(alumno);
    } else {
      res.status(404).json({ error: 'Alumno no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar el alumno por nombre' });
  }
});
// Crear un nuevo alumno
router.post('/', async (req, res) => {
  const { nombre, materias  } = req.body;

  try {
    // Crear un nuevo objeto Alumnos con el nombre proporcionado
    const nuevoAlumno = new Alumnos({ nombre, materias});

    // Guardar el nuevo alumno en la base de datos
    const alumnoGuardado = await nuevoAlumno.save();

    // Responder con el nuevo alumno creado
    res.status(201).json(alumnoGuardado);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el alumno' });
  }
});

// Ruta para actualizar un alumno por su ID
router.put('/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const { nombre, materias } = req.body;

      // Verificar si el alumno existe
      const alumno = await Alumnos.findById(id);

      if (!alumno) {
          return res.status(404).json({ message: `El alumno con ID ${id} no existe.` });
      }

      // Actualizar el nombre del alumno si se proporciona
      if (nombre) {
          alumno.nombre = nombre;
      }

      // Actualizar la lista de materias del alumno si se proporciona
      if (materias) {
          // Filtrar las materias, manteniendo solo las que están en la lista de materias actualizadas
          alumno.materias = alumno.materias.filter(materiaId => materias.includes(materiaId));
      }

      // Guardar los cambios en la base de datos
      await alumno.save();

      res.json({ message: `Alumno con ID ${id} actualizado correctamente.` });
  } catch (error) {
      console.error(`Error al actualizar el alumno: ${error.message}`);
      res.status(500).json({ message: 'Error interno del servidor.' });
  }
});
// Nueva ruta para quitar una materia de la lista de materias de un alumno
router.put('/:id/quitar-materia/:materiaId', async (req, res) => {
  try {
      const { id, materiaId } = req.params;

      // Verificar si el alumno existe
      const alumno = await Alumnos.findById(id);

      if (!alumno) {
          return res.status(404).json({ message: `El alumno con ID ${id} no existe.` });
      }

      // Verificar si la materia está en la lista de materias del alumno
      const index = alumno.materias.indexOf(materiaId);
      if (index !== -1) {
          // Quitar la materia de la lista de materias del alumno
          alumno.materias.splice(index, 1);

          // Guardar los cambios en la base de datos
          await alumno.save();

          res.json({ message: `Materia con ID ${materiaId} quitada correctamente del alumno con ID ${id}.` });
      } else {
          res.status(404).json({ message: `El alumno con ID ${id} no tiene la materia con ID ${materiaId}.` });
      }
  } catch (error) {
      console.error(`Error al quitar materia de alumno: ${error.message}`);
      res.status(500).json({ message: 'Error interno del servidor.' });
  }
});
// Ruta para agregar una materia a un alumno
router.put('/:alumnoId/agregar-materia/:materiaId', async (req, res) => {
  try {
    const { alumnoId, materiaId } = req.params;

    // Verificar si el alumno existe
    const alumno = await Alumnos.findById(alumnoId);

    if (!alumno) {
      return res.status(404).json({ message: `El alumno con ID ${alumnoId} no existe.` });
    }

    // Verificar si la materia ya está asociada al alumno
    if (alumno.materias.includes(materiaId)) {
      return res.status(400).json({ message: `La materia con ID ${materiaId} ya está asociada al alumno.` });
    }

    // Agregar la materia al array de materias del alumno
    alumno.materias.push(materiaId);

    // Guardar los cambios en la base de datos
    await alumno.save();

    res.json({ message: `Materia con ID ${materiaId} agregada correctamente al alumno con ID ${alumnoId}.` });
  } catch (error) {
    console.error(`Error al agregar materia al alumno: ${error.message}`);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
});
// Borrar un alumno
router.delete('/:id', async (req, res) => {
  // Lógica para borrar un alumno de la base de datos
  try {
    const { id } = req.params;

    // Buscar y borrar el alumno por ID
    await Alumnos.findByIdAndDelete(id);

    res.status(200).json({ message: 'Alumno borrado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al borrar el alumno' });
  }
});

module.exports = router;