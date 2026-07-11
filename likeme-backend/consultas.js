import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',          
    password: 'ana123',    
    database: 'likeme',        // La base de datos creada
    port: 5432,
    allowExitOnIdle: true      
});

// 1. Función para obtener todos los registros de la tabla 'posts' 
export const obtenerPosts = async () => {
    try {
        const { rows } = await pool.query("SELECT * FROM posts");
        return rows;
    } catch (error) {
        throw { code: 500, message: "Error al obtener los posts de la base de datos" };
    }
};

// 2. Función para recibir y almacenar un nuevo post en la tabla 'posts' 
export const agregarPost = async (titulo, img, descripcion) => {
    try {
        const query = "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *";
        const values = [titulo, img, descripcion, 0]; 
        const { rows } = await pool.query(query, values);
        return rows[0];
    } catch (error) {
        throw { code: 500, message: "Error al insertar el nuevo post" };
    }
};

// ================= REQUERIMIENTOS PARTE II =================

// 3. Función + likes de post (Ruta PUT)
export const darLike = async (id) => {
    try {
        const query = "UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *";
        const { rowCount, rows } = await pool.query(query, [id]);
        
        if (rowCount === 0) {
            throw { code: 404, message: "No se encontró ningún post con este ID" };
        }
        return rows[0];
    } catch (error) {
        if (error.code === 404) throw error;
        throw { code: 500, message: "Error interno al procesar el like" };
    }
};

// 4. Función para eliminar un post (Ruta DELETE)
export const eliminarPost = async (id) => {
    try {
        const query = "DELETE FROM posts WHERE id = $1 RETURNING *";
        const { rowCount } = await pool.query(query, [id]);
        
        if (rowCount === 0) {
            throw { code: 404, message: "No se encontró ningún post con este ID" };
        }
        return true;
    } catch (error) {
        if (error.code === 404) throw error;
        throw { code: 500, message: "Error interno al eliminar el post" };
    }
};