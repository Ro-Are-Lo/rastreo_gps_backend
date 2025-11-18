//src/modules/usuarios/repositories/usuarioRol.repository.ts
import { prisma } from '../../../config/prisma';

export class UsuarioRolRepository {
  async asignarRol(id_usuario: number, id_rol: number) {
    return prisma.usuarioRol.create({ data: { id_usuario, id_rol } });
  }

  async removerRol(id_usuario: number, id_rol: number) {
    return prisma.usuarioRol.delete({ where: { id_usuario_id_rol: { id_usuario, id_rol } } });
  }

  async listarRolesUsuario(id_usuario: number) {
    return prisma.usuarioRol.findMany({ where: { id_usuario } });
  }
}
