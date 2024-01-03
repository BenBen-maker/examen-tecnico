const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();
const alumnosRoutes = require('./routes/alumnos');
const materiasRoutes = require('./routes/materias');



const app = express();
const port = process.env.PORT || 9000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/api/alumnos', alumnosRoutes);
app.use("/api/materias", materiasRoutes);
app.use('/api/alumnos/:id',alumnosRoutes)

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// Manejo de rutas no encontradas (404)
app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

// Manejo de errores globales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

// Iniciar servidor
app.listen(port, () => console.log('Server listening on port', port));
