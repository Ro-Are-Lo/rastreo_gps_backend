// src/modules/persona/repositories/persona.repository.ts
import { prisma } from '../../../config/prisma';
import { PersonaEntity } from '../entities/persona.entity';
import { AppError } from '../../../core/errors/AppError';

export class PersonaRepository {
  async crear(entity: PersonaEntity): Promise<PersonaEntity> {
    try {
      const dbResult = await prisma.persona.create({
        data: entity.toPrisma()
      });
      return new PersonaEntity(dbResult);
    } catch (error) {
      throw new AppError('Error al crear persona', 500);
    }
  }

  async buscarPorId(id: number): Promise<PersonaEntity | null> {
    const dbResult = await prisma.persona.findUnique({
      where: { id, eliminado: false }
    });
    return dbResult ? new PersonaEntity(dbResult) : null;
  }

  

  async buscarTodos(onlyActive: boolean = true): Promise<PersonaEntity[]> {
  const where = onlyActive ? { 
    activo: true,      
    eliminado: false   // ← ESTO YA ESTÁ, pero verifica que funcione
  } : {};
  
  const dbResults = await prisma.persona.findMany({
    where,
    orderBy: { fecha_creacion: 'desc' }
  });
  
  return dbResults.map(result => new PersonaEntity(result));
}

  async actualizar(id: number, entity: PersonaEntity): Promise<PersonaEntity> {
    const existe = await this.buscarPorId(id);
    if (!existe) {
      throw new AppError('Persona no encontrada', 404);
    }

    const dbResult = await prisma.persona.update({
      where: { id },
      data: entity.toPrisma()
    });
    
    return new PersonaEntity(dbResult);
  }

  async eliminarSuavemente(id: number): Promise<PersonaEntity> {
    const existe = await this.buscarPorId(id);
    if (!existe) {
      throw new AppError('Persona no encontrada', 404);
    }

    const dbResult = await prisma.persona.update({
      where: { id },
      data: {
        activo: false,
        eliminado: true,
        fecha_modificacion: new Date()
      }
    });
    
    return new PersonaEntity(dbResult);
  }
}