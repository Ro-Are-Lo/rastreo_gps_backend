//src/modules/usuarios/routes/conexion.routes.ts
import { Router } from 'express';
import { ConexionController } from '../controllers/conexion.controller';

const router = Router();
const controller = new ConexionController();

/**
 * @swagger
 * tags:
 *   name: Conexiones
 *   description: Gestión de conexiones de usuarios y vehículos
 */

router.post('/', controller.crear);
router.put('/desconectar/:id', controller.desconectar);
router.get('/usuario/:id_usuario', controller.listarPorUsuario);
router.get('/vehiculo/:id_vehiculo', controller.listarPorVehiculo);

export default router;
