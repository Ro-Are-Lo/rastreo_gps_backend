/*

Definición de rutas Express

Aquí defines las rutas HTTP y conectas con los controladores.

import { Router } from 'express';
import { getAllDrivers, createDriver } from '../controllers/driver.controller';

const router = Router();

// Definición de endpoints HTTP
router.get('/', getAllDrivers);
router.post('/', createDriver);

export default router;
*/