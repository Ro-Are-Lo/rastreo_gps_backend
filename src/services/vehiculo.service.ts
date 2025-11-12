import { prisma } from '../prisma/client';

export const listarVehiculos = async () => {
  return prisma.vehiculo.findMany();
};

export const obtenerVehiculo = async (vehicle_id: number) => {
  return prisma.vehiculo.findUnique({
    where: { vehicle_id }
  });
};

export const crearVehiculo = async (data: any) => {
  return prisma.vehiculo.create({ data });
};

export const actualizarVehiculo = async (vehicle_id: number, data: any) => {
  return prisma.vehiculo.update({
    where: { vehicle_id },
    data
  });
};

export const eliminarVehiculo = async (vehicle_id: number) => {
  return prisma.vehiculo.delete({ where: { vehicle_id } });
};
