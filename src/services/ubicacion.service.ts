import { prisma } from '../prisma/client';

// Obtener todas las ubicaciones de un vehículo
export const listarUbicaciones = async (vehicle_id: number) => {
  return prisma.ubicacion.findMany({
    where: { vehicle_id },
    orderBy: { fecha_hora: 'desc' },
    take: 100 // opcional: limitar últimas 100 ubicaciones
  });
};

// Obtener ubicación más reciente
export const obtenerUltimaUbicacion = async (vehicle_id: number) => {
  return prisma.ubicacion.findFirst({
    where: { vehicle_id },
    orderBy: { fecha_hora: 'desc' }
  });
};

// Registrar ubicación desde app móvil
export const crearUbicacion = async (
  vehicle_id: number,
  latitud: number,
  longitud: number,
  velocidad_kmh?: number
) => {
  return prisma.ubicacion.create({
    data: {
      vehicle_id,
      latitud,
      longitud,
      velocidad_kmh,
      posicion: { set: { type: 'Point', coordinates: [longitud, latitud] } }
    }
  });
};
