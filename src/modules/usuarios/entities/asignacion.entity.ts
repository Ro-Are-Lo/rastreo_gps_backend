//src/modules/usuarios/entities/asignacion.entity.ts
export interface AsignacionEntity {
  id: number;
  id_usuario: number;
  id_vehiculo: number;
  fecha_inicio: Date;
  fecha_fin?: Date | null;
  fecha_creacion: Date;
  fecha_modificacion?: Date | null;
  activo: boolean;
  eliminado: boolean;
}
