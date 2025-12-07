// src/modules/usuarios/entities/usuarioRol.entity.ts (MEJORADA)
export class UsuarioRolEntity {
  id_usuario: number;
  id_rol: number;

  constructor(data: { id_usuario: number; id_rol: number }) {
    this.id_usuario = data.id_usuario;
    this.id_rol = data.id_rol;
  }

  // ✅ MÉTODO: Obtener clave compuesta para Prisma
  get claveCompuesta() {
    return { id_usuario: this.id_usuario, id_rol: this.id_rol };
  }

  toPrisma(): any {
    return {
      id_usuario: this.id_usuario,
      id_rol: this.id_rol
    };
  }
}