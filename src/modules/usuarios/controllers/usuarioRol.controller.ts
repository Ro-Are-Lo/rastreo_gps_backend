//src/modules/usuarios/controllers/usuarioRol.controller.ts
import { Request, Response, NextFunction } from 'express';
import { UsuarioRolService } from '../services/usuarioRol.service';

const service = new UsuarioRolService();

export class UsuarioRolController {
  asignarRol = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id_usuario, id_rol } = req.body;
      const result = await service.asignarRol(id_usuario, id_rol);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  };

  removerRol = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id_usuario, id_rol } = req.body;
      const result = await service.removerRol(id_usuario, id_rol);
      res.json({ success: true, message: 'Rol removido' });
    } catch (err) {
      next(err);
    }
  };

  listarRolesUsuario = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id_usuario = Number(req.params.id_usuario);
      const roles = await service.listarRolesUsuario(id_usuario);
      res.json(roles);
    } catch (err) {
      next(err);
    }
  };
}
