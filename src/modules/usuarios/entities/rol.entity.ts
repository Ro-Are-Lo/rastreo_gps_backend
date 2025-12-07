// src/modules/usuarios/entities/rol.entity.ts (MEJORADA)
export class RolEntity {
  id?: number; // ✅ Cambiar a opcional
  nombre: string;
  fecha_creacion: Date;
  fecha_modificacion?: Date | null;
  activo: boolean;
  eliminado: boolean;

  constructor(data: {
    id?: number;
    nombre: string;
    fecha_creacion?: Date;
    fecha_modificacion?: Date | null;
    activo?: boolean;
    eliminado?: boolean;
  }) {
    this.id = data.id;
    this.nombre = data.nombre;
    this.fecha_creacion = data.fecha_creacion ?? new Date();
    this.fecha_modificacion = data.fecha_modificacion ?? null;
    this.activo = data.activo ?? true;
    this.eliminado = data.eliminado ?? false;
  }

  // ✅ MÉTODOS DE DOMINIO
  esNombreValido(): boolean {
    return this.nombre.length >= 3 && this.nombre.length <= 50;
  }

  toPrisma(): any {
    return {
      nombre: this.nombre,
      fecha_creacion: this.fecha_creacion,
      fecha_modificacion: this.fecha_modificacion,
      activo: this.activo,
      eliminado: this.eliminado
    };
  }
}