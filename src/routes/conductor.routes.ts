/**
 * @swagger
 * tags:
 *   name: Conductores
 *   description: Gestión de conductores registrados
 */

/**
 * @swagger
 * /api/conductores:
 *   get:
 *     summary: Lista todos los conductores
 *     tags: [Conductores]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de conductores obtenida correctamente
 *       401:
 *         description: Token no proporcionado o inválido
 */

/**
 * @swagger
 * /api/conductores/{id}:
 *   get:
 *     summary: Obtiene un conductor por ID
 *     tags: [Conductores]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del conductor a obtener
 *     responses:
 *       200:
 *         description: Conductor obtenido correctamente
 *       401:
 *         description: Token no proporcionado o inválido
 *       404:
 *         description: Conductor no encontrado
 */

/**
 * @swagger
 * /api/conductores:
 *   post:
 *     summary: Crea un nuevo conductor
 *     tags: [Conductores]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario_id:
 *                 type: integer
 *               licencia_numero:
 *                 type: string
 *               categoria:
 *                 type: string
 *               estado:
 *                 type: string
 *     responses:
 *       201:
 *         description: Conductor creado correctamente
 *       401:
 *         description: Token no proporcionado o inválido
 */

/**
 * @swagger
 * /api/conductores/{id}:
 *   put:
 *     summary: Actualiza un conductor existente
 *     tags: [Conductores]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del conductor a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               licencia_numero:
 *                 type: string
 *               categoria:
 *                 type: string
 *               estado:
 *                 type: string
 *     responses:
 *       200:
 *         description: Conductor actualizado correctamente
 *       401:
 *         description: Token no proporcionado o inválido
 *       404:
 *         description: Conductor no encontrado
 */

/**
 * @swagger
 * /api/conductores/{id}:
 *   delete:
 *     summary: Elimina un conductor
 *     tags: [Conductores]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del conductor a eliminar
 *     responses:
 *       200:
 *         description: Conductor eliminado correctamente
 *       401:
 *         description: Token no proporcionado o inválido
 *       404:
 *         description: Conductor no encontrado
 */



//src/routes/conductor.routes.ts
import { Router } from 'express';
import {
  getConductores,
  getConductor,
  postConductor,
  putConductor,
  deleteConductor,
} from '../controllers/conductor.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { checkRole } from '../middlewares/role.middleware';

const router = Router();

router.get('/', authMiddleware, checkRole(['admin', 'operador']), getConductores);
router.get('/:id', authMiddleware, checkRole(['admin', 'operador']), getConductor);
router.post('/', authMiddleware, checkRole(['admin']), postConductor);
router.put('/:id', authMiddleware, checkRole(['admin']), putConductor);
router.delete('/:id', authMiddleware, checkRole(['admin']), deleteConductor);

export default router;
    