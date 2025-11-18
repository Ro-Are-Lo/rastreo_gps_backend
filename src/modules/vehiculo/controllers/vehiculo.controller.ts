//src/modules/vehiculo/controllers/vehiculo.controller.ts
import { Request, Response, NextFunction } from 'express';
import { VehiculoService } from '../services/vehiculo.service';
import { CrearVehiculoDto } from '../dto/crearVehiculo.dto';
import { ActualizarVehiculoDto } from '../dto/actualizarVehiculo.dto';

const service = new VehiculoService();

export class VehiculoController {
  crear = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto: CrearVehiculoDto = req.body;
      const result = await service.crearVehiculo(dto);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  };

  actualizar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const dto: ActualizarVehiculoDto = req.body;
      const result = await service.actualizarVehiculo(id, dto);
      res.json(result);
    } catch (err) {
      next(err);
    }
  };

  eliminar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      await service.eliminarVehiculo(id);
      res.json({ success: true, message: 'Vehículo eliminado' });
    } catch (err) {
      next(err);
    }
  };

  listar = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await service.listarVehiculos();
      res.json(result);
    } catch (err) {
      next(err);
    }
  };
}
