/**
 * @swagger
 * tags:
 *   name: Ubicaciones
 *   description: Endpoints para el seguimiento de ubicaciones de los vehículos
 */

/**
 * @swagger
 * /ubicaciones/{vehicleId}:
 *   get:
 *     summary: Obtiene el historial de ubicaciones de un vehículo
 *     tags: [Ubicaciones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: vehicleId
 *         required: true
 *         description: ID del vehículo
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de ubicaciones del vehículo
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Vehículo no encontrado
 *
 * /ubicaciones/ultima/{vehicleId}:
 *   get:
 *     summary: Obtiene la última ubicación registrada de un vehículo
 *     tags: [Ubicaciones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: vehicleId
 *         required: true
 *         description: ID del vehículo
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Última ubicación del vehículo obtenida exitosamente
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Vehículo no encontrado
 *
 * /ubicaciones:
 *   post:
 *     summary: Registra una nueva ubicación enviada por un conductor
 *     tags: [Ubicaciones]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               vehicleId:
 *                 type: string
 *                 example: "vehiculo123"
 *               latitud:
 *                 type: number
 *                 example: -16.500
 *               longitud:
 *                 type: number
 *                 example: -68.150
 *               velocidad:
 *                 type: number
 *                 example: 45
 *               rumbo:
 *                 type: number
 *                 example: 180
 *     responses:
 *       201:
 *         description: Ubicación registrada correctamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 */



//src/routes/ubicacion.routes.ts
import { Router } from 'express';
import {
  getUbicaciones,
  getUltimaUbicacion,
  postUbicacion
} from '../controllers/ubicacion.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { checkRole } from '../middlewares/role.middleware';

const router = Router();

// Solo admin y operador pueden consultar ubicaciones
router.get('/:vehicleId', authMiddleware, checkRole(['admin', 'operador']), getUbicaciones);
router.get('/ultima/:vehicleId', authMiddleware, checkRole(['admin', 'operador']), getUltimaUbicacion);

// Los conductores envían ubicación desde la app móvil
router.post('/', authMiddleware, checkRole(['conductor']), postUbicacion);

export default router;
