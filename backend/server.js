// ==========================
// IMPORTACIONES
// ==========================
const express = require('express');
const cors = require('cors');

// ==========================
// CONFIGURACIÓN DEL SERVIDOR
// ==========================
const app = express();
const PORT = process.env.PORT || 3000;

// ==========================
// MIDDLEWARES
// ==========================
app.use(cors()); // Permite peticiones desde otros dominios (frontend)
app.use(express.json()); // Permite recibir JSON en el body

// ==========================
// "BASE DE DATOS" EN MEMORIA
// ==========================
let tasks = []; // Arreglo donde se almacenan las tareas (temporal)

// ==========================
// RUTAS (ENDPOINTS)
// ==========================

// ====== OBTENER TODAS LAS TAREAS ======
app.get('/tasks', (req, res) => {
  res.json(tasks); // Devuelve todas las tareas
});

// ====== CREAR NUEVA TAREA ======
app.post('/tasks', (req, res) => {
  const newTask = {
    id: Date.now(), // ID único basado en timestamp
    title: req.body.title, // Título desde el frontend
    completed: false, // Estado inicial
    createdAt: new Date().toISOString(), // Fecha de creación
    dueDate: req.body.dueDate || null // Fecha límite opcional
  };

  tasks.push(newTask); // Guardar en el arreglo
  res.json(newTask); // Responder con la nueva tarea
});

// ====== MARCAR TAREA COMO COMPLETADA ======
app.put('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id == req.params.id); // Buscar tarea por ID

  // Validación si no existe
  if (!task) return res.status(404).json({ error: 'No encontrada' });
  
  task.completed = true; // Cambiar estado
  res.json(task); // Retornar tarea actualizada
});

// ====== ELIMINAR TAREA ======
app.delete('/tasks/:id', (req, res) => {
  tasks = tasks.filter(t => t.id != req.params.id); // Filtrar y eliminar
  res.json({ message: 'Eliminada' }); // Confirmación
});

// ====== RUTA RAÍZ ======
app.get('/', (req, res) => {
  res.json({ message: 'TaskBoard API corriendo ✅', endpoints: ['/tasks'] })
})

// ==========================
// INICIAR SERVIDOR
// ==========================
app.listen(PORT, () => {
  console.log(`Servidor corriendo en ${PORT}`);
});