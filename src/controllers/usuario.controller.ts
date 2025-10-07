import { Request, Response } from 'express';
import {
  getAllUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario
} from '../services/usuario.service';
import { AuthRequest } from '../middlewares/auth.middleware';

// Listado completo (para admin)
export const listarUsuarios = async (_req: Request, res: Response) => {
  try {
    const usuarios = await getAllUsuarios();
    res.json(usuarios);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Detalle por id
export const obtenerUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const usuario = await getUsuarioById(Number(id));
    res.json(usuario);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

// Crear usuario (admin)
export const crearUsuario = async (req: Request, res: Response) => {
  try {
    const usuario = await createUsuario(req.body);
    res.status(201).json(usuario);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar usuario (admin)
export const actualizarUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const usuario = await updateUsuario(Number(id), req.body);
    res.json(usuario);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar usuario (admin)
export const eliminarUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await deleteUsuario(Number(id));
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * getUsuarios: función simple que usa el req.user (ej: para ver quién está autenticado)
 * la puedes usar para pruebas (no requiere role)
 */
export const getUsuarios = async (req: AuthRequest, res: Response) => {
  try {
    // Ejemplo: retornar el usuario autenticado y un listado sencillo
    const usuarios = await getAllUsuarios();
    res.json({ me: req.user, usuarios });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
