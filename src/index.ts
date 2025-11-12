// src/index.ts
import express from 'express';
import http from 'http';
import cors from 'cors';

import { initSocket } from './socket/controlSocket';


import authRoutes from './routes/auth.routes';
import usuarioRoutes from './routes/usuario.routes';
import conductorRoutes from './routes/conductor.routes';
import vehiculoRoutes from './routes/vehiculo.routes';
import asignacionRoutes from './routes/asignacion.routes';
import conexionRoutes from './routes/conexion.routes';
import ubicacionRoutes from './routes/ubicacion.routes';
import rolRoutes from './routes/rol.routes';
import usuarioRolRoutes from './routes/usuarioRol.routes';

import { swaggerDocs } from './swagger';

const app = express();

const server = http.createServer(app); // Creamos el servidor HTTP

// Inicializar Socket.IO  
const io = initSocket(server);



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
app.use('/api/conductores', conductorRoutes);
app.use('/api/vehiculos', vehiculoRoutes);
app.use('/api/asignaciones', asignacionRoutes);
app.use('/api/conexiones', conexionRoutes);
app.use('/api/ubicaciones', ubicacionRoutes);
app.use('/api/roles', rolRoutes);
app.use('/usuario-rol', usuarioRolRoutes);

//SWAGGER INICIADOR  de declarar tus rutas
swaggerDocs(app);


// Puerto
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));