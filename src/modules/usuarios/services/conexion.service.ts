//src/modules/usuarios/services/conexion.service.ts
import { ConexionRepository } from '../repositories/conexion.repository';
import { CrearConexionDto } from '../dto/crearConexion.dto';

export class ConexionService {
  private repo = new ConexionRepository();

  async crearConexion(dto: CrearConexionDto) {
    return this.repo.create(dto);
  }

  async desconectar(id: number) {
    return this.repo.disconnect(id);
  }

  async listarPorUsuario(id_usuario: number) {
    return this.repo.listByUsuario(id_usuario);
  }

  async listarPorVehiculo(id_vehiculo: number) {
    return this.repo.listByVehiculo(id_vehiculo);
  }
}
