import { prisma } from '../prisma/client';

export const listarRolesDeUsuario = async (usuario_id: number) => {
  return prisma.usuarioRol.findMany({
    where: { usuario_id },
    include: { rol: true }
  });
};

export const asignarRolAUsuario = async (usuario_id: number, rol_id: number) => {
  return prisma.usuarioRol.create({
    data: { usuario_id, rol_id },
    include: { rol: true }
  });
};

export const quitarRolDeUsuario = async (usuario_id: number, rol_id: number) => {
  return prisma.usuarioRol.deleteMany({
    where: { usuario_id, rol_id }
  });
};
