import { prisma } from '../prisma/client';

export const listarConexiones = async () => {
  return prisma.conexion.findMany({
    include: {
      usuario: { select: { usuario_id: true, nombre: true, apellido_paterno: true } },
      vehiculo: { select: { vehicle_id: true, placa: true, modelo: true } }
    },
    orderBy: { connected_at: 'desc' }
  });
};

export const obtenerConexion = async (connection_id: number) => {
  return prisma.conexion.findUnique({
    where: { connection_id },
    include: {
      usuario: { select: { usuario_id: true, nombre: true, apellido_paterno: true } },
      vehiculo: { select: { vehicle_id: true, placa: true, modelo: true } }
    }
  });
};

export const crearConexion = async (vehicle_id: number, usuario_id: number, ip: string, user_agent: string) => {
  return prisma.conexion.create({
    data: { vehicle_id, usuario_id, ip, user_agent, estado: true, connected_at: new Date() }
  });
};

export const desconectarConexion = async (connection_id: number) => {
  return prisma.conexion.update({
    where: { connection_id },
    data: { estado: false, disconnected_at: new Date() }
  });
};
