// src/modules/usuarios/controllers/asignacion.controller.ts
import { Request, Response, NextFunction } from 'express';
import { AsignacionService } from '../services/asignacion.service';
import { CrearAsignacionDto } from '../dto/crearAsignacion.dto';
import { ActualizarAsignacionDto } from '../dto/actualizarAsignacion.dto';

const service = new AsignacionService();

export class AsignacionController {
  crear = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto: CrearAsignacionDto = req.body;
      const result = await service.crearAsignacion(dto);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  };

  actualizar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const dto: ActualizarAsignacionDto = req.body;
      const result = await service.actualizarAsignacion(id, dto);
      res.json(result);
    } catch (err) {
      next(err);
    }
  };

  eliminar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      await service.eliminarAsignacion(id);
      res.json({ success: true, message: 'Asignación eliminada' });
    } catch (err) {
      next(err);
    }
  };

  listarPorUsuario = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id_usuario = Number(req.params.id_usuario);
      // ❌ Cambiar: service.listarPorUsuario → service.listarAsignacionesPorUsuario
      const result = await service.listarAsignacionesPorUsuario(id_usuario);
      res.json(result);
    } catch (err) {
      next(err);
    }
  };

  listarPorVehiculo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id_vehiculo = Number(req.params.id_vehiculo);
      // ❌ Cambiar: service.listarPorVehiculo → service.listarAsignacionesPorVehiculo
      const result = await service.listarAsignacionesPorVehiculo(id_vehiculo);
      res.json(result);
    } catch (err) {
      next(err);
    }
  };
}