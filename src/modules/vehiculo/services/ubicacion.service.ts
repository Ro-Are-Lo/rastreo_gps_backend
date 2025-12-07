// src/modules/vehiculo/services/ubicacion.service.ts (REFACTORIZADO)
import { UbicacionRepository } from '../repositories/ubicacion.repository';
import { UbicacionEntity } from '../entities/ubicacion.entity';
import { CrearUbicacionDto } from '../dto/crearUbicacion.dto';

export class UbicacionService {
  private repo = new UbicacionRepository();

  async crearUbicacion(dto: CrearUbicacionDto): Promise<UbicacionEntity> {
    // ✅ Convertir DTO a Entity
    const ubicacionEntity = new UbicacionEntity({
      id_vehiculo: dto.id_vehiculo,
      latitud: dto.latitud,
      longitud: dto.longitud,
      velocidad_kmh: dto.velocidad_kmh,
      fecha_hora: dto.fecha_hora ? new Date(dto.fecha_hora) : undefined
    });

    return this.repo.crear(ubicacionEntity);
  }

  async listarUbicacionesPorVehiculo(id_vehiculo: number): Promise<UbicacionEntity[]> {
    return this.repo.buscarPorVehiculo(id_vehiculo);
  }

  async obtenerUltimaUbicacion(id_vehiculo: number): Promise<UbicacionEntity | null> {
    return this.repo.buscarUltimaUbicacion(id_vehiculo);
  }

  async eliminarUbicacion(id: number): Promise<UbicacionEntity> {
    return this.repo.eliminarSuavemente(id);
  }

  async obtenerHistorial(
    id_vehiculo: number,
    fechaInicio?: Date,
    fechaFin?: Date
  ): Promise<UbicacionEntity[]> {
    return this.repo.buscarHistorial(id_vehiculo, fechaInicio, fechaFin);
  }

  async calcularRuta(
    id_vehiculo: number,
    fechaInicio: Date,
    fechaFin: Date
  ): Promise<{
    ubicaciones: UbicacionEntity[];
    distanciaTotal: number;
    velocidadPromedio: number;
    tiempoTotal: number; // en horas
  }> {
    const ubicaciones = await this.obtenerHistorial(id_vehiculo, fechaInicio, fechaFin);
    
    if (ubicaciones.length < 2) {
      return {
        ubicaciones,
        distanciaTotal: 0,
        velocidadPromedio: 0,
        tiempoTotal: 0
      };
    }

    // Calcular distancia total usando el método de la Entity
    let distanciaTotal = 0;
    for (let i = 1; i < ubicaciones.length; i++) {
      distanciaTotal += ubicaciones[i].calcularDistancia(ubicaciones[i - 1]);
    }

    // Calcular tiempo total en horas
    const tiempoMs = ubicaciones[ubicaciones.length - 1].fecha_hora.getTime() - 
                     ubicaciones[0].fecha_hora.getTime();
    const tiempoTotal = tiempoMs / (1000 * 60 * 60); // convertir a horas

    // Calcular velocidad promedio
    const velocidades = ubicaciones
      .filter(u => u.velocidad_kmh && u.velocidad_kmh > 0)
      .map(u => u.velocidad_kmh!);
    
    const velocidadPromedio = velocidades.length > 0 
      ? velocidades.reduce((a, b) => a + b, 0) / velocidades.length
      : 0;

    return {
      ubicaciones,
      distanciaTotal,
      velocidadPromedio,
      tiempoTotal
    };
  }
}