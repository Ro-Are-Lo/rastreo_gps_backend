//src/modules/vehiculo/repositories/vehiculo.repository.ts
import { prisma } from '../../../config/prisma';
import { CrearVehiculoDto } from '../dto/crearVehiculo.dto';
import { ActualizarVehiculoDto } from '../dto/actualizarVehiculo.dto';

export class VehiculoRepository {
  async create(data: CrearVehiculoDto) {
    return prisma.vehiculo.create({ data });
  }

  async findById(id: number) {
    return prisma.vehiculo.findUnique({ where: { id } });
  }

  async update(id: number, data: ActualizarVehiculoDto) {
    return prisma.vehiculo.update({
      where: { id },
      data: { ...data, fecha_modificacion: new Date() },
    });
  }

  async softDelete(id: number) {
    return prisma.vehiculo.update({
      where: { id },
      data: { activo: false, eliminado: true, fecha_modificacion: new Date() },
    });
  }

  async listAll() {
    return prisma.vehiculo.findMany({ where: { eliminado: false } });
  }
}
