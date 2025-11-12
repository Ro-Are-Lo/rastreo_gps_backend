/**
 * @swagger
 * tags:
 *   name: Vehículos
 *   description: Gestión de vehículos registrados
 */

/**
 * @swagger
 * /api/vehiculos:
 *   get:
 *     summary: Lista todos los vehículos
 *     tags: [Vehículos]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de vehículos obtenida correctamente
 *       401:
 *         description: Token no proporcionado o inválido
 */

/**
 * @swagger
 * /api/vehiculos/{id}:
 *   get:
 *     summary: Obtiene un vehículo por ID
 *     tags: [Vehículos]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del vehículo a obtener
 *     responses:
 *       200:
 *         description: Vehículo obtenido correctamente
 *       401:
 *         description: Token no proporcionado o inválido
 *       404:
 *         description: Vehículo no encontrado
 */

/**
 * @swagger
 * /api/vehiculos:
 *   post:
 *     summary: Crea un nuevo vehículo
 *     tags: [Vehículos]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               placa:
 *                 type: string
 *               marca:
 *                 type: string
 *               modelo:
 *                 type: string
 *               color:
 *                 type: string
 *               año:
 *                 type: integer
 *               estado:
 *                 type: string
 *               conductor_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Vehículo creado correctamente
 *       401:
 *         description: Token no proporcionado o inválido
 */

/**
 * @swagger
 * /api/vehiculos/{id}:
 *   put:
 *     summary: Actualiza un vehículo existente
 *     tags: [Vehículos]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del vehículo a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               placa:
 *                 type: string
 *               marca:
 *                 type: string
 *               modelo:
 *                 type: string
 *               color:
 *                 type: string
 *               año:
 *                 type: integer
 *               estado:
 *                 type: string
 *               conductor_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Vehículo actualizado correctamente
 *       401:
 *         description: Token no proporcionado o inválido
 *       404:
 *         description: Vehículo no encontrado
 */

/**
 * @swagger
 * /api/vehiculos/{id}:
 *   delete:
 *     summary: Elimina un vehículo
 *     tags: [Vehículos]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del vehículo a eliminar
 *     responses:
 *       200:
 *         description: Vehículo eliminado correctamente
 *       401:
 *         description: Token no proporcionado o inválido
 *       404:
 *         description: Vehículo no encontrado
 */

import { Router } from 'express';
import {
  getVehiculos,
  getVehiculo,
  postVehiculo,
  putVehiculo,
  deleteVehiculo,
} from '../controllers/vehiculo.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { checkRole } from '../middlewares/role.middleware';

const router = Router();

router.get('/', authMiddleware, checkRole(['admin', 'operador']), getVehiculos);
router.get('/:id', authMiddleware, checkRole(['admin', 'operador']), getVehiculo);
router.post('/', authMiddleware, checkRole(['admin']), postVehiculo);
router.put('/:id', authMiddleware, checkRole(['admin']), putVehiculo);
router.delete('/:id', authMiddleware, checkRole(['admin']), deleteVehiculo);

export default router;
