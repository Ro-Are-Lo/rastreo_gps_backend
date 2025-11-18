// src/modules/persona/repositories/documento.repository.ts
import { prisma } from '../../../config/prisma';
import { CrearDocumentoDto } from '../dto/crear.documento';
import { actualizarDocumentoDto } from '../dto/actualizar.documento';

export class DocumentoRepository {
  create(data: CrearDocumentoDto) {
    return prisma.documento.create({ data });
  }

  findByPersona(id_persona: number) {
    return prisma.documento.findMany({
      where: { id_persona, eliminado: false },
      orderBy: { fecha_creacion: 'desc' },
    });
  }

  findById(id: number) {
    return prisma.documento.findUnique({ where: { id } });
  }

  findByNumber(nro_documento: string) {
    return prisma.documento.findUnique({
      where: { nro_documento },
    });
  }

  update(id: number, data: actualizarDocumentoDto) {
    return prisma.documento.update({
      where: { id },
      data: { ...data, fecha_modificacion: new Date() },
    });
  }

  softDelete(id: number) {
    return prisma.documento.update({
      where: { id },
      data: {
        activo: false,
        eliminado: true,
        fecha_modificacion: new Date(),
      },
    });
  }
}
