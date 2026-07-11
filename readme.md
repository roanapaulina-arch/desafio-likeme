# 📸 Desafío - Like Me (Parte I)

¡Hola! Este es mi proyecto para el módulo de Backend con Node y Express de Desafío Latam. 

## 🛠️ Tecnologías Utilizadas
- Frontend: React (Vite) y Axios
- Backend: Node.js y Express.js
- Base de Datos: PostgreSQL
- Estilos: CSS y Bootstrap

## 💾 Configuración de la Base de Datos
Para replicar la base de datos localmente, ejecutar los siguientes comandos en la consola de PostgreSQL o psql:

CREATE DATABASE likeme;

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(25) NOT NULL,
  img VARCHAR(1000) NOT NULL,
  descripcion VARCHAR(255) NOT NULL,
  likes INT DEFAULT 0
);

## 🚀 Cómo Ejecutar el Proyecto Localmente

1. Clonar el repositorio o descargar las carpetas.

2. Configurar el Backend:
- Ve a la carpeta likeme-backend.
- Ejecuta el comando "npm install" en la terminal para restaurar las dependencias.
- Ajusta las credenciales de tu PostgreSQL en consultas.js (usuario, contraseña, host y puerto).
- Inicia el servidor con el comando "node index.js".

3. Configurar el Frontend:
- Ve a la carpeta likeme-frontend.
- Ejecuta el comando "npm install" en tu terminal.
- Inicia la interfaz web con el comando "npm run dev".