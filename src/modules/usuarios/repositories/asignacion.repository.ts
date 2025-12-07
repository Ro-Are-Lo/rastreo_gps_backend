// src/modules/usuarios/repositories/asignacion.repository.ts (REFACTORIZADO)
import { prisma } from '../../../config/prisma';
import { AsignacionEntity } from '../entities/asignacion.entity';
import { AppError } from '../../../core/errors/AppError';

export class AsignacionRepository {
  
   async crear(entity: AsignacionEntity): Promise<AsignacionEntity> {
    try {
      const dbResult = await prisma.asignacion.create({
        data: entity.toPrisma()
      });
      return new AsignacionEntity(dbResult);
    } catch (error: any) {
      // ✅ Manejar errores específicos de Prisma
      if (error.code === 'P2003') {
        throw new AppError('Usuario o vehículo no existe', 400);
      }
      if (error.code === 'P2002') {
        throw new AppError('Asignación duplicada', 400);
      }
      throw new AppError(`Error al crear asignación: ${error.message}`, 500);
    }
  }



  async buscarPorId(id: number): Promise<AsignacionEntity | null> {
    const dbResult = await prisma.asignacion.findFirst({
      where: { id, eliminado: false }
    });
    return dbResult ? new AsignacionEntity(dbResult) : null;
  }

  async actualizar(id: number, entity: AsignacionEntity): Promise<AsignacionEntity> {
    const existe = await this.buscarPorId(id);
    if (!existe) {
      throw new AppError('Asignación no encontrada', 404);
    }

    const dbResult = await prisma.asignacion.update({
      where: { id },
      data: entity.toPrisma()
    });
    return new AsignacionEntity(dbResult);
  }

  async eliminarSuavemente(id: number): Promise<AsignacionEntity> {
    const existe = await this.buscarPorId(id);
    if (!existe) {
      throw new AppError('Asignación no encontrada', 404);
    }

    const dbResult = await prisma.asignacion.update({
      where: { id },
      data: {
        activo: false,
        eliminado: true,
        fecha_modificacion: new Date()
      }
    });
    return new AsignacionEntity(dbResult);
  }

  async buscarPorUsuario(id_usuario: number): Promise<AsignacionEntity[]> {
    const dbResults = await prisma.asignacion.findMany({
      where: { id_usuario, eliminado: false }
    });
    return dbResults.map(result => new AsignacionEntity(result));
  }

  async buscarPorVehiculo(id_vehiculo: number): Promise<AsignacionEntity[]> {
    const dbResults = await prisma.asignacion.findMany({
      where: { id_vehiculo, eliminado: false }
    });
    return dbResults.map(result => new AsignacionEntity(result));
  }
}