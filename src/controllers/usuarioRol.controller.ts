import { Request, Response } from 'express';
import * as usuarioRolService from '../services/usuarioRol.service';

export const listarRolesDeUsuario = async (req: Request, res: Response) => {
  try {
    const usuario_id = Number(req.params.usuario_id);
    const roles = await usuarioRolService.listarRolesDeUsuario(usuario_id);
    res.json(roles);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const asignarRolAUsuario = async (req: Request, res: Response) => {
  try {
    const { usuario_id, rol_id } = req.body;
    const asignacion = await usuarioRolService.asignarRolAUsuario(usuario_id, rol_id);
    res.status(201).json(asignacion);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const quitarRolDeUsuario = async (req: Request, res: Response) => {
  try {
    const { usuario_id, rol_id } = req.body;
    await usuarioRolService.quitarRolDeUsuario(usuario_id, rol_id);
    res.json({ message: 'Rol eliminado del usuario correctamente' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
