// src/modules/usuarios/controllers/usuarioRol.controller.ts (CORREGIDO)
import { Request, Response, NextFunction } from 'express';
import { UsuarioRolService } from '../services/usuarioRol.service';
import { CrearUsuarioRolDto } from '../dto/crearUsarioRol.dto';
import { BorrarUsuarioRolDto } from '../dto/borrarUsuarioRol.dto'; // ✅ Añadir import

const service = new UsuarioRolService();

export class UsuarioRolController {
  asignarRol = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto: CrearUsuarioRolDto = req.body; // ✅ Crear DTO
      const result = await service.asignarRol(dto); // ✅ Pasar DTO, no parámetros separados
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  };

  removerRol = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto: BorrarUsuarioRolDto = req.body; // ✅ Crear DTO
      const result = await service.borrarRol(dto); // ✅ Método se llama "borrarRol", no "removerRol"
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