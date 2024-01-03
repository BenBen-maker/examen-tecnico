# examen-tecnico
para ver si me contratan

COMENZAR

por defecto esta en el localhost 9000

ya viene con 
- bootstrap 4.6 sus archivos 
- popper 
- jquery

tener dependencias
- "body-parser": "^1.20.2"
- "dotenv": "^16.3.1",
- "express": "^4.18.2"
- "mongodb": "^6.3.0"
- "mongoose": "^8.0.3"
- "nodemon": "^3.0.2"
 
.env colocar la url de base de datos de mong db 
mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/<db-name>?retryWrites=true&w=majority.

Para iniciar la app es  npm run start

Algunas peticiones http ### crear alumno
POST http://localhost:9000/api/alumnos HTTP/1.1
Content-Type: application/json

{
  "nombre": "marcus ",
  "materias": "matematicas, español"
}

### ver todos los alumnos
GET http://localhost:9000/api/alumnos HTTP/1.1

###
GET http://localhost:9000/api/alumnos/buscar/benito HTTP/1.1

###
PUT http://localhost:9000/api/alumnos/6591bb5d573b6694b60f5d21 HTTP/1.1
Content-Type: application/json

{
  "nombre": "marcus marcando "
}

### ver todos lass materias
GET http://localhost:9000/api/materias HTTP/1.1

### crear materias
POST http://localhost:9000/api/materias/ HTTP/1.1
Content-Type: application/json

{
  "nombre": "ciencias 2"
}

### editar materias
PUT http://localhost:9000/api/materias/6591e0190c20a90ca9eb6137 HTTP/1.1
Content-Type: application/json

{
  "nombre": "espanol 3"
}

### 
PUT http://localhost:9000/api/alumnos/6594a5ba0e171d0aaef5b6d3 HTTP/1.1
Content-Type: application/json

{
    "materias": [
        "65938bfd5b02d943411b21cc"
        // Puedes excluir el ID de materia que deseas eliminar
    ]
}


