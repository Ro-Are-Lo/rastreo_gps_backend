// src/index.ts
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import usuarioRoutes from './routes/usuario.routes';

const app = express();

// Middlewares
app.use(express.json());

// Configuración CORS
app.use(cors({
  origin: 'http://localhost:5173',  // solo tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'],      // headers permitidos
  credentials: true                                        // permitir cookies/credenciales
}));

// Rutas
app.use('/auth', authRoutes);
app.use('/usuarios', usuarioRoutes);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
