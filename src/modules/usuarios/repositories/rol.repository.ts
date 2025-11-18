//src/modules/usuarios/repositories/rol.repository.ts
import { prisma } from '../../../config/prisma';
import { CrearRolDto } from '../dto/crearRol.dto';
import { ActualizarRolDto } from '../dto/actualizarRol.dto';

export class RolRepository {
  async create(data: CrearRolDto) {
    return prisma.rol.create({ data });
  }

  async findById(id: number) {
    return prisma.rol.findUnique({ where: { id } });
  }

  async findByName(nombre: string) {
    return prisma.rol.findUnique({ where: { nombre } });
  }

  async update(id: number, data: ActualizarRolDto) {
    return prisma.rol.update({
      where: { id },
      data: { ...data, fecha_modificacion: new Date() },
    });
  }

  async softDelete(id: number) {
    return prisma.rol.update({
      where: { id },
      data: { activo: false, eliminado: true, fecha_modificacion: new Date() },
    });
  }

  async list() {
    return prisma.rol.findMany({ where: { eliminado: false } });
  }
}
