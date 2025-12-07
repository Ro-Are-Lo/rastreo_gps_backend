// src/modules/usuarios/repositories/rol.repository.ts (REFACTORIZADO)
import { prisma } from '../../../config/prisma';
import { RolEntity } from '../entities/rol.entity';
import { AppError } from '../../../core/errors/AppError';

export class RolRepository {
  async crear(entity: RolEntity): Promise<RolEntity> {
    try {
      const dbResult = await prisma.rol.create({
        data: entity.toPrisma()
      });
      return new RolEntity(dbResult);
    } catch (error) {
      throw new AppError('Error al crear rol', 500);
    }
  }

  async buscarPorId(id: number): Promise<RolEntity | null> {
    const dbResult = await prisma.rol.findFirst({
      where: { id, eliminado: false }
    });
    return dbResult ? new RolEntity(dbResult) : null;
  }

  async buscarPorNombre(nombre: string): Promise<RolEntity | null> {
    const dbResult = await prisma.rol.findFirst({
      where: { nombre, eliminado: false }
    });
    return dbResult ? new RolEntity(dbResult) : null;
  }

  async actualizar(id: number, entity: RolEntity): Promise<RolEntity> {
    const existe = await this.buscarPorId(id);
    if (!existe) {
      throw new AppError('Rol no encontrado', 404);
    }

    const dbResult = await prisma.rol.update({
      where: { id },
      data: entity.toPrisma()
    });
    return new RolEntity(dbResult);
  }

  async eliminarSuavemente(id: number): Promise<RolEntity> {
    const existe = await this.buscarPorId(id);
    if (!existe) {
      throw new AppError('Rol no encontrado', 404);
    }

    const dbResult = await prisma.rol.update({
      where: { id },
      data: {
        activo: false,
        eliminado: true,
        fecha_modificacion: new Date()
      }
    });
    return new RolEntity(dbResult);
  }

  async buscarTodosRoles(): Promise<RolEntity[]> {
    const dbResults = await prisma.rol.findMany({
      where: { eliminado: false },
      orderBy: { fecha_creacion: 'desc' }
    });
    return dbResults.map(result => new RolEntity(result));
  }
}