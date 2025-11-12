import { prisma } from '../prisma/client';

export const listarAsignaciones = async () => {
  return prisma.asignacion.findMany({
    include: {
      usuario: { select: { usuario_id: true, nombre: true, apellido_paterno: true } },
      vehiculo: { select: { vehicle_id: true, placa: true, modelo: true } }
    },
    orderBy: { fecha_inicio: 'desc' }
  });
};

export const obtenerAsignacion = async (asignacion_id: number) => {
  return prisma.asignacion.findUnique({
    where: { asignacion_id },
    include: {
      usuario: { select: { usuario_id: true, nombre: true, apellido_paterno: true } },
      vehiculo: { select: { vehicle_id: true, placa: true, modelo: true } }
    }
  });
};

export const crearAsignacion = async (vehicle_id: number, usuario_id: number) => {
  return prisma.asignacion.create({
    data: { vehicle_id, usuario_id, fecha_inicio: new Date() }
  });
};

export const actualizarAsignacion = async (asignacion_id: number, data: any) => {
  return prisma.asignacion.update({ where: { asignacion_id }, data });
};

export const eliminarAsignacion = async (asignacion_id: number) => {
  return prisma.asignacion.delete({ where: { asignacion_id } });
};
