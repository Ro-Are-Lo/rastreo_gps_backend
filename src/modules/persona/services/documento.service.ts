// src/modules/persona/services/documento.service.ts
import { DocumentoRepository } from '../repositories/documento.repository';
import { AppError } from '../../../core/errors/AppError';
import { CrearDocumentoDto } from '../dto/crear.documento';
import { actualizarDocumentoDto } from '../dto/actualizar.documento';
export class DocumentoService {
  private repo = new DocumentoRepository();

  async agregarDocumento(dto: CrearDocumentoDto) {
    const exists = await this.repo.findByNumber(dto.nro_documento);
    if (exists) throw new AppError('Número de documento ya registrado', 400);

    return this.repo.create(dto);
  }

  async listarDocumentos(id_persona: number) {
    return this.repo.findByPersona(id_persona);
  }

  async actualizarDocumento(id: number, dto: actualizarDocumentoDto) {
    const doc = await this.repo.findById(id);
    if (!doc || doc.eliminado) throw new AppError('Documento no encontrado', 404);

    return this.repo.update(id, dto);
  }

  async eliminarDocumento(id: number) {
    const doc = await this.repo.findById(id);
    if (!doc || doc.eliminado) throw new AppError('Documento no encontrado', 404);

    await this.repo.softDelete(id);
    return { success: true, message: 'Documento eliminado correctamente' };
  }
}
