// src/modules/vehiculo/entities/ubicacion.entity.ts (REFACTORIZADO)
export class UbicacionEntity {
  id?: number; // ✅ Cambiar a opcional
  id_vehiculo: number;
  fecha_hora: Date;
  latitud: number;
  longitud: number;
  velocidad_kmh?: number | null;
  fecha_creacion: Date;
  fecha_modificacion?: Date | null;
  activo: boolean;
  eliminado: boolean;

  constructor(data: {
    id?: number;
    id_vehiculo: number;
    fecha_hora?: Date;
    latitud: number;
    longitud: number;
    velocidad_kmh?: number | null;
    fecha_creacion?: Date;
    fecha_modificacion?: Date | null;
    activo?: boolean;
    eliminado?: boolean;
  }) {
    this.id = data.id;
    this.id_vehiculo = data.id_vehiculo;
    this.fecha_hora = data.fecha_hora ?? new Date();
    this.latitud = data.latitud;
    this.longitud = data.longitud;
    this.velocidad_kmh = data.velocidad_kmh ?? null;
    this.fecha_creacion = data.fecha_creacion ?? new Date();
    this.fecha_modificacion = data.fecha_modificacion ?? null;
    this.activo = data.activo ?? true;
    this.eliminado = data.eliminado ?? false;
  }

  // ✅ MÉTODOS DE DOMINIO (lógica de negocio aquí)
  obtenerCoordenadas(): [number, number] {
    return [this.latitud, this.longitud];
  }

  esUbicacionValida(): boolean {
    // Validar rangos de latitud y longitud
    return this.latitud >= -90 && this.latitud <= 90 &&
           this.longitud >= -180 && this.longitud <= 180;
  }

  calcularDistancia(otraUbicacion: UbicacionEntity): number {
    // Fórmula de Haversine para calcular distancia en km
    const R = 6371; // Radio de la Tierra en km
    const dLat = this.gradosARadianes(otraUbicacion.latitud - this.latitud);
    const dLon = this.gradosARadianes(otraUbicacion.longitud - this.longitud);
    
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.gradosARadianes(this.latitud)) * 
      Math.cos(this.gradosARadianes(otraUbicacion.latitud)) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private gradosARadianes(grados: number): number {
    return grados * (Math.PI / 180);
  }

  toPrisma(): any {
    return {
      id_vehiculo: this.id_vehiculo,
      fecha_hora: this.fecha_hora,
      latitud: this.latitud,
      longitud: this.longitud,
      velocidad_kmh: this.velocidad_kmh,
      fecha_creacion: this.fecha_creacion,
      fecha_modificacion: this.fecha_modificacion,
      activo: this.activo,
      eliminado: this.eliminado
    };
  }
}