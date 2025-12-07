import { prisma } from "../../../config/prisma";
import { AppError } from "../../../core/errors/AppError";
import { UsuarioRolEntity } from "../entities/usuarioRol.entity";

export class UsuarioRolRepository {

  async asignarRol(entity: UsuarioRolEntity) {
    const { id_usuario, id_rol } = entity;

    const existe = await prisma.usuarioRol.findUnique({
      where: { id_usuario_id_rol: { id_usuario, id_rol } },
    });

    if (existe) {
      throw new AppError("El usuario ya tiene asignado este rol", 400);
    }

    return prisma.usuarioRol.create({
      data: {
        id_usuario,
        id_rol,
      },
    });
  }

  async borrarRol(entity: UsuarioRolEntity) {
    const { id_usuario, id_rol } = entity;

    const existe = await prisma.usuarioRol.findUnique({
      where: { id_usuario_id_rol: { id_usuario, id_rol } },
    });

    if (!existe) {
      throw new AppError("El usuario no tiene asignado este rol", 404);
    }

    return prisma.usuarioRol.delete({
      where: { id_usuario_id_rol: { id_usuario, id_rol } },
    });
  }

  async listarRolesUsuario(id_usuario: number) {
    return prisma.usuarioRol.findMany({
      where: { id_usuario },
      include: { rol: true },
      orderBy: { id_rol: "desc" },
    });
  }
}
