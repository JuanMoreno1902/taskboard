// ==========================
// IMPORTACIONES
// ==========================
import { useEffect, useState } from 'react';

// ==========================
// CONFIGURACIÓN BASE
// ==========================
const API = 'https://taskboard-o1iu.onrender.com/tasks'; // URL del backend 

// ==========================
// COMPONENTE PRINCIPAL
// ==========================
function App() {

  // ==========================
  // ESTADOS (STATE)
  // ==========================
  const [tasks, setTasks] = useState([]); // Lista de tareas
  const [title, setTitle] = useState(''); // Título de nueva tarea
  const [dueDate, setDueDate] = useState(''); // Fecha límite

  // ==========================
  // CARGAR TAREAS DESDE API
  // ==========================
  const loadTasks = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setTasks(data); // Guardar tareas en el estado
  };

  // ==========================
  // EFECTO INICIAL
  // ==========================
  useEffect(() => {
    loadTasks(); // Se ejecuta una sola vez al iniciar
  }, []);

  // ==========================
  // CREAR NUEVA TAREA
  // ==========================
  const addTask = async () => {
    if (!title) return; // Validación básica

    await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, dueDate })
    });

    setTitle(''); // Limpiar input
    loadTasks(); // Recargar lista
  };

  // ==========================
  // MARCAR COMO COMPLETADA
  // ==========================
  const completeTask = async (id) => {
    await fetch(`${API}/${id}`, { method: 'PUT' });
    loadTasks(); // Refrescar tareas
  };

  // ==========================
  // ELIMINAR TAREA
  // ==========================
  const deleteTask = async (id) => {
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    loadTasks(); // Refrescar tareas
  };

  // ==========================
  // RENDERIZADO UI
  // ==========================
  return (
    <div className="app-container">

      {/* ====== TÍTULO ====== */}
      <h2 className="text-center mb-4">🚀TaskBoard</h2>

      {/* ====== FORMULARIO ====== */}
      <div className="d-flex mb-3">
        
        {/* Input título */}
        <input
          className="form-control me-2"
          placeholder="¿Qué necesitas hacer?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Input fecha */}
        <input
          type="date"
          className="form-control me-2"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        {/* Botón agregar */}
        <button className="btn btn-primary" onClick={addTask}>
          +
        </button>
      </div>

      {/* ====== MENSAJE SI NO HAY TAREAS ====== */}
      {tasks.length === 0 && (
        <p className="text-center text-secondary">
          No hay tareas aún 👀
        </p>
      )}

      {/* ====== LISTADO DE TAREAS ====== */}
      {tasks.map(task => (
        <div
          key={task.id}
          className="task-item d-flex justify-content-between align-items-center"
        >
          <div>

            {/* Título con estilo dinámico */}
            <div
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
                opacity: task.completed ? 0.6 : 1
              }}
            >
              {task.title}
            </div>

            {/* Estado */}
            <small
              className={task.completed ? 'text-success' : 'text-warning'}
            >
              {task.completed ? '✔ Completada' : '⏳ Pendiente'}
            </small>
            <br />

            {/* Fecha de creación */}
            <small className="text-secondary">
              🕒 Creada: {task.createdAt 
                ? new Date(task.createdAt).toLocaleString('es-ES') 
                : 'Fecha desconocida'}
            </small>
            <br />

            {/* Fecha límite */}
            {task.dueDate ? (
              <small className="text-warning">
                ⏰ Límite: {new Date(task.dueDate).toLocaleDateString('es-ES')}
              </small>
            ) : (
              <small className="text-muted">Sin fecha límite</small>
            )}
          </div>

          {/* ====== ACCIONES ====== */}
          <div>
            {/* Completar */}
            <button
              className="btn btn-success btn-sm me-2"
              onClick={() => completeTask(task.id)}
            >
              ✔
            </button>

            {/* Eliminar */}
            <button
              className="btn btn-danger btn-sm"
              onClick={() => deleteTask(task.id)}
            >
              🗑
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// ==========================
// EXPORTACIÓN
// ==========================
export default App;