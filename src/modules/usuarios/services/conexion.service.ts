// src/modules/usuarios/services/conexion.service.ts (CORREGIDO)
import { ConexionRepository } from '../repositories/conexion.repository';
import { ConexionEntity } from '../entities/conexion.entity';
import { CrearConexionDto } from '../dto/crearConexion.dto';
import { AppError } from '../../../core/errors/AppError';
import { prisma } from '../../../config/prisma'; // ¡IMPORTANTE!

export class ConexionService {
  private repo = new ConexionRepository();

  async crearConexion(dto: CrearConexionDto): Promise<ConexionEntity> {
    // ✅ VALIDAR que usuario existe
    const usuarioExiste = await prisma.usuario.findUnique({
      where: { id: dto.id_usuario, activo: true, eliminado: false }
    });
    
    if (!usuarioExiste) {
      throw new AppError('Usuario no encontrado o inactivo', 400);
    }

    // ✅ VALIDAR que vehículo existe
    const vehiculoExiste = await prisma.vehiculo.findUnique({
      where: { id: dto.id_vehiculo, activo: true, eliminado: false }
    });
    
    if (!vehiculoExiste) {
      throw new AppError('Vehículo no encontrado o inactivo', 400);
    }

    // ✅ Convertir DTO a Entity
    const conexionEntity = new ConexionEntity({
      id_usuario: dto.id_usuario,
      id_vehiculo: dto.id_vehiculo,
      ip: dto.ip,
      sesion_dispositivo: dto.sesion_dispositivo,
      conectado_at: new Date(),
      estado: true
    });

    return this.repo.crear(conexionEntity);
  }

  async desconectarConexion(id: number): Promise<ConexionEntity> {
    const conexion = await this.repo.buscarPorId(id);
    if (!conexion) {
      throw new AppError('Conexión no encontrada', 404);
    }
    
    return this.repo.desconectar(id);
  }

  async listarConexionesPorUsuario(id_usuario: number): Promise<ConexionEntity[]> {
    // ✅ VALIDAR que usuario existe
    const usuarioExiste = await prisma.usuario.findUnique({
      where: { id: id_usuario }
    });
    
    if (!usuarioExiste) {
      throw new AppError('Usuario no encontrado', 404);
    }

    return this.repo.buscarPorUsuario(id_usuario);
  }

  async listarConexionesPorVehiculo(id_vehiculo: number): Promise<ConexionEntity[]> {
    // ✅ VALIDAR que vehículo existe
    const vehiculoExiste = await prisma.vehiculo.findUnique({
      where: { id: id_vehiculo }
    });
    
    if (!vehiculoExiste) {
      throw new AppError('Vehículo no encontrado', 404);
    }

    return this.repo.buscarPorVehiculo(id_vehiculo);
  }

  async listarTodasConexiones(): Promise<ConexionEntity[]> {
    return this.repo.buscarTodasConexiones();
  }
}