// src/modules/usuarios/services/rol.service.ts (REFACTORIZADO)
import { RolRepository } from '../repositories/rol.repository';
import { RolEntity } from '../entities/rol.entity';
import { CrearRolDto } from '../dto/crearRol.dto';
import { ActualizarRolDto } from '../dto/actualizarRol.dto';
import { AppError } from '../../../core/errors/AppError';

export class RolService {
  private repo = new RolRepository();

  async crearRol(dto: CrearRolDto): Promise<RolEntity> {
    // ✅ Convertir DTO a Entity
    const rolEntity = new RolEntity({
      nombre: dto.nombre
    });

    // Validar si ya existe
    const existe = await this.repo.buscarPorNombre(dto.nombre);
    if (existe) {
      throw new AppError('El rol ya existe',400);
    }

    // Validar nombre
    if (!rolEntity.esNombreValido()) {
      throw new Error('Nombre de rol inválido');
    }

    return this.repo.crear(rolEntity);
  }

  async obtenerRol(id: number): Promise<RolEntity> {
    const rol = await this.repo.buscarPorId(id);
    if (!rol) {
      throw new Error('Rol no encontrado');
    }
    return rol;
  }

  async actualizarRol(id: number, dto: ActualizarRolDto): Promise<RolEntity> {
    // Obtener rol existente
    const rolExistente = await this.obtenerRol(id);
    
    // Crear nueva entity con cambios
    const rolActualizado = new RolEntity({
      ...rolExistente,
      nombre: dto.nombre ?? rolExistente.nombre,
      activo: dto.activo ?? rolExistente.activo,
      fecha_modificacion: new Date()
    });

    // Si cambia el nombre, verificar que no exista
    if (dto.nombre && dto.nombre !== rolExistente.nombre) {
      const existe = await this.repo.buscarPorNombre(dto.nombre);
      if (existe) {
        throw new Error('El nombre de rol ya existe');
      }
    }

    // Validar nombre
    if (!rolActualizado.esNombreValido()) {
      throw new Error('Nombre de rol inválido');
    }

    return this.repo.actualizar(id, rolActualizado);
  }

  async eliminarRol(id: number): Promise<RolEntity> {
    return this.repo.eliminarSuavemente(id);
  }

  async listarRoles(): Promise<RolEntity[]> {
    return this.repo.buscarTodosRoles();
  }
}