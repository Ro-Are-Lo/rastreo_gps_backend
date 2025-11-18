//src/modules/usuarios/services/rol.service.ts
import { RolRepository } from '../repositories/rol.repository';
import { CrearRolDto } from '../dto/crearRol.dto';
import { ActualizarRolDto } from '../dto/actualizarRol.dto';
import { AppError } from '../../../core/errors/AppError';

export class RolService {
  private repo = new RolRepository();

  async crearRol(dto: CrearRolDto) {
    const exists = await this.repo.findByName(dto.nombre);
    if (exists) throw new AppError('Rol ya existe', 400);
    return this.repo.create(dto);
  }

  async actualizarRol(id: number, dto: ActualizarRolDto) {
    const rol = await this.repo.findById(id);
    if (!rol || rol.eliminado) throw new AppError('Rol no encontrado', 404);
    return this.repo.update(id, dto);
  }

  async eliminarRol(id: number) {
    const rol = await this.repo.findById(id);
    if (!rol || rol.eliminado) throw new AppError('Rol no encontrado', 404);
    return this.repo.softDelete(id);
  }

  async listarRoles() {
    return this.repo.list();
  }
}
