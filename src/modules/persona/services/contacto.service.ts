// src/modules/persona/services/contacto.service.ts
import { ContactoRepository } from '../repositories/contacto.repository';
import { ContactoEntity } from '../entities/contacto.entity';
import { CrearContactoDto } from '../dto/crear.contacto';
import { ActualizarContactoDto } from '../dto/actualizar.contacto';

export class ContactoService {
  private contactoRepo = new ContactoRepository();


  // En contacto.service.ts
async agregarContacto(dto: CrearContactoDto): Promise<ContactoEntity> {
  // ✅ Validar que id_persona esté presente
  if (!dto.id_persona) {
    throw new Error('id_persona es requerido');
  }
  
  // ✅ Convertir DTO a Entity (mapear tipo_contacto → tipo)
  const contactoEntity = new ContactoEntity({
    id_persona: dto.id_persona, // ← Ahora seguro que es number
    tipo: dto.tipo_contacto,
    valor: dto.valor
  });

  // Validar formato del contacto
  if (!contactoEntity.validarFormato()) {
    throw new Error('Formato de contacto inválido');
  }

  return this.contactoRepo.crear(contactoEntity);
}


  async listarContactos(id_persona: number): Promise<ContactoEntity[]> {
    return this.contactoRepo.buscarPorPersona(id_persona);
  }

  async actualizarContacto(id: number, dto: ActualizarContactoDto): Promise<ContactoEntity> {
    // Obtener contacto existente
    const contactoExistente = await this.contactoRepo.buscarPorId(id);
    if (!contactoExistente) {
      throw new Error('Contacto no encontrado');
    }

    // Crear nueva entity con cambios
    const contactoActualizado = new ContactoEntity({
      ...contactoExistente,
      tipo: dto.tipo_contacto ?? contactoExistente.tipo,
      valor: dto.valor ?? contactoExistente.valor,
      fecha_modificacion: new Date()
    });

    // Validar formato
    if (!contactoActualizado.validarFormato()) {
      throw new Error('Formato de contacto inválido');
    }

    return this.contactoRepo.actualizar(id, contactoActualizado);
  }

  async eliminarContacto(id: number): Promise<ContactoEntity> {
    return this.contactoRepo.eliminarSuavemente(id);
  }
}