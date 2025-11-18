//src/modules/usuarios/repositories/conexion.repository.ts
import { prisma } from '../../../config/prisma';
import { CrearConexionDto } from '../dto/crearConexion.dto';

export class ConexionRepository {
  async create(data: CrearConexionDto) {
    return prisma.conexion.create({ data });
  }

  async disconnect(id: number) {
    return prisma.conexion.update({
      where: { id },
      data: { estado: false, desconectado_at: new Date(), fecha_modificacion: new Date() },
    });
  }

  async listByUsuario(id_usuario: number) {
    return prisma.conexion.findMany({ where: { id_usuario, eliminado: false } });
  }

  async listByVehiculo(id_vehiculo: number) {
    return prisma.conexion.findMany({ where: { id_vehiculo, eliminado: false } });
  }
}
