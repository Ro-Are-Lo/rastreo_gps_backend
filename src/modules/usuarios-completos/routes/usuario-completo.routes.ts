// src/modules/usuarios-completos/routes/usuario-completo.routes.ts
import { Router } from 'express';
import { UsuarioCompletoController } from '../controllers/usuario-completo.controller';
import { authMiddleware } from '../../../shared/middlewares/auth.middleware'; // ✅
import { checkRole } from '../../../shared/middlewares/role.middleware'; // ✅

const router = Router();
const controller = new UsuarioCompletoController();

// Todas las rutas requieren autenticación
router.use(authMiddleware);

// Rutas públicas (para usuarios autenticados)
router.get('/', controller.listar.bind(controller));
router.get('/:id', controller.obtenerPorId.bind(controller));

// Rutas de administrador
router.use(checkRole(['admin']));
router.post('/', controller.crear.bind(controller));
router.put('/:id', controller.actualizar.bind(controller));
router.delete('/:id', controller.eliminar.bind(controller));
router.patch('/:id/reactivar', controller.reactivar.bind(controller));

export default router;