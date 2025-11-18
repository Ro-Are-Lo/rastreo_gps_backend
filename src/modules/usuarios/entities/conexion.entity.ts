
//src/modules/usuarios/entities/conexion.entity.ts
export interface ConexionEntity {
  id: number;
  id_usuario: number;
  id_vehiculo: number;
  conectado_at: Date;
  desconectado_at?: Date | null;
  estado: boolean;
  ip?: string;
  sesion_dispositivo?: string;
  fecha_creacion: Date;
  fecha_modificacion?: Date | null;
  activo: boolean;
  eliminado: boolean;
}
