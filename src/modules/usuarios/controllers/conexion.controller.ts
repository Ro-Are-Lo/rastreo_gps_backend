//src/modules/usuarios/controllers/conexion.controller.ts
import { Request, Response, NextFunction } from 'express';
import { ConexionService } from '../services/conexion.service';
import { CrearConexionDto } from '../dto/crearConexion.dto';

const service = new ConexionService();

export class ConexionController {
  crear = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto: CrearConexionDto = req.body;
      const result = await service.crearConexion(dto);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  };

  desconectar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const result = await service.desconectar(id);
      res.json({ success: true, message: 'Conexión finalizada', data: result });
    } catch (err) {
      next(err);
    }
  };

  listarPorUsuario = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id_usuario = Number(req.params.id_usuario);
      const result = await service.listarPorUsuario(id_usuario);
      res.json(result);
    } catch (err) {
      next(err);
    }
  };

  listarPorVehiculo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id_vehiculo = Number(req.params.id_vehiculo);
      const result = await service.listarPorVehiculo(id_vehiculo);
      res.json(result);
    } catch (err) {
      next(err);
    }
  };
}
