// src/modules/usuarios/repositories/conexion.repository.ts (REFACTORIZADO)
import { prisma } from '../../../config/prisma';
import { ConexionEntity } from '../entities/conexion.entity';
import { AppError } from '../../../core/errors/AppError';

export class ConexionRepository {
  

   async crear(entity: ConexionEntity): Promise<ConexionEntity> {
    try {
      const dbResult = await prisma.conexion.create({
        data: entity.toPrisma()
      });
      return new ConexionEntity(dbResult);
    } catch (error: any) {
      // ✅ Manejar errores específicos de Prisma
      if (error.code === 'P2003') {
        throw new AppError('Usuario o vehículo no existe', 400);
      }
      throw new AppError(`Error al crear conexión: ${error.message}`, 500);
    }
  }


  async buscarPorId(id: number): Promise<ConexionEntity | null> {
    const dbResult = await prisma.conexion.findFirst({
      where: { id, eliminado: false }
    });
    return dbResult ? new ConexionEntity(dbResult) : null;
  }

  async desconectar(id: number): Promise<ConexionEntity> {
    const existe = await this.buscarPorId(id);
    if (!existe) {
      throw new AppError('Conexión no encontrada', 404);
    }

    const dbResult = await prisma.conexion.update({
      where: { id },
      data: {
        estado: false,
        desconectado_at: new Date(),
        fecha_modificacion: new Date()
      }
    });
    return new ConexionEntity(dbResult);
  }

  async eliminarSuavemente(id: number): Promise<ConexionEntity> {
    const existe = await this.buscarPorId(id);
    if (!existe) {
      throw new AppError('Conexión no encontrada', 404);
    }

    const dbResult = await prisma.conexion.update({
      where: { id },
      data: {
        activo: false,
        eliminado: true,
        fecha_modificacion: new Date()
      }
    });
    return new ConexionEntity(dbResult);
  }

  async buscarPorUsuario(id_usuario: number): Promise<ConexionEntity[]> {
    const dbResults = await prisma.conexion.findMany({
      where: { id_usuario, eliminado: false }
    });
    return dbResults.map(result => new ConexionEntity(result));
  }

  async buscarPorVehiculo(id_vehiculo: number): Promise<ConexionEntity[]> {
    const dbResults = await prisma.conexion.findMany({
      where: { id_vehiculo, eliminado: false }
    });
    return dbResults.map(result => new ConexionEntity(result));
  }

  async buscarTodasConexiones(): Promise<ConexionEntity[]> {
    const dbResults = await prisma.conexion.findMany({
      where: { eliminado: false },
      orderBy: { fecha_creacion: 'desc' }
    });
    return dbResults.map(result => new ConexionEntity(result));
  }
}