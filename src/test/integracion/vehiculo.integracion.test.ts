// src/test/integracion/vehiculo.integracion.test.ts (VERSIÓN CORREGIDA TYPE-SAFE)
import request from 'supertest';
import { app } from '../../index'; // Cambié de '../../app' a '../../index'
import { prisma } from '../../config/prisma';
import { generarToken } from '../../shared/utils/jwt';

describe('🚗 MÓDULO VEHÍCULO - Tests de Integración', () => {
  let token: string;
  let vehiculoId: number;

  beforeAll(async () => {
    try {
      // 1. Crear un usuario de prueba
      const persona = await prisma.persona.create({
        data: {
          nombre: 'Test',
          apellido_paterno: 'Conductor'
        }
      });

      const usuario = await prisma.usuario.create({
        data: {
          id_persona: persona.id,
          username: 'conductor.test',
          password_hash: '$2b$10$hashedpassword' // Hash fijo para tests
        }
      });

      // 2. Generar token JWT
      token = generarToken({
        id: usuario.id,
        username: usuario.username,
        id_persona: usuario.id_persona,
        roles: ['admin', 'supervisor'] // ✅ AGREGAR ESTO - necesario para checkRole

      });

      console.log('✅ Token generado para tests');
    } catch (error: any) {
      console.error('❌ Error en beforeAll:', error.message);
      throw error;
    }
  });

  beforeEach(async () => {
    // LIMPIAR EN ORDEN INVERSO DE DEPENDENCIAS
    try {
      await prisma.ubicacion.deleteMany();
      await prisma.asignacion.deleteMany();
      await prisma.conexion.deleteMany();
      await prisma.vehiculo.deleteMany();
    } catch (error: any) {
      console.warn('⚠️  Error limpiando datos:', error.message || error);
    }
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('Gestión de Vehículos', () => {
    it('✅ debe registrar un vehículo', async () => {
      const vehiculoData = {
        placa: 'TEST-001',
        modelo: 'Toyota Corolla',
        anio: 2023
      };

      const response = await request(app)
        .post('/api/vehiculos')
        .set('Authorization', `Bearer ${token}`)
        .send(vehiculoData);

      console.log('📝 Crear vehículo - Status:', response.status);
      console.log('📝 Crear vehículo - Body:', JSON.stringify(response.body, null, 2));

      // Si es error 500, ver detalles
      if (response.status === 500) {
        console.error('💥 ERROR 500 Detalles:', response.body);
      }

      expect(response.status).toBe(201);
      
      vehiculoId = response.body.id;
      
      expect(response.body.placa).toBe('TEST-001');
      expect(response.body.modelo).toBe('Toyota Corolla');
      expect(response.body.activo).toBe(true);
    });

    it('❌ debe rechazar placa duplicada', async () => {
      // Primero crear un vehículo
      await prisma.vehiculo.create({
        data: { placa: 'DUP-001', modelo: 'Existente' }
      });

      const vehiculoDuplicado = {
        placa: 'DUP-001', // Ya existe
        modelo: 'Honda Civic'
      };

      const response = await request(app)
        .post('/api/vehiculos')
        .set('Authorization', `Bearer ${token}`)
        .send(vehiculoDuplicado);

      console.log('📝 Placa duplicada - Status:', response.status);
      console.log('📝 Placa duplicada - Body:', response.body);

      expect([400, 409]).toContain(response.status); // 400 Bad Request o 409 Conflict
      
      if (response.status >= 400 && response.status < 500) {
        expect(response.body).toHaveProperty('message');
        if (response.body.message) {
          const message = response.body.message.toLowerCase();
          expect(message.includes('placa') || message.includes('exist')).toBe(true);
        }
      }
    });

    it('✅ debe listar vehículos', async () => {
      // Crear algunos vehículos de prueba directamente
      await prisma.vehiculo.createMany({
        data: [
          { placa: 'LIST-001', modelo: 'Modelo 1' },
          { placa: 'LIST-002', modelo: 'Modelo 2' },
          { placa: 'LIST-003', modelo: 'Modelo 3', activo: false }
        ]
      });

      const response = await request(app)
        .get('/api/vehiculos')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
      // Solo debe listar los activos (2 de 3)
      expect(response.body.data).toHaveLength(2);
    });
  });

  describe('Registro de Ubicaciones', () => {
    beforeEach(async () => {
      // Crear vehículo de prueba
      const vehiculo = await prisma.vehiculo.create({
        data: { placa: 'UBI-001', modelo: 'Test Ubicaciones' }
      });
      vehiculoId = vehiculo.id;
    });

    it('✅ debe registrar ubicación GPS', async () => {
      const ubicacionData = {
        id_vehiculo: vehiculoId,
        latitud: -17.7833,
        longitud: -63.1821,
        velocidad_kmh: 45.5
      };

      const response = await request(app)
        .post('/api/ubicaciones')
        .set('Authorization', `Bearer ${token}`)
        .send(ubicacionData);

      console.log('📝 Registrar ubicación - Status:', response.status);
      console.log('📝 Registrar ubicación - Body:', response.body);

      expect(response.status).toBe(201);
      expect(response.body.latitud).toBe(ubicacionData.latitud);
      expect(response.body.longitud).toBe(ubicacionData.longitud);
      expect(response.body.id_vehiculo).toBe(vehiculoId);
      expect(response.body.velocidad_kmh).toBe(ubicacionData.velocidad_kmh);
    });

    it('✅ debe obtener historial de ubicaciones', async () => {
      // Registrar varias ubicaciones directamente
      await prisma.ubicacion.createMany({
        data: [
          { 
            id_vehiculo: vehiculoId, 
            latitud: -17.78, 
            longitud: -63.18,
            velocidad_kmh: 40.0
          },
          { 
            id_vehiculo: vehiculoId, 
            latitud: -17.79, 
            longitud: -63.19,
            velocidad_kmh: 45.5
          }
        ]
      });

      const response = await request(app)
        .get(`/api/ubicaciones/vehiculo/${vehiculoId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty('latitud');
      expect(response.body[0]).toHaveProperty('longitud');
    });

    it('❌ debe rechazar ubicación con vehículo inexistente', async () => {
      const ubicacionData = {
        id_vehiculo: 99999, // ID que no existe
        latitud: -17.7833,
        longitud: -63.1821
      };

      const response = await request(app)
        .post('/api/ubicaciones')
        .set('Authorization', `Bearer ${token}`)
        .send(ubicacionData);

      console.log('📝 Vehículo inexistente - Status:', response.status);
      console.log('📝 Vehículo inexistente - Body:', response.body);

      // Puede ser 400, 404 o 422
      expect(response.status).toBeGreaterThanOrEqual(400);
      expect(response.status).toBeLessThan(500);
      expect(response.body).toHaveProperty('message');
    });
  });
});