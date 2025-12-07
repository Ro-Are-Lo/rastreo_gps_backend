// src/modules/usuarios/entities/asignacion.entity.ts (MEJORADA)
export class AsignacionEntity {
  id?: number; // ✅ Cambiar a opcional
  id_usuario: number;
  id_vehiculo: number;
  fecha_inicio: Date;
  fecha_fin?: Date | null;
  fecha_creacion: Date;
  fecha_modificacion?: Date | null;
  activo: boolean;
  eliminado: boolean;

  constructor(data: {
    id?: number;
    id_usuario: number;
    id_vehiculo: number;
    fecha_inicio?: Date;
    fecha_fin?: Date | null;
    fecha_creacion?: Date;
    fecha_modificacion?: Date | null;
    activo?: boolean;
    eliminado?: boolean;
  }) {
    this.id = data.id;
    this.id_usuario = data.id_usuario;
    this.id_vehiculo = data.id_vehiculo;
    this.fecha_inicio = data.fecha_inicio ?? new Date();
    this.fecha_fin = data.fecha_fin ?? null;
    this.fecha_creacion = data.fecha_creacion ?? new Date();
    this.fecha_modificacion = data.fecha_modificacion ?? null;
    this.activo = data.activo ?? true;
    this.eliminado = data.eliminado ?? false;
  }

  // ✅ MÉTODOS DE DOMINIO
  estaActiva(): boolean {
    const ahora = new Date();
    return this.activo && 
           !this.eliminado && 
           this.fecha_inicio <= ahora && 
           (!this.fecha_fin || this.fecha_fin >= ahora);
  }

  finalizar(): void {
    this.fecha_fin = new Date();
    this.fecha_modificacion = new Date();
  }

  toPrisma(): any {
    return {
      id_usuario: this.id_usuario,
      id_vehiculo: this.id_vehiculo,
      fecha_inicio: this.fecha_inicio,
      fecha_fin: this.fecha_fin,
      fecha_creacion: this.fecha_creacion,
      fecha_modificacion: this.fecha_modificacion,
      activo: this.activo,
      eliminado: this.eliminado
    };
  }
}