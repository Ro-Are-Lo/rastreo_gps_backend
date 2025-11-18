//src/modules/usuarios/routes/usuarioRol.routes.ts
import { Router } from 'express';
import { UsuarioRolController } from '../controllers/usuarioRol.controller';

const router = Router();
const controller = new UsuarioRolController();

/**
 * @swagger
 * tags:
 *   name: UsuarioRoles
 *   description: Asignación de roles a usuarios
 */

router.post('/', controller.asignarRol);
router.delete('/', controller.removerRol);
router.get('/:id_usuario', controller.listarRolesUsuario);

export default router;
