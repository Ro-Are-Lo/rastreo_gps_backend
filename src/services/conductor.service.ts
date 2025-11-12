import { prisma } from '../prisma/client';

export const listarConductores = async () => {
  return prisma.usuario.findMany({
    where: { UsuarioRol: { some: { rol: { nombre: 'conductor' } } } },
    select: {
      usuario_id: true,
      nombre: true,
      apellido_paterno: true,
      apellido_materno: true,
      cedula_identidad: true,
      licencia_numero: true,
      licencia_categoria: true,
      roles: { select: { rol: { select: { nombre: true } } } }
    }
  });
};

export const obtenerConductor = async (usuario_id: number) => {
  return prisma.usuario.findUnique({
    where: { usuario_id },
    select: {
      usuario_id: true,
      nombre: true,
      apellido_paterno: true,
      apellido_materno: true,
      cedula_identidad: true,
      licencia_numero: true,
      licencia_categoria: true,
      roles: { select: { rol: { select: { nombre: true } } } }
    }
  });
};

export const crearConductor = async (data: any) => {
  const usuario = await prisma.usuario.create({ data });
  // Asignar rol "conductor"
  const rolConductor = await prisma.rol.findUnique({ where: { nombre: 'conductor' } });
  if (!rolConductor) throw new Error('Rol conductor no existe');
  await prisma.usuarioRol.create({ data: { usuario_id: usuario.usuario_id, rol_id: rolConductor.rol_id } });
  return usuario;
};

export const actualizarConductor = async (usuario_id: number, data: any) => {
  return prisma.usuario.update({ where: { usuario_id }, data });
};

export const eliminarConductor = async (usuario_id: number) => {
  return prisma.usuario.delete({ where: { usuario_id } });
};
