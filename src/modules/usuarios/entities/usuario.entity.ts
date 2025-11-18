//src/modules/usuarios/entities/usuario.entity.ts
export interface UsuarioEntity {
  id: number;
  id_persona: number;
  username: string;
  password_hash: string;
  fecha_creacion: Date;
  fecha_modificacion?: Date | null;
  activo: boolean;
  eliminado: boolean;
}
