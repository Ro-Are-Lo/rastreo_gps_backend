// src/modules/vehiculo/repositories/ubicacion.repository.ts (REFACTORIZADO)
import { prisma } from '../../../config/prisma';
import { UbicacionEntity } from '../entities/ubicacion.entity';
import { AppError } from '../../../core/errors/AppError';

export class UbicacionRepository {
  async crear(entity: UbicacionEntity): Promise<UbicacionEntity> {
    try {
      // ✅ Verificar que el vehículo existe
      const vehiculo = await prisma.vehiculo.findUnique({
        where: { id: entity.id_vehiculo, eliminado: false }
      });
      
      if (!vehiculo) {
        throw new AppError('Vehículo no encontrado', 404);
      }

      // ✅ Validar ubicación
      if (!entity.esUbicacionValida()) {
        throw new AppError('Coordenadas inválidas', 400);
      }

      const dbResult = await prisma.ubicacion.create({
        data: entity.toPrisma()
      });

      return new UbicacionEntity(dbResult);
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Error al crear ubicación', 500);
    }
  }

  async buscarPorVehiculo(id_vehiculo: number): Promise<UbicacionEntity[]> {
    const dbResults = await prisma.ubicacion.findMany({
      where: { id_vehiculo, eliminado: false },
      orderBy: { fecha_hora: 'desc' }
    });
    
    return dbResults.map(result => new UbicacionEntity(result));
  }

  async buscarUltimaUbicacion(id_vehiculo: number): Promise<UbicacionEntity | null> {
    const dbResult = await prisma.ubicacion.findFirst({
      where: { id_vehiculo, eliminado: false },
      orderBy: { fecha_hora: 'desc' }
    });
    
    return dbResult ? new UbicacionEntity(dbResult) : null;
  }

  async buscarPorId(id: number): Promise<UbicacionEntity | null> {
    const dbResult = await prisma.ubicacion.findUnique({
      where: { id, eliminado: false }
    });
    
    return dbResult ? new UbicacionEntity(dbResult) : null;
  }

  async eliminarSuavemente(id: number): Promise<UbicacionEntity> {
    const existe = await this.buscarPorId(id);
    
    if (!existe) {
      throw new AppError('Ubicación no encontrada', 404);
    }

    const dbResult = await prisma.ubicacion.update({
      where: { id },
      data: {
        activo: false,
        eliminado: true,
        fecha_modificacion: new Date()
      }
    });

    return new UbicacionEntity(dbResult);
  }

  async buscarHistorial(
    id_vehiculo: number, 
    fechaInicio?: Date, 
    fechaFin?: Date,
    limit: number = 1000
  ): Promise<UbicacionEntity[]> {
    const where: any = { 
      id_vehiculo, 
      eliminado: false 
    };

    if (fechaInicio || fechaFin) {
      where.fecha_hora = {};
      if (fechaInicio) where.fecha_hora.gte = fechaInicio;
      if (fechaFin) where.fecha_hora.lte = fechaFin;
    }

    const dbResults = await prisma.ubicacion.findMany({
      where,
      orderBy: { fecha_hora: 'desc' },
      take: limit
    });
    
    return dbResults.map(result => new UbicacionEntity(result));
  }
}