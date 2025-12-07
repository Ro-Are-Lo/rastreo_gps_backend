import express from 'express';
import http from 'http';
import cors from 'cors';

// Personas
import personaRoutes from './modules/persona/routes/persona.routes';
import documentoRoutes from './modules/persona/routes/documento.routes';
import contactoRoutes from './modules/persona/routes/contacto.routes';

// Vehículos
import vehiculoRoutes from './modules/vehiculo/routes/vehiculo.routes';
import ubicacionRoutes from './modules/vehiculo/routes/ubicacion.routes';

// Usuarios
import asignacionRoutes from './modules/usuarios/routes/asignacion.routes';
import conexionRoutes from './modules/usuarios/routes/conexion.routes';
import usuarioRoutes from './modules/usuarios/routes/usuario.routes';
import rolRoutes from './modules/usuarios/routes/rol.routes';
import usuarioRolRoutes from './modules/usuarios/routes/usuarioRol.routes';

import usuarioCompletoRoutes from './modules/usuarios-completos/routes/usuario-completo.routes';

import authRoutes from './modules/auth/auth.routes';

// Middlewares
import { authMiddleware } from './shared/middlewares/auth.middleware';
import { checkRole } from './shared/middlewares/role.middleware';

import { swaggerDocs } from './swagger';
import 'reflect-metadata';

const app = express();
const server = http.createServer(app);


// Middlewares
app.use(express.json());

// Logging (solo en desarrollo)
if (process.env.NODE_ENV !== 'test') {
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });
}

// CORS
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.get('/', (req, res) => {
  res.json({
    message: 'API Rastreo GPS Backend',
    version: '1.0.0',
    endpoints: {
      docs: '/api-docs',
      auth: {
        login: 'POST /api/auth/login',
        verify: 'GET /api/auth/verify',
        profile: 'GET /api/auth/profile'
      },
      usuarios: 'POST /api/usuarios-completos'
    },
    status: 'running'
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'rastreo-gps-backend'
  });
});


// ========== RUTAS PÚBLICAS ==========
// (Aquí irían login, registro, health check, etc.)
app.use('/api/auth', authRoutes);
// ========== RUTAS PROTEGIDAS ==========

// Personas - solo admin puede gestionar personas
app.use('/api/personas', authMiddleware, checkRole(['admin']), personaRoutes);

// Contactos y Documentos - rutas independientes
app.use('/api/personas/:personaId/contactos', authMiddleware, checkRole(['admin']), contactoRoutes);
app.use('/api/documentos', authMiddleware, checkRole(['admin']), documentoRoutes);

// Vehículos - admin y supervisor
app.use('/api/vehiculos', authMiddleware, checkRole(['admin', 'supervisor']), vehiculoRoutes);
app.use('/api/ubicaciones', authMiddleware, checkRole(['admin', 'supervisor', 'conductor']), ubicacionRoutes);

// Usuarios y roles - solo admin
app.use('/api/usuarios', authMiddleware, checkRole(['admin']), usuarioRoutes);
app.use('/api/roles', authMiddleware, checkRole(['admin']), rolRoutes);
app.use('/api/usuario-roles', authMiddleware, checkRole(['admin']), usuarioRolRoutes);

// Asignaciones y conexiones
app.use('/api/asignaciones', authMiddleware, checkRole(['admin', 'supervisor']), asignacionRoutes);
app.use('/api/conexiones', authMiddleware, checkRole(['admin', 'supervisor']), conexionRoutes);

// Endpoint completo
app.use('/api/usuarios-completos', usuarioCompletoRoutes);

// Middleware de errores
app.use((error: any, req: any, res: any, next: any) => {
  console.error('🔥 ERROR:', error.message);
  const status = error.statusCode || error.status || 500;
  res.status(status).json({
    status,
    message: error.message || 'Error interno del servidor',
    ...(process.env.NODE_ENV !== 'production' && { 
      stack: error.stack
    })
  });
});

// Swagger
swaggerDocs(app);

// Puerto
const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'test') {
  server.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
} else {
  console.log('✅ Modo test - Servidor NO iniciado');
}

export { app, server };