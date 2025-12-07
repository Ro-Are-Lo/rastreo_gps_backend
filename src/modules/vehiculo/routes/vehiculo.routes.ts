//src/modules/vehiculo/routes/vehiculo.routes.ts
import { Router } from 'express';
import { VehiculoController } from '../controllers/vehiculo.controller';

const router = Router();
const controller = new VehiculoController();

/**
 * @swagger
 * tags:
 *   name: Vehiculos
 *   description: Gestión de vehículos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CrearVehiculoDto:
 *       type: object
 *       required:
 *         - placa
 *       properties:
 *         placa:
 *           type: string
 *           example: "ABC-123"
 *         modelo:
 *           type: string
 *           example: "Toyota Corolla"
 *         anio:
 *           type: integer
 *           example: 2021
 *
 *     ActualizarVehiculoDto:
 *       type: object
 *       properties:
 *         modelo:
 *           type: string
 *           example: "Toyota Corolla"
 *         anio:
 *           type: integer
 *           example: 2022
 *         activo:
 *           type: boolean
 *           example: true
 *
 *     VehiculoResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         placa:
 *           type: string
 *           example: "ABC-123"
 *         modelo:
 *           type: string
 *           example: "Toyota Corolla"
 *         anio:
 *           type: integer
 *           example: 2021
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

// --- Rutas ---

/**
 * @swagger
 * /vehiculos:
 *   post:
 *     summary: ➕ Crear un nuevo vehículo
 *     tags: [Vehiculos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CrearVehiculoDto'
 *     responses:
 *       201:
 *         description: Vehículo creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VehiculoResponse'
 *       400:
 *         description: Datos de entrada inválidos o placa duplicada
 */
router.post('/', controller.crear);

/**
 * @swagger
 * /vehiculos:
 *   get:
 *     summary: 📋 Listar todos los vehículos activos
 *     tags: [Vehiculos]
 *     responses:
 *       200:
 *         description: Lista de vehículos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/VehiculoResponse'
 */
router.get('/', controller.listar);

/**
 * @swagger
 * /vehiculos/{id}:
 *   put:
 *     summary: ✏️ Actualizar un vehículo existente
 *     tags: [Vehiculos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del vehículo a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ActualizarVehiculoDto'
 *     responses:
 *       200:
 *         description: Vehículo actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VehiculoResponse'
 *       404:
 *         description: Vehículo no encontrado
 */
router.put('/:id', controller.actualizar);

/**
 * @swagger
 * /vehiculos/{id}:
 *   delete:
 *     summary: 🗑️ Eliminar un vehículo (soft delete)
 *     tags: [Vehiculos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del vehículo a eliminar
 *     responses:
 *       200:
 *         description: Vehículo eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Vehículo eliminado"
 *       404:
 *         description: Vehículo no encontrado
 */
router.delete('/:id', controller.eliminar);

export default router;
