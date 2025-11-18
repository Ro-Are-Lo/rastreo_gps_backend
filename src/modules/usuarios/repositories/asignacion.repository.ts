//src/modules/usuarios/repositories/asignacion.repository.ts
import { prisma } from '../../../config/prisma';
import { CrearAsignacionDto } from '../dto/crearAsignacion.dto';
import { ActualizarAsignacionDto } from '../dto/actualizarAsignacion.dto';

export class AsignacionRepository {
  async create(data: CrearAsignacionDto) {
    return prisma.asignacion.create({ data });
  }

  async findById(id: number) {
    return prisma.asignacion.findUnique({ where: { id } });
  }

  async update(id: number, data: ActualizarAsignacionDto) {
    return prisma.asignacion.update({
      where: { id },
      data: { ...data, fecha_modificacion: new Date() },
    });
  }

  async softDelete(id: number) {
    return prisma.asignacion.update({
      where: { id },
      data: { activo: false, eliminado: true, fecha_modificacion: new Date() },
    });
  }

  async listByUsuario(id_usuario: number) {
    return prisma.asignacion.findMany({ where: { id_usuario, eliminado: false } });
  }

  async listByVehiculo(id_vehiculo: number) {
    return prisma.asignacion.findMany({ where: { id_vehiculo, eliminado: false } });
  }
}
