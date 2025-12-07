// src/modules/usuarios/services/asignacion.service.ts (CORREGIDO)
import { AsignacionRepository } from '../repositories/asignacion.repository';
import { CrearAsignacionDto } from '../dto/crearAsignacion.dto';
import { ActualizarAsignacionDto } from '../dto/actualizarAsignacion.dto';
import { AsignacionEntity } from '../entities/asignacion.entity';
import { AppError } from '../../../core/errors/AppError';
import { prisma } from '../../../config/prisma'; // ¡IMPORTANTE!

export class AsignacionService {
  private repo = new AsignacionRepository();

  async crearAsignacion(dto: CrearAsignacionDto): Promise<AsignacionEntity> {
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
    const asignacionEntity = new AsignacionEntity({
      id_usuario: dto.id_usuario,
      id_vehiculo: dto.id_vehiculo,
      fecha_inicio: dto.fecha_inicio ? new Date(dto.fecha_inicio) : undefined,
      fecha_fin: dto.fecha_fin ? new Date(dto.fecha_fin) : undefined
    });

    return this.repo.crear(asignacionEntity);
  }

  async obtenerAsignacion(id: number): Promise<AsignacionEntity> {
    const asignacion = await this.repo.buscarPorId(id);
    if (!asignacion) {
      throw new AppError('Asignación no encontrada', 404); // Usar AppError
    }
    return asignacion;
  }

  async actualizarAsignacion(id: number, dto: ActualizarAsignacionDto): Promise<AsignacionEntity> {
    const asignacionExistente = await this.obtenerAsignacion(id);
    
    const asignacionActualizada = new AsignacionEntity({
      ...asignacionExistente,
      fecha_inicio: dto.fecha_inicio ? new Date(dto.fecha_inicio) : asignacionExistente.fecha_inicio,
      fecha_fin: dto.fecha_fin ? new Date(dto.fecha_fin) : asignacionExistente.fecha_fin,
      activo: dto.activo ?? asignacionExistente.activo,
      fecha_modificacion: new Date()
    });

    return this.repo.actualizar(id, asignacionActualizada);
  }

  async eliminarAsignacion(id: number): Promise<AsignacionEntity> {
    return this.repo.eliminarSuavemente(id);
  }

  async listarAsignacionesPorUsuario(id_usuario: number): Promise<AsignacionEntity[]> {
    // ✅ VALIDAR que usuario existe
    const usuarioExiste = await prisma.usuario.findUnique({
      where: { id: id_usuario }
    });
    
    if (!usuarioExiste) {
      throw new AppError('Usuario no encontrado', 404);
    }

    return this.repo.buscarPorUsuario(id_usuario);
  }

  async listarAsignacionesPorVehiculo(id_vehiculo: number): Promise<AsignacionEntity[]> {
    // ✅ VALIDAR que vehículo existe
    const vehiculoExiste = await prisma.vehiculo.findUnique({
      where: { id: id_vehiculo }
    });
    
    if (!vehiculoExiste) {
      throw new AppError('Vehículo no encontrado', 404);
    }

    return this.repo.buscarPorVehiculo(id_vehiculo);
  }
}