/**
 * @swagger
 * tags:
 *   name: Asignaciones
 *   description: Gestión de asignaciones de vehículos a conductores
 */

/**
 * @swagger
 * /api/asignaciones:
 *   get:
 *     summary: Lista todas las asignaciones
 *     tags: [Asignaciones]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de asignaciones obtenida correctamente
 *       401:
 *         description: Token no proporcionado o inválido
 */

/**
 * @swagger
 * /api/asignaciones/{id}:
 *   get:
 *     summary: Obtiene una asignación por ID
 *     tags: [Asignaciones]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la asignación a obtener
 *     responses:
 *       200:
 *         description: Asignación obtenida correctamente
 *       401:
 *         description: Token no proporcionado o inválido
 *       404:
 *         description: Asignación no encontrada
 */

/**
 * @swagger
 * /api/asignaciones:
 *   post:
 *     summary: Crea una nueva asignación
 *     tags: [Asignaciones]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               conductor_id:
 *                 type: integer
 *               vehiculo_id:
 *                 type: integer
 *               estado:
 *                 type: string
 *     responses:
 *       201:
 *         description: Asignación creada correctamente
 *       401:
 *         description: Token no proporcionado o inválido
 */

/**
 * @swagger
 * /api/asignaciones/{id}:
 *   put:
 *     summary: Actualiza una asignación existente
 *     tags: [Asignaciones]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la asignación a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               conductor_id:
 *                 type: integer
 *               vehiculo_id:
 *                 type: integer
 *               estado:
 *                 type: string
 *     responses:
 *       200:
 *         description: Asignación actualizada correctamente
 *       401:
 *         description: Token no proporcionado o inválido
 *       404:
 *         description: Asignación no encontrada
 */

/**
 * @swagger
 * /api/asignaciones/{id}:
 *   delete:
 *     summary: Elimina una asignación
 *     tags: [Asignaciones]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la asignación a eliminar
 *     responses:
 *       200:
 *         description: Asignación eliminada correctamente
 *       401:
 *         description: Token no proporcionado o inválido
 *       404:
 *         description: Asignación no encontrada
 */



//src/routes/asignacion.routes.ts
import { Router } from 'express';
import {
  getAsignaciones,
  getAsignacion,
  postAsignacion,
  putAsignacion,
  deleteAsignacion
} from '../controllers/asignacion.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { checkRole } from '../middlewares/role.middleware';

const router = Router();

router.get('/', authMiddleware, checkRole(['admin', 'operador']), getAsignaciones);
router.get('/:id', authMiddleware, checkRole(['admin', 'operador']), getAsignacion);
router.post('/', authMiddleware, checkRole(['admin']), postAsignacion);
router.put('/:id', authMiddleware, checkRole(['admin']), putAsignacion);
router.delete('/:id', authMiddleware, checkRole(['admin']), deleteAsignacion);

export default router;
