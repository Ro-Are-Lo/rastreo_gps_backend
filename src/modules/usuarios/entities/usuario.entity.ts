// src/modules/usuarios/entities/usuario.entity.ts (MEJORADA)
export class UsuarioEntity {
  id?: number; // ✅ Cambiar a opcional
  id_persona: number;
  username: string;
  password_hash: string;
  fecha_creacion: Date;
  fecha_modificacion?: Date | null;
  activo: boolean;
  eliminado: boolean;

  constructor(data: {
    id?: number;
    id_persona: number;
    username: string;
    password_hash: string;
    fecha_creacion?: Date;
    fecha_modificacion?: Date | null;
    activo?: boolean;
    eliminado?: boolean;
  }) {
    this.id = data.id;
    this.id_persona = data.id_persona;
    this.username = data.username;
    this.password_hash = data.password_hash;
    this.fecha_creacion = data.fecha_creacion ?? new Date();
    this.fecha_modificacion = data.fecha_modificacion ?? null;
    this.activo = data.activo ?? true;
    this.eliminado = data.eliminado ?? false;
  }

  // ✅ MÉTODOS DE DOMINIO
  verificarPassword(password: string): Promise<boolean> {
    const bcrypt = require('bcrypt');
    return bcrypt.compare(password, this.password_hash);
  }

  cambiarPassword(nuevaPassword: string): Promise<string> {
    const bcrypt = require('bcrypt');
    return bcrypt.hash(nuevaPassword, 10);
  }

  estaActivo(): boolean {
    return this.activo && !this.eliminado;
  }

  toPrisma(): any {
    return {
      id_persona: this.id_persona,
      username: this.username,
      password_hash: this.password_hash,
      fecha_creacion: this.fecha_creacion,
      fecha_modificacion: this.fecha_modificacion,
      activo: this.activo,
      eliminado: this.eliminado
    };
  }
}