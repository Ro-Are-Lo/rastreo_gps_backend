// src/modules/persona/repositories/contacto.repository.ts
import { prisma } from '../../../config/prisma';
import { CrearContactoDto } from '../dto/crear.contacto';
import { ActualizarContactoDto } from '../dto/actualizar.contacto';
export class ContactoRepository {

  async create(data: CrearContactoDto) {
    return prisma.contacto.create({ data });
  }

  async findByPersona(id_persona: number) {
    return prisma.contacto.findMany({
      where: { id_persona, eliminado: false },
      orderBy: { fecha_creacion: 'desc' },
    });
  }

  async findById(id: number) {
    return prisma.contacto.findUnique({ where: { id } });
  }

  async update(id: number, data: ActualizarContactoDto) {
    return prisma.contacto.update({
      where: { id },
      data: { ...data, fecha_modificacion: new Date() },
    });
  }

  async softDelete(id: number) {
    return prisma.contacto.update({
      where: { id },
      data: {
        activo: false,
        eliminado: true,
        fecha_modificacion: new Date(),
      },
    });
  }
}
