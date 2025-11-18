//src/modules/usuarios/controllers/usuario.controller.ts

import { Request, Response, NextFunction } from 'express';
import { UsuarioService } from '../services/usuario.service';
import { CrearUsuarioDto } from '../dto/crearUsuario.dto';
import { ActualizarUsuarioDto } from '../dto/actualizarUsuario.dto';

const service = new UsuarioService();

export class UsuarioController {
  crearUsuario = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto: CrearUsuarioDto = req.body;
      const user = await service.crearUsuario(dto);
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  };

  actualizarUsuario = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const dto: ActualizarUsuarioDto = req.body;
      const updated = await service.actualizarUsuario(id, dto);
      res.json(updated);
    } catch (err) {
      next(err);
    }
  };

  obtenerUsuario = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const user = await service.obtenerUsuario(id);
      res.json(user);
    } catch (err) {
      next(err);
    }
  };

  eliminarUsuario = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const result = await service.eliminarUsuario(id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  };
}
