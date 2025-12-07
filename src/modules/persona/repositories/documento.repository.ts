// src/modules/persona/repositories/documento.repository.ts
import { prisma } from '../../../config/prisma';
import { DocumentoEntity } from '../entities/documento.entity';
import { AppError } from '../../../core/errors/AppError';

export class DocumentoRepository {
  async crear(entity: DocumentoEntity): Promise<DocumentoEntity> {
    try {
      const dbResult = await prisma.documento.create({
        data: entity.toPrisma()
      });
      return new DocumentoEntity(dbResult);
    } catch (error) {
      throw new AppError('Error al crear documento', 500);
    }
  }

  async buscarPorPersona(id_persona: number): Promise<DocumentoEntity[]> {
    const dbResults = await prisma.documento.findMany({
      where: { id_persona, eliminado: false },
      orderBy: { fecha_creacion: 'desc' }
    });
    
    return dbResults.map(result => new DocumentoEntity(result));
  }

  async buscarPorId(id: number): Promise<DocumentoEntity | null> {
    const dbResult = await prisma.documento.findUnique({
      where: { id, eliminado: false }
    });
    return dbResult ? new DocumentoEntity(dbResult) : null;
  }

  async buscarPorNumero(nro_documento: string): Promise<DocumentoEntity | null> {
    const dbResult = await prisma.documento.findUnique({
      where: { nro_documento }
    });
    return dbResult ? new DocumentoEntity(dbResult) : null;
  }

  async actualizar(id: number, entity: DocumentoEntity): Promise<DocumentoEntity> {
    const existe = await this.buscarPorId(id);
    if (!existe) {
      throw new AppError('Documento no encontrado', 404);
    }

    const dbResult = await prisma.documento.update({
      where: { id },
      data: {
        tipo_documento: entity.tipo_documento,
        nro_documento: entity.nro_documento,
        fecha_modificacion: new Date()
      }
    });
    
    return new DocumentoEntity(dbResult);
  }

  async eliminarSuavemente(id: number): Promise<DocumentoEntity> {
    const existe = await this.buscarPorId(id);
    if (!existe) {
      throw new AppError('Documento no encontrado', 404);
    }

    const dbResult = await prisma.documento.update({
      where: { id },
      data: {
        activo: false,
        eliminado: true,
        fecha_modificacion: new Date()
      }
    });
    
    return new DocumentoEntity(dbResult);
  }
}