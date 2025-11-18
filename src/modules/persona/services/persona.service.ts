// src/modules/persona/service/persona.service.ts
import { PersonaRepository } from '../repositories/persona.repository';
import { AppError } from '../../../core/errors/AppError';
import { CrearPersonaDto } from '../dto/crear.persona';
import{ actualizarPersonaDto as ActualizarPersonaDto } from '../dto/actualizar.persona';

export class PersonaService {
  private repo = new PersonaRepository();
  

  async crearPersona(dto: CrearPersonaDto) {
    // ejemplo: validar nombre único? (no hay constraint). Aquí podrías normalizar datos.
    const persona = await this.repo.create(dto);
    return persona;
  }

  //obtener persona por id
  async obtenerPersona(id: number) {
    const persona = await this.repo.findByIdActive(id);
    if (!persona) throw new AppError('Persona no encontrada', 404);
    return persona;
  }

  //listar personas con paginación simple
  async listarPersonas(pagina = 1, perPage = 20) {
    // implementa paginación simple en service si lo quieres
    const all = await this.repo.findAll(true);
    // nota: para grandes volúmenes mejor usar findMany con skip/take
    const start = (pagina - 1) * perPage;
    return {
      total: all.length,
      data: all.slice(start, start + perPage),
    };
  }
//actualizar persona
  async actualizarPersona(id: number, dto: ActualizarPersonaDto) {
    const persona = await this.repo.findById(id);
    if (!persona) throw new AppError('Persona no encontrada', 404);
    const updated = await this.repo.update(id, dto);
    return updated;
  }
//eliminar persona logica (soft delete)
  async eliminarPersona(id: number) {
    const persona = await this.repo.findById(id);
    if (!persona) throw new AppError('Persona no encontrada', 404);
    await this.repo.softDelete(id);
    return { success: true };
  }


}
