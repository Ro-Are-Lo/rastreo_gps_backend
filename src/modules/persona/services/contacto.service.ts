// src/modules/persona/services/contacto.service.ts
import { ContactoRepository } from '../repositories/contacto.repository';
import { AppError } from '../../../core/errors/AppError';
import { CrearContactoDto } from '../dto/crear.contacto';
import { ActualizarContactoDto } from '../dto/actualizar.contacto';

export class ContactoService {
  private contactoRepo = new ContactoRepository();

  async agregarContacto(dto: CrearContactoDto) {
    // Aquí se podrían agregar validaciones según tipo_contacto, por ejemplo correo único
    return this.contactoRepo.create(dto);
  }

  async listarContactos(id_persona: number) {
    return this.contactoRepo.findByPersona(id_persona);
  }

  async actualizarContacto(id: number, dto: ActualizarContactoDto) {
    const contacto = await this.contactoRepo.findById(id);
    if (!contacto || contacto.eliminado) throw new AppError('Contacto no encontrado', 404);
    return this.contactoRepo.update(id, dto);
  }

  async eliminarContacto(id: number) {
    const contacto = await this.contactoRepo.findById(id);
    if (!contacto || contacto.eliminado) throw new AppError('Contacto no encontrado', 404);
    await this.contactoRepo.softDelete(id);
    return { success: true, message: 'Contacto eliminado' };
  }
}
