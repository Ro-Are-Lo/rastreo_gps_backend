import { Request, Response } from 'express';
import {
  listarConexiones,
  obtenerConexion,
  crearConexion,
  desconectarConexion
} from '../services/conexion.service';

export const getConexiones = async (req: Request, res: Response) => {
  try {
    const data = await listarConexiones();
    res.json(data);
  } catch {
    res.status(500).json({ error: 'Error al listar conexiones' });
  }
};

export const getConexion = async (req: Request, res: Response) => {
  try {
    const conexion = await obtenerConexion(Number(req.params.id));
    if (!conexion) return res.status(404).json({ error: 'Conexión no encontrada' });
    res.json(conexion);
  } catch {
    res.status(500).json({ error: 'Error al obtener conexión' });
  }
};

export const postConexion = async (req: Request, res: Response) => {
  try {
    const { vehicle_id, usuario_id, ip, user_agent } = req.body;
    const nueva = await crearConexion(vehicle_id, usuario_id, ip, user_agent);
    res.status(201).json(nueva);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const putDesconectar = async (req: Request, res: Response) => {
  try {
    const desconectada = await desconectarConexion(Number(req.params.id));
    res.json(desconectada);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
