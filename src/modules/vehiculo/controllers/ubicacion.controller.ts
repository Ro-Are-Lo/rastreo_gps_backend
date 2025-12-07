// src/modules/vehiculo/controllers/ubicacion.controller.ts (AJUSTADO)
import { Request, Response, NextFunction } from 'express';
import { UbicacionService } from '../services/ubicacion.service';
import { CrearUbicacionDto } from '../dto/crearUbicacion.dto';

const service = new UbicacionService();

export class UbicacionController {
  registrar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto: CrearUbicacionDto = req.body;
      const result = await service.crearUbicacion(dto); // ✅ Ya está correcto
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  };

  historial = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id_vehiculo = Number(req.params.id_vehiculo);
      const result = await service.listarUbicacionesPorVehiculo(id_vehiculo); // ✅ Ya está correcto
      res.json(result);
    } catch (err) {
      next(err);
    }
  };

  // ✅ Añadir nuevo endpoint para última ubicación
  ultimaUbicacion = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id_vehiculo = Number(req.params.id_vehiculo);
      const result = await service.obtenerUltimaUbicacion(id_vehiculo);
      res.json(result);
    } catch (err) {
      next(err);
    }
  };

  // ✅ Añadir nuevo endpoint para calcular ruta
  calcularRuta = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id_vehiculo = Number(req.params.id_vehiculo);
      const { fechaInicio, fechaFin } = req.query;
      
      const fechaInicioDate = fechaInicio ? new Date(fechaInicio as string) : undefined;
      const fechaFinDate = fechaFin ? new Date(fechaFin as string) : undefined;
      
      const result = await service.calcularRuta(
        id_vehiculo, 
        fechaInicioDate!, 
        fechaFinDate!
      );
      
      res.json(result);
    } catch (err) {
      next(err);
    }
  };
}