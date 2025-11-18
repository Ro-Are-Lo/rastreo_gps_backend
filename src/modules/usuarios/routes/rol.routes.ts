//src/modules/usuarios/routes/rol.routes.ts
import { Router } from 'express';
import { RolController } from '../controllers/rol.controller';

const router = Router();
const controller = new RolController();

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Gestión de roles
 */

router.post('/', controller.crearRol);
router.get('/', controller.listarRoles);
router.put('/:id', controller.actualizarRol);
router.delete('/:id', controller.eliminarRol);

export default router;
