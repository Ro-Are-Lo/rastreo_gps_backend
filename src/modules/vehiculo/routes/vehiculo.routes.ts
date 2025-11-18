//src/modules/vehiculo/routes/vehiculo.routes.ts
import { Router } from 'express';
import { VehiculoController } from '../controllers/vehiculo.controller';

const router = Router();
const controller = new VehiculoController();

/**
 * @swagger
 * tags:
 *   name: Vehiculos
 *   description: Gestión de vehículos
 */

router.post('/', controller.crear);
router.put('/:id', controller.actualizar);
router.delete('/:id', controller.eliminar);
router.get('/', controller.listar);

export default router;
