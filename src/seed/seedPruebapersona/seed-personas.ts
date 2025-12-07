// src/seed/seedPruebapersona/seed-personas.ts (COMPLETO CORREGIDO)
import { PersonaEntity } from '../../modules/persona/entities/persona.entity';
import { prisma } from '../../config/prisma';

export async function seedPersonas() {
  try {
    console.log('=== Sembrando datos de prueba (Personas) ===');

    // Persona 1 - Crear directamente con prisma, NO usar PersonaEntity si tiene problemas
    const persona1Data = {
      nombre: 'Juan',
      apellido_paterno: 'Perez',
      apellido_materno: 'Gomez',
      genero: 'M' as const,
      foto_url: null
    };

    // Verificar si existe persona con ID 1
    const existe1 = await prisma.persona.findUnique({
      where: { id: 1 }
    });

    if (!existe1) {
      await prisma.persona.create({
        data: {
          id: 1, // ID explícito para seed
          ...persona1Data,
          fecha_creacion: new Date(),
          activo: true,
          eliminado: false
        }
      });
      console.log('✅ Persona 1 creada (Juan Perez)');
    } else {
      console.log('✅ Persona 1 ya existe');
    }

    // Persona 2
    const persona2Data = {
      nombre: 'Maria',
      apellido_paterno: 'Lopez',
      apellido_materno: 'Santos',
      genero: 'F' as const,
      foto_url: null
    };

    const existe2 = await prisma.persona.findUnique({
      where: { id: 2 }
    });

    if (!existe2) {
      await prisma.persona.create({
        data: {
          id: 2,
          ...persona2Data,
          fecha_creacion: new Date(),
          activo: true,
          eliminado: false
        }
      });
      console.log('✅ Persona 2 creada (Maria Lopez)');
    } else {
      console.log('✅ Persona 2 ya existe');
    }

    console.log('✅ Seed de personas completado');
    
  } catch (error) {
    console.error('❌ Error en seed de personas:', error);
    throw error;
  }
}

// Ejecutar si es script principal
if (require.main === module) {
  seedPersonas()
    .then(() => {
      console.log('✅ Script de personas completado');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Error:', error);
      process.exit(1);
    });
}