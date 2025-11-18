//src/modules/vehiculo/repositories/ubicacion.repository.ts
import { prisma } from '../../../config/prisma';
import { CrearUbicacionDto } from '../dto/crearUbicacion.dto';

export class UbicacionRepository {
  async create(data: CrearUbicacionDto) {
    return prisma.ubicacion.create({ data });
  }

  async listByVehiculo(id_vehiculo: number) {
    return prisma.ubicacion.findMany({
      where: { id_vehiculo, eliminado: false },
      orderBy: { fecha_hora: 'desc' }
    });
  }
}
