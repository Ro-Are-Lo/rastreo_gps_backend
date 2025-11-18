//src/modules/vehiculo/entities/vehiculo.entity.ts
export interface VehiculoEntity {
  id: number;
  placa: string;
  modelo?: string | null;
  anio?: number | null;
  fecha_creacion: Date;
  fecha_modificacion?: Date | null;
  activo: boolean;
  eliminado: boolean;
}
