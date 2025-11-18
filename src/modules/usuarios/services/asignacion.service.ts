//src/modules/usuarios/services/asignacion.service.ts
import { AsignacionRepository } from '../repositories/asignacion.repository';
import { CrearAsignacionDto } from '../dto/crearAsignacion.dto';
import { ActualizarAsignacionDto } from '../dto/actualizarAsignacion.dto';
import { AppError } from '../../../core/errors/AppError';

export class AsignacionService {
  private repo = new AsignacionRepository();

  async crearAsignacion(dto: CrearAsignacionDto) {
    return this.repo.create(dto);
  }

  async actualizarAsignacion(id: number, dto: ActualizarAsignacionDto) {
    const asignacion = await this.repo.findById(id);
    if (!asignacion || asignacion.eliminado) throw new AppError('Asignación no encontrada', 404);
    return this.repo.update(id, dto);
  }

  async eliminarAsignacion(id: number) {
    const asignacion = await this.repo.findById(id);
    if (!asignacion || asignacion.eliminado) throw new AppError('Asignación no encontrada', 404);
    return this.repo.softDelete(id);
  }

  async listarPorUsuario(id_usuario: number) {
    return this.repo.listByUsuario(id_usuario);
  }

  async listarPorVehiculo(id_vehiculo: number) {
    return this.repo.listByVehiculo(id_vehiculo);
  }
}
