// src/seed/test-seed.ts
import { prisma } from '../../config/prisma';
import bcrypt from 'bcrypt';

export async function seedTestData() {
  console.log('🌱 Sembrando datos para tests...');

  try {
    // Crear roles básicos
    const roles = await Promise.all([
      prisma.rol.create({ data: { nombre: 'ADMIN' } }),
      prisma.rol.create({ data: { nombre: 'CONDUCTOR' } }),
      prisma.rol.create({ data: { nombre: 'USUARIO' } })
    ]);

    // Crear persona admin
    const personaAdmin = await prisma.persona.create({
      data: {
        nombre: 'Admin',
        apellido_paterno: 'Test',
        genero: 'M'
      }
    });

    // Crear usuario admin
    const usuarioAdmin = await prisma.usuario.create({
      data: {
        id_persona: personaAdmin.id,
        username: 'admin.test',
        password_hash: await bcrypt.hash('password123', 10),
        activo: true
      }
    });

    // Asignar rol ADMIN
    await prisma.usuarioRol.create({
      data: {
        id_usuario: usuarioAdmin.id,
        id_rol: roles[0].id // ADMIN
      }
    });

    // Crear vehículos de prueba
    await prisma.vehiculo.createMany({
      data: [
        { placa: 'TEST-001', modelo: 'Toyota Corolla', anio: 2022 },
        { placa: 'TEST-002', modelo: 'Honda Civic', anio: 2021 },
        { placa: 'TEST-003', modelo: 'Ford Focus', anio: 2020, activo: false }
      ]
    });

    console.log('✅ Datos de prueba creados:');
    console.log(`   👤 Usuario: admin.test / password123`);
    console.log(`   🚗 Vehículos: 3 creados (2 activos, 1 inactivo)`);
    console.log(`   👥 Roles: ADMIN, CONDUCTOR, USUARIO`);

  } catch (error) {
    console.error('❌ Error sembrando datos:', error);
    throw error;
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  seedTestData()
    .then(() => {
      console.log('🌱 Seed completado exitosamente');
      process.exit(0);
    })
    .catch(error => {
      console.error('❌ Seed falló:', error);
      process.exit(1);
    });
}