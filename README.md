📝 TaskBoard

Aplicación web sencilla para la gestión de tareas. Permite crear, visualizar, completar y eliminar tareas.

🚀 Tecnologías utilizadas
Frontend: React (Vite)
Backend: Node.js con Express
Control de versiones: Git y GitHub

📂 Estructura del proyecto
taskboard/
│
├── backend/           # Servidor Node.js
│   ├── server.js
│   ├── package.json
│
├── frontend-react/    # Aplicación React
│   ├── src/
│   ├── package.json
│
└── .gitignore

⚙️ Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

Node.js (v16 o superior)
npm (incluido con Node)

▶️ Cómo ejecutar el proyecto
1. Clonar el repositorio
git clone https://github.com/TU-USUARIO/taskboard.git
cd taskboard

2. Ejecutar el backend
cd backend
npm install
node server.js

El servidor se ejecutará en:

http://localhost:3000

3. Ejecutar el frontend

Abre otra terminal:

cd frontend-react
npm install
npm run dev

La aplicación estará disponible en:

http://localhost:5173

🧪 Funcionalidades
✅ Ver lista de tareas
➕ Agregar nuevas tareas
✔️ Marcar tareas como completadas
❌ Eliminar tareas

📌 Notas
- Asegúrate de que el backend esté corriendo antes de iniciar el frontend.
- El frontend consume la API en http://localhost:3000/tasks.

👨‍💻 Autor
Juan Moreno

