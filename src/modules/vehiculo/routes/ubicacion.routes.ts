//src/modules/vehiculo/routes/ubicacion.routes.ts
import { Router } from 'express';
import { UbicacionController } from '../controllers/ubicacion.controller';

const router = Router();
const controller = new UbicacionController();

/**
 * @swagger
 * tags:
 *   name: Ubicaciones
 *   description: Gestión de ubicaciones de vehículos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CrearUbicacionDto:
 *       type: object
 *       required:
 *         - id_vehiculo
 *         - latitud
 *         - longitud
 *       properties:
 *         id_vehiculo:
 *           type: integer
 *           example: 12
 *         latitud:
 *           type: number
 *           format: double
 *           example: -17.7833
 *         longitud:
 *           type: number
 *           format: double
 *           example: -63.1821
 *         velocidad_kmh:
 *           type: number
 *           format: double
 *           example: 45.6
 *         fecha_hora:
 *           type: string
 *           format: date-time
 *           example: "2024-11-20T14:30:00Z"
 *
 *     UbicacionResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 100
 *         id_vehiculo:
 *           type: integer
 *           example: 12
 *         latitud:
 *           type: number
 *           example: -17.7833
 *         longitud:
 *           type: number
 *           example: -63.1821
 *         velocidad_kmh:
 *           type: number
 *           example: 52
 *         fecha_hora:
 *           type: string
 *           format: date-time
 *           example: "2024-11-20T14:30:00Z"
 *         fecha_creacion:
 *           type: string
 *           format: date-time
 *         fecha_modificacion:
 *           type: string
 *           format: date-time
 *         activo:
 *           type: boolean
 *           example: true
 *         eliminado:
 *           type: boolean
 *           example: false
 */

/**
 * @swagger
 * /api/ubicaciones:
 *   post:
 *     summary: Registrar una ubicación de un vehículo
 *     tags: [Ubicaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CrearUbicacionDto'
 *     responses:
 *       201:
 *         description: Ubicación registrada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UbicacionResponse'
 */

/**
 * @swagger
 * /api/ubicaciones/vehiculo/{id_vehiculo}:
 *   get:
 *     summary: Obtener historial de ubicaciones de un vehículo
 *     tags: [Ubicaciones]
 *     parameters:
 *       - in: path
 *         name: id_vehiculo
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del vehículo
 *     responses:
 *       200:
 *         description: Historial de ubicaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UbicacionResponse'
 */


router.post('/', controller.registrar);
router.get('/vehiculo/:id_vehiculo', controller.historial);

export default router;
