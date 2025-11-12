import { Request, Response } from 'express';
import {
  listarAsignaciones,
  obtenerAsignacion,
  crearAsignacion,
  actualizarAsignacion,
  eliminarAsignacion
} from '../services/asignacion.service';

export const getAsignaciones = async (req: Request, res: Response) => {
  try {
    const data = await listarAsignaciones();
    res.json(data);
  } catch {
    res.status(500).json({ error: 'Error al listar asignaciones' });
  }
};

export const getAsignacion = async (req: Request, res: Response) => {
  try {
    const asignacion = await obtenerAsignacion(Number(req.params.id));
    if (!asignacion) return res.status(404).json({ error: 'Asignación no encontrada' });
    res.json(asignacion);
  } catch {
    res.status(500).json({ error: 'Error al obtener asignación' });
  }
};

export const postAsignacion = async (req: Request, res: Response) => {
  try {
    const { vehicle_id, usuario_id } = req.body;
    const nueva = await crearAsignacion(vehicle_id, usuario_id);
    res.status(201).json(nueva);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const putAsignacion = async (req: Request, res: Response) => {
  try {
    const actualizado = await actualizarAsignacion(Number(req.params.id), req.body);
    res.json(actualizado);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteAsignacion = async (req: Request, res: Response) => {
  try {
    await eliminarAsignacion(Number(req.params.id));
    res.json({ message: 'Asignación eliminada correctamente' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
