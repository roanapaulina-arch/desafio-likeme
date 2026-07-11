import express from 'express';
import cors from 'cors';
// Se agrega darLike y eliminarPost 
import { obtenerPosts, agregarPost, darLike, eliminarPost } from './consultas.js';

const app = express();
const PORT = 3000; 

// 1. Habilitar CORS en el servidor
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

// ================= REQUERIMIENTOS PARTE II =================

// 5. Ruta PUT para modificar los likes de un post
app.put("/posts/like/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const postActualizado = await darLike(id);
        res.status(200).json(postActualizado);
    } catch (error) {
        console.error("Error al dar like al post:", error);
        if (error.code === 404) {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// 6. Ruta DELETE para eliminar un post
app.delete("/posts/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await eliminarPost(id);
        res.status(200).json({ message: "Post eliminado con éxito" });
    } catch (error) {
        console.error("Error al eliminar el post:", error);
        if (error.code === 404) {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

app.listen(PORT, () => {
    console.log(`¡Servidor encendido con éxito en http://localhost:${PORT}!`);
});