//src/modules/usuarios/controllers/rol.controller.ts
import { Request, Response, NextFunction } from 'express';
import { RolService } from '../services/rol.service';
import { CrearRolDto } from '../dto/crearRol.dto';
import { ActualizarRolDto } from '../dto/actualizarRol.dto';

const service = new RolService();

export class RolController {
  crearRol = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto: CrearRolDto = req.body;
      const rol = await service.crearRol(dto);
      res.status(201).json(rol);
    } catch (err) {
      next(err);
    }
  };

  actualizarRol = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const dto: ActualizarRolDto = req.body;
      const updated = await service.actualizarRol(id, dto);
      res.json(updated);
    } catch (err) {
      next(err);
    }
  };

  eliminarRol = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const result = await service.eliminarRol(id);
      res.json({ success: true, message: 'Rol eliminado' });
    } catch (err) {
      next(err);
    }
  };

  listarRoles = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roles = await service.listarRoles();
      res.json(roles);
    } catch (err) {
      next(err);
    }
  };
}
