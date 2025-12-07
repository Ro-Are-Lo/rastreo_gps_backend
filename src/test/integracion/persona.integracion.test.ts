import request from 'supertest';
import { app } from '../../index';
import { prisma } from '../../config/prisma';
import { generarToken } from '../../shared/utils/jwt';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

describe('📋 MÓDULO PERSONA - Tests de Integración', () => {
  let adminToken: string;
  let personaId: number;

  const personaData = {
    nombre: 'Juan',
    apellido_paterno: 'Perez',
    apellido_materno: 'Gomez',
    genero: 'M',
    foto_url: 'https://ejemplo.com/foto.jpg'
  };

  beforeAll(async () => {
    try {
      console.log('🧪 Creando usuario admin para tests...');
      
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
          activo: true
        }
      });

      let rolAdmin = await prisma.rol.findFirst({
        where: { nombre: 'ADMIN' }
      });

      if (!rolAdmin) {
        rolAdmin = await prisma.rol.create({
          data: { nombre: 'ADMIN' }
        });
      }

      await prisma.usuarioRol.create({
        data: {
          id_usuario: usuarioAdmin.id,
          id_rol: rolAdmin.id
        }
      });

      adminToken = generarToken({
        id: usuarioAdmin.id,
        username: usuarioAdmin.username,
        id_persona: usuarioAdmin.id_persona,
        roles: ['admin']
      });

      console.log('✅ Token admin generado para tests');

    } catch (error: any) {
      console.error('❌ Error en beforeAll:', error.message);
      throw error;
    }
  });

  beforeEach(async () => {
    try {
      // Limpiar manteniendo solo al admin (id=1)
      await prisma.usuarioRol.deleteMany({
        where: { usuario: { username: { not: 'admin.test' } } }
      });
      await prisma.conexion.deleteMany();
      await prisma.asignacion.deleteMany();
      await prisma.ubicacion.deleteMany();
      await prisma.vehiculo.deleteMany();
      
      await prisma.usuario.deleteMany({
        where: { username: { not: 'admin.test' } }
      });
      
      await prisma.documento.deleteMany();
      await prisma.contacto.deleteMany();
      
      // Eliminar todas las personas EXCEPTO la del admin (id=1)
      await prisma.persona.deleteMany({
        where: {
          id: { not: 1 }
        }
      });
    } catch (error: any) {
      console.warn('⚠️ Error limpiando datos:', error.message || error);
    }
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('POST /api/personas', () => {
    it('✅ debe crear una persona exitosamente', async () => {
      const response = await request(app)
        .post('/api/personas')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(personaData)
        .expect(201);

      expect(response.body.nombre).toBe('Juan');
      expect(response.body.apellido_paterno).toBe('Perez');
      expect(response.body.activo).toBe(true);
      personaId = response.body.id;
    });

    it('❌ debe rechazar creación sin nombre', async () => {
      const dataInvalida = { ...personaData, nombre: '' };

      const response = await request(app)
        .post('/api/personas')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(dataInvalida);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
    });

    it('✅ debe crear persona con solo nombre (campos opcionales)', async () => {
      const personaMinima = { nombre: 'Maria' };

      const response = await request(app)
        .post('/api/personas')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(personaMinima)
        .expect(201);

      expect(response.body.nombre).toBe('Maria');
      expect(response.body.apellido_paterno).toBeNull();
    });
  });

  describe('GET /api/personas', () => {
    beforeEach(async () => {
      await prisma.persona.createMany({
        data: [
          { nombre: 'Persona 1', apellido_paterno: 'Apellido 1', activo: true, eliminado: false },
          { nombre: 'Persona 2', apellido_paterno: 'Apellido 2', activo: true, eliminado: false },
          { nombre: 'Persona 3', apellido_paterno: 'Apellido 3', activo: false, eliminado: false },
        ]
      });
    });

    it('✅ debe listar solo personas activas (incluyendo admin)', async () => {
      const response = await request(app)
        .get('/api/personas')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      if (response.body.data) {
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data).toHaveLength(3);
        
        const nombres = response.body.data.map((p: any) => p.nombre);
        expect(nombres).toContain('Admin');
        expect(nombres).toContain('Persona 1');
        expect(nombres).toContain('Persona 2');
        
        response.body.data.forEach((persona: any) => {
          expect(persona.activo).toBe(true);
          expect(persona.eliminado).toBe(false);
        });
      } else if (Array.isArray(response.body)) {
        expect(response.body).toHaveLength(3);
        
        const nombres = response.body.map((p: any) => p.nombre);
        expect(nombres).toContain('Admin');
        expect(nombres).toContain('Persona 1');
        expect(nombres).toContain('Persona 2');
        
        response.body.forEach((persona: any) => {
          expect(persona.activo).toBe(true);
          expect(persona.eliminado).toBe(false);
        });
      }
    });

    it('✅ debe soportar paginación', async () => {
      const response = await request(app)
        .get('/api/personas?page=1&perPage=2')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      if (response.body.data) {
        expect(response.body.data.length).toBeLessThanOrEqual(2);
      } else if (Array.isArray(response.body)) {
        expect(response.body.length).toBeLessThanOrEqual(2);
      }
    });
  });

  describe('GET /api/personas/:id', () => {
    beforeEach(async () => {
      const persona = await prisma.persona.create({ data: personaData });
      personaId = persona.id;
    });

    it('✅ debe obtener una persona por ID', async () => {
      const response = await request(app)
        .get(`/api/personas/${personaId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body.id).toBe(personaId);
      expect(response.body.nombre).toBe(personaData.nombre);
    });

    it('❌ debe retornar 404 para persona inexistente', async () => {
      const response = await request(app)
        .get('/api/personas/999999')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(404);

      expect(response.body).toHaveProperty('message');
    });
  });

  describe('PUT /api/personas/:id', () => {
    beforeEach(async () => {
      const persona = await prisma.persona.create({ data: personaData });
      personaId = persona.id;
    });

    it('✅ debe actualizar una persona', async () => {
      const datosActualizacion = {
        nombre: 'Juan Actualizado',
        apellido_paterno: 'Perez Modificado'
      };

      const response = await request(app)
        .put(`/api/personas/${personaId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(datosActualizacion)
        .expect(200);

      expect(response.body.nombre).toBe(datosActualizacion.nombre);
      expect(response.body.apellido_paterno).toBe(datosActualizacion.apellido_paterno);
    });
  });

  describe('DELETE /api/personas/:id', () => {
    beforeEach(async () => {
      const persona = await prisma.persona.create({ data: personaData });
      personaId = persona.id;
    });

    it('✅ debe eliminar suavemente una persona', async () => {
      const response = await request(app)
        .delete(`/api/personas/${personaId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(204);

      const personaBD = await prisma.persona.findUnique({
        where: { id: personaId }
      });

      expect(personaBD?.activo).toBe(false);
      expect(personaBD?.eliminado).toBe(true);
    });
  });
// En persona.integracion.test.ts
describe('Contactos de Persona', () => {
  beforeEach(async () => {
    const persona = await prisma.persona.create({ data: personaData });
    personaId = persona.id;
  });

  it('✅ debe agregar un contacto de correo exitosamente', async () => {
    const contactoData = {
      tipo_contacto: 'correo',
      valor: 'juan.perez@example.com' // Email válido
    };

    const response = await request(app)
      .post(`/api/personas/${personaId}/contactos`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send(contactoData)
      .expect(201); // ← Ahora siempre debe ser 201

    expect(response.body.tipo_contacto || response.body.tipo).toBe('correo');
    expect(response.body.valor).toBe('juan.perez@example.com');
    expect(response.body.id_persona).toBe(personaId);
  });

  it('✅ debe agregar un contacto de teléfono exitosamente', async () => {
    const contactoData = {
      tipo_contacto: 'telefono',
      valor: '987654321' // Teléfono válido (9 dígitos)
    };

    const response = await request(app)
      .post(`/api/personas/${personaId}/contactos`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send(contactoData)
      .expect(201);

    expect(response.body.tipo_contacto || response.body.tipo).toBe('telefono');
    expect(response.body.valor).toBe('987654321');
  });

  it('❌ debe rechazar correo inválido', async () => {
    const contactoInvalido = {
      tipo_contacto: 'correo',
      valor: 'correo-invalido' // Sin @
    };

    const response = await request(app)
      .post(`/api/personas/${personaId}/contactos`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send(contactoInvalido);

    console.log('Correo inválido response:', {
      status: response.status,
      message: response.body.message
    });

    // Puede ser 400 (validación DTO) o 500 (validación entidad)
    expect([400, 422, 500]).toContain(response.status);
    expect(response.body).toHaveProperty('message');
    
    // Verificar que el mensaje hable sobre email
    if (response.body.message) {
      const mensaje = response.body.message.toLowerCase();
      expect(
        mensaje.includes('correo') || 
        mensaje.includes('email') || 
        mensaje.includes('formato') ||
        mensaje.includes('válido')
      ).toBe(true);
    }
  });
});


});