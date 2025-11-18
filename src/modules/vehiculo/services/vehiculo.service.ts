//src/modules/vehiculo/services/vehiculo.service.ts
import { VehiculoRepository } from '../repositories/vehiculo.repository';
import { CrearVehiculoDto } from '../dto/crearVehiculo.dto';
import { ActualizarVehiculoDto } from '../dto/actualizarVehiculo.dto';
import { AppError } from '../../../core/errors/AppError';

export class VehiculoService {
  private repo = new VehiculoRepository();

  async crearVehiculo(dto: CrearVehiculoDto) {
    return this.repo.create(dto);
  }

  async actualizarVehiculo(id: number, dto: ActualizarVehiculoDto) {
    const vehiculo = await this.repo.findById(id);
    if (!vehiculo || vehiculo.eliminado) throw new AppError('Vehículo no encontrado', 404);
    return this.repo.update(id, dto);
  }

  async eliminarVehiculo(id: number) {
    const vehiculo = await this.repo.findById(id);
    if (!vehiculo || vehiculo.eliminado) throw new AppError('Vehículo no encontrado', 404);
    return this.repo.softDelete(id);
  }

  async listarVehiculos() {
    return this.repo.listAll();
  }
}
