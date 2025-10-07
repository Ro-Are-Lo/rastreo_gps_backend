
/* 


Configuraciones globales

Aquí van los archivos de configuración del entorno, 
base de datos, variables, cors, puertos, etc.


// Configuración y conexión a la base de datos MySQL
import { createPool } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Se crea una conexión a la base de datos usando variables de entorno
export const db = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});
*/
