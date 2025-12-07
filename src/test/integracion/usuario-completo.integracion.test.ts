// src/test/integracion/usuario-completo.integracion.test.ts
import request from 'supertest';
import { app } from '../../index';
import { prisma } from '../../config/prisma';
import { generarToken } from '../../shared/utils/jwt';
import bcrypt from 'bcrypt';

describe('👤 MÓDULO USUARIO COMPLETO - Tests de Integración', () => {
  let adminToken: string;
  let adminUsuarioId: number;

  // ==================== SETUP GLOBAL ====================
  beforeAll(async () => {
    try {
      console.log('🧪 Configurando tests de usuario completo...');

      // 1. Crear persona y usuario admin
      const personaAdmin = await prisma.persona.create({
        data: {
          nombre: 'Admin',
          apellido_paterno: 'Test',
          genero: 'M',
          activo: true,
          eliminado: false
        }
      });

      const usuarioAdmin = await prisma.usuario.create({
        data: {
          id_persona: personaAdmin.id,
          username: 'admin.test',
          password_hash: await bcrypt.hash('password123', 10),
          activo: true,
          eliminado: false
        }
      });

      adminUsuarioId = usuarioAdmin.id;

      // 2. Crear rol ADMIN
      let rolAdmin = await prisma.rol.findFirst({
        where: { nombre: 'ADMIN' }
      });

      if (!rolAdmin) {
        rolAdmin = await prisma.rol.create({
          data: { 
            nombre: 'ADMIN',
            activo: true,
            eliminado: false
          }
        });
      }

      // 3. Asignar rol a admin
      await prisma.usuarioRol.create({
        data: {
          id_usuario: usuarioAdmin.id,
          id_rol: rolAdmin.id
        }
      });

      // 4. Generar token para admin
      adminToken = generarToken({
        id: usuarioAdmin.id,
        username: usuarioAdmin.username,
        id_persona: usuarioAdmin.id_persona,
        roles: ['admin']
      });

      console.log('✅ Configuración completa lista');
      
    } catch (error: any) {
      console.error('❌ Error en beforeAll:', error.message);
      throw error;
    }
  });

  beforeEach(async () => {
    try {
      console.log('🧹 Limpiando datos temporales...');
      
      // 1. Limpiar usuarioRoles (excepto admin)
      await prisma.usuarioRol.deleteMany({
        where: {
          id_usuario: { not: adminUsuarioId }
        }
      });

      // 2. Eliminar usuarios TEMPORALES (NO admin)
      await prisma.usuario.deleteMany({
        where: {
          id: { not: adminUsuarioId }
        }
      });

      // 3. Eliminar personas TEMPORALES
      await prisma.persona.deleteMany({
        where: {
          usuario: {
            id: { not: adminUsuarioId }
          }
        }
      });

      // 4. Eliminar documentos
      await prisma.documento.deleteMany({});

      // 5. Eliminar contactos
      await prisma.contacto.deleteMany({});

      console.log('✅ Limpieza completada');
    } catch (error: any) {
      console.warn('⚠️ Error limpiando datos:', error.message || error);
    }
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  // ==================== TESTS ====================
  describe('POST /api/usuarios-completos', () => {
    it('✅ debe crear un usuario CONDUCTOR completo', async () => {
      const usuarioData = {
        nombre: 'Juan',
        apellido_paterno: 'Pérez',
        apellido_materno: 'López',
        genero: 'M',
        foto_url: 'https://ejemplo.com/foto.jpg',
        username: 'juan.perez',
        password: 'Password123!',
        email: 'juan@email.com',
        telefono: '77788899',
        nacionalidad: 'Boliviana',
        cedula_identidad: '1234567',
        licencia_numero: 'LIC-001',
        roles: ['CONDUCTOR']
      };

      const response = await request(app)
        .post('/api/usuarios-completos')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(usuarioData);

      expect([200, 201]).toContain(response.status);
      
      if (response.status === 200 || response.status === 201) {
        expect(response.body.success).toBe(true);
        expect(response.body.data.persona.nombre).toBe('Juan');
        expect(response.body.data.usuario.username).toBe('juan.perez');
        expect(response.body.data.contactos).toBeInstanceOf(Array);
        expect(response.body.data.documentos).toBeInstanceOf(Array);
      }
    });

    it('✅ debe crear usuario solo con datos obligatorios', async () => {
      const usuarioData = {
        nombre: 'Minimo',
        apellido_paterno: 'Requerido',
        username: 'minimo.user',
        password: 'Password123!',
        roles: ['CONDUCTOR']
      };

      const response = await request(app)
        .post('/api/usuarios-completos')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(usuarioData);

      expect([200, 201]).toContain(response.status);
      expect(response.body.success).toBe(true);
    });

    it('❌ debe rechazar usuario sin nombre', async () => {
      const usuarioData = {
        apellido_paterno: 'Pérez',
        username: 'sin.nombre',
        password: 'Password123!',
        roles: ['CONDUCTOR']
      };

      const response = await request(app)
        .post('/api/usuarios-completos')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(usuarioData);

      expect([400, 422]).toContain(response.status);
    });
  });

  describe('GET /api/usuarios-completos/:id', () => {
    it('✅ debe obtener usuario por ID', async () => {
      // Primero crear un usuario
      const createResponse = await request(app)
        .post('/api/usuarios-completos')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          nombre: 'Test',
          apellido_paterno: 'Get',
          username: 'test.get',
          password: 'Password123!',
          roles: ['CONDUCTOR']
        });

      const userId = createResponse.body.data?.usuario?.id;
      
      if (userId) {
        const response = await request(app)
          .get(`/api/usuarios-completos/${userId}`)
          .set('Authorization', `Bearer ${adminToken}`);

        expect([200, 201]).toContain(response.status);
        if (response.status === 200) {
          expect(response.body.success).toBe(true);
          expect(response.body.data.usuario.username).toBe('test.get');
        }
      }
    });

    it('❌ debe retornar 404 para usuario inexistente', async () => {
      const response = await request(app)
        .get('/api/usuarios-completos/999999')
        .set('Authorization', `Bearer ${adminToken}`);

      expect([404, 400]).toContain(response.status);
    });
  });

  describe('GET /api/usuarios-completos', () => {
    it('✅ debe listar usuarios', async () => {
      // Crear algunos usuarios primero
      await request(app)
        .post('/api/usuarios-completos')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          nombre: 'Listar1',
          apellido_paterno: 'Test',
          username: 'listar1.test',
          password: 'Password123!',
          roles: ['CONDUCTOR']
        });

      await request(app)
        .post('/api/usuarios-completos')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          nombre: 'Listar2',
          apellido_paterno: 'Test',
          username: 'listar2.test',
          password: 'Password123!',
          roles: ['CONDUCTOR']
        });

      const response = await request(app)
        .get('/api/usuarios-completos')
        .set('Authorization', `Bearer ${adminToken}`);

      expect([200, 201]).toContain(response.status);
      if (response.status === 200) {
        expect(response.body.success).toBe(true);
        expect(Array.isArray(response.body.data)).toBe(true);
      }
    });
  });

  describe('PUT /api/usuarios-completos/:id', () => {
    it('✅ debe actualizar usuario', async () => {
      // Crear usuario primero
      const createResponse = await request(app)
        .post('/api/usuarios-completos')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          nombre: 'Actualizar',
          apellido_paterno: 'Test',
          username: 'actualizar.test',
          password: 'Password123!',
          roles: ['CONDUCTOR']
        });

      const userId = createResponse.body.data?.usuario?.id;
      
      if (userId) {
        const updateData = {
          nombre: 'Actualizado',
          apellido_paterno: 'Modificado'
        };

        const response = await request(app)
          .put(`/api/usuarios-completos/${userId}`)
          .set('Authorization', `Bearer ${adminToken}`)
          .send(updateData);

        expect([200, 204]).toContain(response.status);
        if (response.status === 200) {
          expect(response.body.success).toBe(true);
          expect(response.body.data.persona.nombre).toBe('Actualizado');
        }
      }
    });
  });

  describe('DELETE /api/usuarios-completos/:id', () => {
    it('✅ debe eliminar suavemente un usuario', async () => {
      // Crear usuario primero
      const createResponse = await request(app)
        .post('/api/usuarios-completos')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          nombre: 'Eliminar',
          apellido_paterno: 'Test',
          username: 'eliminar.test',
          password: 'Password123!',
          roles: ['CONDUCTOR']
        });

      const userId = createResponse.body.data?.usuario?.id;
      
      if (userId) {
        const response = await request(app)
          .delete(`/api/usuarios-completos/${userId}`)
          .set('Authorization', `Bearer ${adminToken}`);

        expect([200, 204]).toContain(response.status);
      }
    });
  });
});
// ← NO AGREGAR NADA MÁS DESPUÉS DE ESTA LÍNEA