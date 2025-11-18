// src/modules/persona/repository/persona.repository.ts
import { prisma } from '../../../config/prisma';
import { CrearPersonaDto } from '../dto/crear.persona';
import {actualizarPersonaDto  } from '../dto/actualizar.persona';

export class PersonaRepository {


  //create una nueva persona
  async create(data: CrearPersonaDto) {
    return prisma.persona.create({ data, });
  }

  //buscar persona por id
  async findById(id: number) {
    return prisma.persona.findUnique({
      where: { id },
    });
  }

  //buscar persona activa por id
  async findByIdActive(id: number) {
    return prisma.persona.findFirst({
      where: { id, eliminado: false },
    });
  }

  //obtener todas las personas
  async findAll(onlyActive = true) {
    const where = onlyActive ? { eliminado: false } : {};

    return prisma.persona.findMany({
      where,
      orderBy: {
        fecha_creacion: 'desc',
      },
    });
  }

//actualizar persona
  async update(id: number, data: actualizarPersonaDto) {
    return prisma.persona.update({
      where: { id },
      data: {
        ...data,
        fecha_modificacion: new Date(),
      },
    });
  }

  //eliminar persona logica (soft delete)
  async softDelete(id: number) {
    return prisma.persona.update({
      where: { id },
      data: {
        activo: false,
        eliminado: true,
        fecha_modificacion: new Date(),
      },
    });
  }
}
