// src/modules/usuarios/controllers/conexion.controller.ts
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
      // ❌ Cambiar: service.desconectar → service.desconectarConexion
      const result = await service.desconectarConexion(id);
      res.json({ success: true, message: 'Conexión finalizada', data: result });
    } catch (err) {
      next(err);
    }
  };

  listarPorUsuario = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id_usuario = Number(req.params.id_usuario);
      // ❌ Cambiar: service.listarPorUsuario → service.listarConexionesPorUsuario
      const result = await service.listarConexionesPorUsuario(id_usuario);
      res.json(result);
    } catch (err) {
      next(err);
    }
  };

  listarPorVehiculo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id_vehiculo = Number(req.params.id_vehiculo);
      // ❌ Cambiar: service.listarPorVehiculo → service.listarConexionesPorVehiculo
      const result = await service.listarConexionesPorVehiculo(id_vehiculo);
      res.json(result);
    } catch (err) {
      next(err);
    }
  };
}