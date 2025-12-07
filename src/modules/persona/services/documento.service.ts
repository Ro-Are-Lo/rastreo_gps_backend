// src/modules/persona/services/documento.service.ts
import { DocumentoRepository } from '../repositories/documento.repository';
import { DocumentoEntity } from '../entities/documento.entity';
import { CrearDocumentoDto } from '../dto/crear.documento';
import { ActualizarDocumentoDto } from '../dto/actualizar.documento';

export class DocumentoService {
  private repo = new DocumentoRepository();

  async agregarDocumento(dto: CrearDocumentoDto): Promise<DocumentoEntity> {
    // ✅ Convertir DTO a Entity
    const documentoEntity = new DocumentoEntity({
      id_persona: dto.id_persona,
      tipo_documento: dto.tipo_documento,
      nro_documento: dto.nro_documento
    });

    // Validar si ya existe el número
    const existe = await this.repo.buscarPorNumero(dto.nro_documento);
    if (existe) {
      throw new Error('Número de documento ya registrado');
    }

    // Validar formato
    if (!documentoEntity.validarFormato()) {
      throw new Error('Formato de documento inválido');
    }

    return this.repo.crear(documentoEntity);
  }

  async listarDocumentos(id_persona: number): Promise<DocumentoEntity[]> {
    return this.repo.buscarPorPersona(id_persona);
  }

  async actualizarDocumento(id: number, dto: ActualizarDocumentoDto): Promise<DocumentoEntity> {
    // Obtener documento existente
    const documentoExistente = await this.repo.buscarPorId(id);
    if (!documentoExistente) {
      throw new Error('Documento no encontrado');
    }

    // Si cambia el número, verificar que no exista
    if (dto.nro_documento && dto.nro_documento !== documentoExistente.nro_documento) {
      const existe = await this.repo.buscarPorNumero(dto.nro_documento);
      if (existe) {
        throw new Error('Número de documento ya registrado');
      }
    }

    // Crear nueva entity con cambios
    const documentoActualizado = new DocumentoEntity({
      ...documentoExistente,
      tipo_documento: dto.tipo_documento ?? documentoExistente.tipo_documento,
      nro_documento: dto.nro_documento ?? documentoExistente.nro_documento,
      fecha_modificacion: new Date()
    });

    // Validar formato
    if (!documentoActualizado.validarFormato()) {
      throw new Error('Formato de documento inválido');
    }

    return this.repo.actualizar(id, documentoActualizado);
  }

  async eliminarDocumento(id: number): Promise<DocumentoEntity> {
    return this.repo.eliminarSuavemente(id);
  }
}