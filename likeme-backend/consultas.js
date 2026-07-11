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
    const { rows } = await pool.query("SELECT * FROM posts");
    return rows;
};

// 2. Función para recibir y almacenar un nuevo post en la tabla 'posts' 
export const agregarPost = async (titulo, img, descripcion) => {
    const query = "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [titulo, img, descripcion, 0]; 
    const { rows } = await pool.query(query, values);
    return rows[0];
};