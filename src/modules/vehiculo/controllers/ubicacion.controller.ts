//src/modules/vehiculo/controllers/ubicacion.controller.ts
import { Request, Response, NextFunction } from 'express';
import { UbicacionService } from '../services/ubicacion.service';
import { CrearUbicacionDto } from '../dto/crearUbicacion.dto';

const service = new UbicacionService();

export class UbicacionController {
  registrar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto: CrearUbicacionDto = req.body;
      const result = await service.registrarUbicacion(dto);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  };

  historial = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id_vehiculo = Number(req.params.id_vehiculo);
      const result = await service.historialVehiculo(id_vehiculo);
      res.json(result);
    } catch (err) {
      next(err);
    }
  };
}
