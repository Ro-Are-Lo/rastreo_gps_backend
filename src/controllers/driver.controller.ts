/*
Controladores (capa de presentación)

Aquí se manejan las peticiones HTTP o eventos Socket.io.
No se hace lógica de negocio aquí — solo se recibe y responde.


// Controlador de conductores: maneja las peticiones HTTP
import { Request, Response } from 'express';
import { DriverService } from '../services/driver.service';

const driverService = new DriverService();

// GET: obtener todos los conductores
export const getAllDrivers = async (_req: Request, res: Response) => {
  const drivers = await driverService.getAllDrivers();
  res.json(drivers);
};

// POST: crear un nuevo conductor
export const createDriver = async (req: Request, res: Response) => {
  const { name, carPlate } = req.body;
  const newDriver = await driverService.createDriver({ name, carPlate });
  res.status(201).json(newDriver);
};
*/