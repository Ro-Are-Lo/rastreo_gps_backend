// src/modules/vehiculo/services/vehiculo.service.ts (REFACTORIZADO)
import { VehiculoRepository } from '../repositories/vehiculo.repository';
import { VehiculoEntity } from '../entities/vehiculo.entity';
import { CrearVehiculoDto } from '../dto/crearVehiculo.dto';
import { ActualizarVehiculoDto } from '../dto/actualizarVehiculo.dto';

export class VehiculoService {
  private repo = new VehiculoRepository();

  
// En VehiculoService.crearVehiculo:
async crearVehiculo(dto: CrearVehiculoDto): Promise<VehiculoEntity> {
  // ✅ Convertir DTO a Entity
  const vehiculoEntity = new VehiculoEntity({
    placa: dto.placa,
    modelo: dto.modelo,
    anio: dto.anio
  });

  // ✅ Validar formato de placa
  if (!vehiculoEntity.validarPlaca()) {
    // Lanzar error con status 400
    const error = new Error('Formato de placa inválido. Use formato: ABC-123 o AB-1234');
    (error as any).status = 400; // Para que middleware lo capture como 400
    throw error;
  }

  return this.repo.crear(vehiculoEntity);
}


  async obtenerVehiculo(id: number): Promise<VehiculoEntity> {
    const vehiculo = await this.repo.buscarPorId(id);
    if (!vehiculo) {
      throw new Error('Vehículo no encontrado');
    }
    return vehiculo;
  }

  async obtenerVehiculoPorPlaca(placa: string): Promise<VehiculoEntity> {
    const vehiculo = await this.repo.buscarPorPlaca(placa);
    if (!vehiculo) {
      throw new Error('Vehículo no encontrado');
    }
    return vehiculo;
  }

  async listarVehiculos(pagina: number = 1, porPagina: number = 20) {
    const todos = await this.repo.buscarTodos(true);
    const inicio = (pagina - 1) * porPagina;
    
    return {
      total: todos.length,
      pagina,
      porPagina,
      data: todos.slice(inicio, inicio + porPagina)
    };
  }

  async actualizarVehiculo(id: number, dto: ActualizarVehiculoDto): Promise<VehiculoEntity> {
    const vehiculoExistente = await this.obtenerVehiculo(id);
    
    const vehiculoActualizado = new VehiculoEntity({
      ...vehiculoExistente,
      modelo: dto.modelo ?? vehiculoExistente.modelo,
      anio: dto.anio ?? vehiculoExistente.anio,
      activo: dto.activo ?? vehiculoExistente.activo,
      fecha_modificacion: new Date()
    });

    return this.repo.actualizar(id, vehiculoActualizado);
  }

  async eliminarVehiculo(id: number): Promise<VehiculoEntity> {
    return this.repo.eliminarSuavemente(id);
  }
}