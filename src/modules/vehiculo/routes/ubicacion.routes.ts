//src/modules/vehiculo/routes/ubicacion.routes.ts
import { Router } from 'express';
import { UbicacionController } from '../controllers/ubicacion.controller';

const router = Router();
const controller = new UbicacionController();

/**
 * @swagger
 * tags:
 *   name: Ubicaciones
 *   description: Gestión de ubicaciones de vehículos
 */

router.post('/', controller.registrar);
router.get('/vehiculo/:id_vehiculo', controller.historial);

export default router;
