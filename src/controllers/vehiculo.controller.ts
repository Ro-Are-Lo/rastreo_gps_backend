import { Request, Response } from 'express';
import {
  listarVehiculos,
  obtenerVehiculo,
  crearVehiculo,
  actualizarVehiculo,
  eliminarVehiculo,
} from '../services/vehiculo.service';

export const getVehiculos = async (req: Request, res: Response) => {
  try {
    const data = await listarVehiculos();
    res.json(data);
  } catch {
    res.status(500).json({ error: 'Error al listar vehículos' });
  }
};

export const getVehiculo = async (req: Request, res: Response) => {
  try {
    const vehiculo = await obtenerVehiculo(Number(req.params.id));
    if (!vehiculo) return res.status(404).json({ error: 'Vehículo no encontrado' });
    res.json(vehiculo);
  } catch {
    res.status(500).json({ error: 'Error al obtener vehículo' });
  }
};

export const postVehiculo = async (req: Request, res: Response) => {
  try {
    const nuevo = await crearVehiculo(req.body);
    res.status(201).json(nuevo);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const putVehiculo = async (req: Request, res: Response) => {
  try {
    const actualizado = await actualizarVehiculo(Number(req.params.id), req.body);
    res.json(actualizado);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteVehiculo = async (req: Request, res: Response) => {
  try {
    await eliminarVehiculo(Number(req.params.id));
    res.json({ message: 'Vehículo eliminado correctamente' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
