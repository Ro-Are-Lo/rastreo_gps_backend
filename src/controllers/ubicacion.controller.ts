import { Request, Response } from 'express';
import {
  listarUbicaciones,
  obtenerUltimaUbicacion,
  crearUbicacion
} from '../services/ubicacion.service';

export const getUbicaciones = async (req: Request, res: Response) => {
  try {
    const vehicle_id = Number(req.params.vehicleId);
    const data = await listarUbicaciones(vehicle_id);
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUltimaUbicacion = async (req: Request, res: Response) => {
  try {
    const vehicle_id = Number(req.params.vehicleId);
    const data = await obtenerUltimaUbicacion(vehicle_id);
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const postUbicacion = async (req: Request, res: Response) => {
  try {
    const { vehicle_id, latitud, longitud, velocidad_kmh } = req.body;
    const nueva = await crearUbicacion(vehicle_id, latitud, longitud, velocidad_kmh);
    res.status(201).json(nueva);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
