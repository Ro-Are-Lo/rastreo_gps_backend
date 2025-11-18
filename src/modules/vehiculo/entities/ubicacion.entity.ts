//src/modules/vehiculo/entities/ubicacion.entity.ts
export interface UbicacionEntity {
  id: number;
  id_vehiculo: number;
  fecha_hora: Date;
  latitud: number;
  longitud: number;
  velocidad_kmh?: number | null;
  fecha_creacion: Date;
  fecha_modificacion?: Date | null;
  activo: boolean;
  eliminado: boolean;
}
