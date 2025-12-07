// src/modules/usuarios/entities/conexion.entity.ts (CORREGIDO)
export class ConexionEntity {
  id?: number;
  id_usuario: number;
  id_vehiculo: number;
  conectado_at: Date;
  desconectado_at?: Date | null;
  estado: boolean;
  ip?: string | null; // ✅ Cambiar a string | null
  sesion_dispositivo?: string | null; // ✅ Cambiar a string | null
  fecha_creacion: Date;
  fecha_modificacion?: Date | null;
  activo: boolean;
  eliminado: boolean;

  constructor(data: {
    id?: number;
    id_usuario: number;
    id_vehiculo: number;
    conectado_at?: Date;
    desconectado_at?: Date | null;
    estado?: boolean;
    ip?: string | null; // ✅ Cambiar aquí también
    sesion_dispositivo?: string | null; // ✅ Cambiar aquí también
    fecha_creacion?: Date;
    fecha_modificacion?: Date | null;
    activo?: boolean;
    eliminado?: boolean;
  }) {
    this.id = data.id;
    this.id_usuario = data.id_usuario;
    this.id_vehiculo = data.id_vehiculo;
    this.conectado_at = data.conectado_at ?? new Date();
    this.desconectado_at = data.desconectado_at ?? null;
    this.estado = data.estado ?? true;
    this.ip = data.ip;
    this.sesion_dispositivo = data.sesion_dispositivo;
    this.fecha_creacion = data.fecha_creacion ?? new Date();
    this.fecha_modificacion = data.fecha_modificacion ?? null;
    this.activo = data.activo ?? true;
    this.eliminado = data.eliminado ?? false;
  }

  // ✅ También actualizar toPrisma() para manejar nulls
  toPrisma(): any {
    return {
      id_usuario: this.id_usuario,
      id_vehiculo: this.id_vehiculo,
      conectado_at: this.conectado_at,
      desconectado_at: this.desconectado_at,
      estado: this.estado,
      ip: this.ip ?? null, // ✅ Convertir undefined a null
      sesion_dispositivo: this.sesion_dispositivo ?? null, // ✅ Convertir undefined a null
      fecha_creacion: this.fecha_creacion,
      fecha_modificacion: this.fecha_modificacion,
      activo: this.activo,
      eliminado: this.eliminado
    };
  }

  // Resto de métodos permanecen igual...
  estaConectada(): boolean {
    return this.estado && this.activo && !this.eliminado;
  }

  desconectar(): void {
    this.estado = false;
    this.desconectado_at = new Date();
    this.fecha_modificacion = new Date();
  }

  duracionConexion(): number | null {
    if (!this.desconectado_at) return null;
    return this.desconectado_at.getTime() - this.conectado_at.getTime();
  }
}