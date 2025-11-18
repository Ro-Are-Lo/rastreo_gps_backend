import express from 'express';
import http from 'http';
import cors from 'cors';

//imports de pernonas
import personaRoutes from './modules/persona/routes/persona.routes';
import documentoRoutes from './modules/persona/routes/documento.routes';
import contactoRoutes from './modules/persona/routes/contacto.routes';
//imports de vehiculos
import vehiculoRoutes from './modules/vehiculo/routes/vehiculo.routes';
import ubicacionRoutes from './modules/vehiculo/routes/ubicacion.routes';


//import de usuarios
import  asignacionRoutes from './modules/usuarios/routes/asignacion.routes';
import conexionRoutes from './modules/usuarios/routes/conexion.routes';
import usuarioRoutes from './modules/usuarios/routes/usuario.routes';
import perfilRoutes from './modules/usuarios/routes/rol.routes';
import usuarioRolRoutes from './modules/usuarios/routes/usuarioRol.routes';

import { swaggerDocs } from './swagger';

import 'reflect-metadata';


const app = express();
const server = http.createServer(app);




// Middlewares
app.use(express.json());

// Configuración CORS
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Rutas de personas
app.use('/api/personas', personaRoutes);
app.use('/api/personas/:id/documentos', documentoRoutes); // las rutas de documentos están bajo /api/personas/:id/documento
app.use('/api/personas/:id/contactos', contactoRoutes); // las rutas de contactos están bajo /api/personas/:id/contactos

// Rutas de vehículos
app.use('/api/vehiculos', vehiculoRoutes);
app.use('/api/ubicaciones', ubicacionRoutes);

// Rutas de usuarios
app.use('/api/asignaciones', asignacionRoutes);
app.use('/api/conexiones', conexionRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/perfiles', perfilRoutes);
app.use('/api/usuario-roles', usuarioRolRoutes);

// SWAGGER
swaggerDocs(app);

// Puerto
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
export { app, server };