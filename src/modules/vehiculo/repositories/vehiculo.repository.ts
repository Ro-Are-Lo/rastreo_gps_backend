// src/modules/vehiculo/repositories/vehiculo.repository.ts (REFACTORIZADO)
import { prisma } from '../../../config/prisma';
import { VehiculoEntity } from '../entities/vehiculo.entity';
import { AppError } from '../../../core/errors/AppError';

export class VehiculoRepository {
  async crear(entity: VehiculoEntity): Promise<VehiculoEntity> {
    try {
      // ✅ Validar si ya existe la placa
      const existe = await prisma.vehiculo.findUnique({
        where: { placa: entity.placa }
      });
      
      if (existe) {
        throw new AppError('La placa ya está registrada', 400);
      }

      const dbResult = await prisma.vehiculo.create({
        data: entity.toPrisma()
      });

      return new VehiculoEntity(dbResult);
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Error al crear vehículo', 500);
    }
  }

  async buscarPorId(id: number): Promise<VehiculoEntity | null> {
    const dbResult = await prisma.vehiculo.findFirst({
      where: { id, eliminado: false }
    });
    
    return dbResult ? new VehiculoEntity(dbResult) : null;
  }

  async buscarPorPlaca(placa: string): Promise<VehiculoEntity | null> {
    const dbResult = await prisma.vehiculo.findUnique({
      where: { placa: placa.toUpperCase() }
    });
    
    return dbResult ? new VehiculoEntity(dbResult) : null;
  }

  async buscarTodos(onlyActive: boolean = true): Promise<VehiculoEntity[]> {
    const where = onlyActive ? { eliminado: false, activo: true } : {};
    
    const dbResults = await prisma.vehiculo.findMany({
      where,
      orderBy: { fecha_creacion: 'desc' }
    });
    
    return dbResults.map(result => new VehiculoEntity(result));
  }

  async actualizar(id: number, entity: VehiculoEntity): Promise<VehiculoEntity> {
    const existe = await this.buscarPorId(id);
    
    if (!existe) {
      throw new AppError('Vehículo no encontrado', 404);
    }

    // Si cambia la placa, verificar que no exista
    if (entity.placa !== existe.placa) {
      const placaExiste = await this.buscarPorPlaca(entity.placa);
      if (placaExiste) {
        throw new AppError('La placa ya está registrada', 400);
      }
    }

    const dbResult = await prisma.vehiculo.update({
      where: { id },
      data: entity.toPrisma()
    });

    return new VehiculoEntity(dbResult);
  }

  async eliminarSuavemente(id: number): Promise<VehiculoEntity> {
    const existe = await this.buscarPorId(id);
    
    if (!existe) {
      throw new AppError('Vehículo no encontrado', 404);
    }

    const dbResult = await prisma.vehiculo.update({
      where: { id },
      data: {
        activo: false,
        eliminado: true,
        fecha_modificacion: new Date()
      }
    });

    return new VehiculoEntity(dbResult);
  }
}