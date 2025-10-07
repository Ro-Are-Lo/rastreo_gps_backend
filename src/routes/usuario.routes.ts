import { Router } from 'express';
import {
  listarUsuarios,
  obtenerUsuario,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  getUsuarios
} from '../controllers/usuario.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { checkRole } from '../middlewares/role.middleware';

const router = Router();

// Rutas protegidas por JWT y solo accesibles por 'admin' (CRUD)
router.get('/', authMiddleware, checkRole(['admin']), listarUsuarios);
router.get('/:id', authMiddleware, checkRole(['admin']), obtenerUsuario);
router.post('/', authMiddleware, checkRole(['admin']), crearUsuario);
router.put('/:id', authMiddleware, checkRole(['admin']), actualizarUsuario);
router.delete('/:id', authMiddleware, checkRole(['admin']), eliminarUsuario);

// Ruta auxiliar para pruebas (necesita solo auth)
router.get('/me/list', authMiddleware, getUsuarios);

export default router;
