// src/test/setup.ts
import { prisma } from '../config/prisma';

// Configurar timeout más largo para tests de integración
jest.setTimeout(10000);

// Variables globales para tests
global.testUser = {
  username: 'test.user',
  password: 'password123'
};

// Limpiar DB antes de cada suite de tests
beforeAll(async () => {
  console.log('🧹 Preparando base de datos para tests...');
  
  try {
    // Usar transacción para limpiar datos de forma segura
    await prisma.$transaction(async (tx) => {
      // Desactivar restricciones temporalmente
      await tx.$executeRaw`SET session_replication_role = 'replica';`;
      
      // Limpiar tablas en orden inverso de dependencias
      const tables = [
        'UsuarioRol', 'Conexion', 'Asignacion', 'Ubicacion',
        'Vehiculo', 'Usuario', 'Rol', 'Documento', 'Contacto', 'Persona'
      ];
      
      for (const table of tables) {
        try {
          await tx.$executeRawUnsafe(`TRUNCATE TABLE "${table}" RESTART IDENTITY CASCADE`);
          console.log(`  ✅ Tabla ${table} limpiada`);
        } catch (error: any) {
          console.log(`  ⚠️  Tabla ${table}: ${error.message}`);
        }
      }
      
      // Reactivar restricciones
      await tx.$executeRaw`SET session_replication_role = 'origin';`;
    });
    
    console.log('✅ Base de datos lista para tests');
  } catch (error) {
    console.error('❌ Error limpiando base de datos:', error);
  }
});

afterAll(async () => {
  await prisma.$disconnect();
});

// Tipado para variables globales
declare global {
  var testUser: {
    username: string;
    password: string;
  };
}