// src/modules/persona/repositories/contacto.repository.ts
import { prisma } from '../../../config/prisma';
import { ContactoEntity } from '../entities/contacto.entity';
import { AppError } from '../../../core/errors/AppError';

export class ContactoRepository {
  async crear(entity: ContactoEntity): Promise<ContactoEntity> {
    try {
      const dbResult = await prisma.contacto.create({
        data: entity.toPrisma()
      });
      return new ContactoEntity(dbResult);
    } catch (error) {
      throw new AppError('Error al crear contacto', 500);
    }
  }

  async buscarPorPersona(id_persona: number): Promise<ContactoEntity[]> {
    const dbResults = await prisma.contacto.findMany({
      where: { id_persona, eliminado: false },
      orderBy: { fecha_creacion: 'desc' }
    });
    
    return dbResults.map(result => new ContactoEntity(result));
  }

  async buscarPorId(id: number): Promise<ContactoEntity | null> {
    const dbResult = await prisma.contacto.findUnique({
      where: { id, eliminado: false }
    });
    return dbResult ? new ContactoEntity(dbResult) : null;
  }

  async actualizar(id: number, entity: ContactoEntity): Promise<ContactoEntity> {
    const existe = await this.buscarPorId(id);
    if (!existe) {
      throw new AppError('Contacto no encontrado', 404);
    }

    const dbResult = await prisma.contacto.update({
      where: { id },
      data: {
        tipo: entity.tipo,
        valor: entity.valor,
        fecha_modificacion: new Date()
      }
    });
    
    return new ContactoEntity(dbResult);
  }

  async eliminarSuavemente(id: number): Promise<ContactoEntity> {
    const existe = await this.buscarPorId(id);
    if (!existe) {
      throw new AppError('Contacto no encontrado', 404);
    }

    const dbResult = await prisma.contacto.update({
      where: { id },
      data: {
        activo: false,
        eliminado: true,
        fecha_modificacion: new Date()
      }
    });
    
    return new ContactoEntity(dbResult);
  }
}