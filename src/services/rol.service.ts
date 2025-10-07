import { prisma } from '../prisma/client';

export const listarRoles = async () => {
  return prisma.rol.findMany();
};

export const obtenerRol = async (rol_id: number) => {
  return prisma.rol.findUnique({ where: { rol_id } });
};

export const crearRol = async (nombre: string) => {
  return prisma.rol.create({ data: { nombre } });
};

export const actualizarRol = async (rol_id: number, nombre: string) => {
  return prisma.rol.update({
    where: { rol_id },
    data: { nombre }
  });
};

export const eliminarRol = async (rol_id: number) => {
  return prisma.rol.delete({ where: { rol_id } });
};
