import express from 'express';
import cors from 'cors';
import { obtenerPosts, agregarPost } from './consultas.js';

const app = express();
const PORT = 3000; 

// 1. Habilitar los CORS en el servidor
app.use(cors());

app.use(express.json());

// 3. Ruta GET 
app.get("/posts", async (req, res) => {
    try {
        const posts = await obtenerPosts();
        res.json(posts);
    } catch (error) {
        console.error("Error al obtener los posts:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// 4. Ruta POST 
app.post("/posts", async (req, res) => {
    try {
        const { titulo, url, descripcion } = req.body; 
        if (!titulo || !url || !descripcion) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }
        const nuevoPost = await agregarPost(titulo, url, descripcion);
        res.status(201).json(nuevoPost);
    } catch (error) {
        console.error("Error al crear el post:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

app.listen(PORT, () => {
    console.log(`¡Servidor encendido con éxito en http://localhost:${PORT}!`);
});