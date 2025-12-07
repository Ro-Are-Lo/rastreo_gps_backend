// src/modules/persona/services/persona.service.ts
import { PersonaRepository } from '../repositories/persona.repository';
import { PersonaEntity } from '../entities/persona.entity';
import { CrearPersonaDto } from '../dto/crear.persona';
import { actualizarPersonaDto } from '../dto/actualizar.persona';

export class PersonaService {
  private personaRepository = new PersonaRepository();

  async crearPersona(dto: CrearPersonaDto): Promise<PersonaEntity> {
    // ✅ Convertir DTO a Entity
    const personaEntity = new PersonaEntity({
      nombre: dto.nombre,
      apellido_paterno: dto.apellido_paterno,
      apellido_materno: dto.apellido_materno,
      genero: dto.genero,
      foto_url: dto.foto_url
    });

    return this.personaRepository.crear(personaEntity);
    
  }async obtenerPersona(id: number): Promise<PersonaEntity> {
  const persona = await this.personaRepository.buscarPorId(id);
  if (!persona) {
    const error: any = new Error('Persona no encontrada');
    error.statusCode = 404; // ← Añade statusCode
    throw error;
  }
  return persona;
}
  async listarPersonas(pagina: number = 1, perPage: number = 20) {
    const todas = await this.personaRepository.buscarTodos(true);
    const start = (pagina - 1) * perPage;
    
    return {
      total: todas.length,
      pagina,
      perPage,
      data: todas.slice(start, start + perPage)
    };
  }

  async actualizarPersona(id: number, dto: actualizarPersonaDto): Promise<PersonaEntity> {
    // 1. Obtener entity existente
    const personaExistente = await this.obtenerPersona(id);
    
    // 2. Crear nueva entity con los cambios
    const personaActualizada = new PersonaEntity({
      ...personaExistente,
      nombre: dto.nombre ?? personaExistente.nombre,
      apellido_paterno: dto.apellido_paterno ?? personaExistente.apellido_paterno,
      apellido_materno: dto.apellido_materno ?? personaExistente.apellido_materno,
      genero: dto.genero ?? personaExistente.genero,
      foto_url: dto.foto_url ?? personaExistente.foto_url,
      fecha_modificacion: new Date()
    });

    return this.personaRepository.actualizar(id, personaActualizada);
  }

  async eliminarPersona(id: number): Promise<PersonaEntity> {
    return this.personaRepository.eliminarSuavemente(id);
  }
}