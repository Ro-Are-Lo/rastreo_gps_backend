import { Request, Response } from 'express';
import * as rolService from '../services/rol.service';

export const listarRoles = async (req: Request, res: Response) => {
  try {
    const roles = await rolService.listarRoles();
    res.json(roles);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerRol = async (req: Request, res: Response) => {
  try {
    const rol = await rolService.obtenerRol(Number(req.params.id));
    if (!rol) return res.status(404).json({ error: 'Rol no encontrado' });
    res.json(rol);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const crearRol = async (req: Request, res: Response) => {
  try {
    const { nombre } = req.body;
    const rol = await rolService.crearRol(nombre);
    res.status(201).json(rol);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const actualizarRol = async (req: Request, res: Response) => {
  try {
    const { nombre } = req.body;
    const rol = await rolService.actualizarRol(Number(req.params.id), nombre);
    res.json(rol);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const eliminarRol = async (req: Request, res: Response) => {
  try {
    await rolService.eliminarRol(Number(req.params.id));
    res.json({ message: 'Rol eliminado correctamente' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
