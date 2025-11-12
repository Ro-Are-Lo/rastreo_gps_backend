import { Request, Response } from 'express';
import {
  listarConductores,
  obtenerConductor,
  crearConductor,
  actualizarConductor,
  eliminarConductor,
} from '../services/conductor.service';

export const getConductores = async (req: Request, res: Response) => {
  try {
    const data = await listarConductores();
    res.json(data);
  } catch {
    res.status(500).json({ error: 'Error al listar conductores' });
  }
};

export const getConductor = async (req: Request, res: Response) => {
  try {
    const conductor = await obtenerConductor(Number(req.params.id));
    if (!conductor) return res.status(404).json({ error: 'Conductor no encontrado' });
    res.json(conductor);
  } catch {
    res.status(500).json({ error: 'Error al obtener conductor' });
  }
};

export const postConductor = async (req: Request, res: Response) => {
  try {
    const nuevo = await crearConductor(req.body);
    res.status(201).json(nuevo);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const putConductor = async (req: Request, res: Response) => {
  try {
    const actualizado = await actualizarConductor(Number(req.params.id), req.body);
    res.json(actualizado);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteConductor = async (req: Request, res: Response) => {
  try {
    await eliminarConductor(Number(req.params.id));
    res.json({ message: 'Conductor eliminado correctamente' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
