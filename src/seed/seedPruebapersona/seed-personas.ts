import { PrismaClient } from '@prisma/client';
import { PersonaEntity } from '../../modules/persona/entities/persona.entity';

const prisma = new PrismaClient();

export const seedPersonas = async () => {
  const personas: PersonaEntity[] = [
    {
      id: 1,
      nombre: 'Juan',
      apellido_paterno: 'Perez',
      apellido_materno: 'Gomez',
      genero: 'M',
      foto_url: null,
      fecha_creacion: new Date(),
      fecha_modificacion: null,
      activo: true,
      eliminado: false,
    },
    {
      id: 2,
      nombre: 'Ana',
      apellido_paterno: 'Gomez',
      apellido_materno: 'Lopez',
      genero: 'F',
      foto_url: null,
      fecha_creacion: new Date(),
      fecha_modificacion: null,
      activo: true,
      eliminado: false,
    },
  ];

  for (const persona of personas) {
    await prisma.persona.upsert({
      where: { id: persona.id },
      update: persona,
      create: persona,
    });
  }

  console.log('Seed personas completado');
};
