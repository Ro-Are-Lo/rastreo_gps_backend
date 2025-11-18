//src/modules/vehiculo/services/ubicacion.service.ts
import { UbicacionRepository } from '../repositories/ubicacion.repository';
import { CrearUbicacionDto } from '../dto/crearUbicacion.dto';

export class UbicacionService {
  private repo = new UbicacionRepository();

  async registrarUbicacion(dto: CrearUbicacionDto) {
    return this.repo.create(dto);
  }

  async historialVehiculo(id_vehiculo: number) {
    return this.repo.listByVehiculo(id_vehiculo);
  }
}
