//src/modules/usuarios/routes/asignacion.routes.ts
import { Router } from 'express';
import { AsignacionController } from '../controllers/asignacion.controller';
import { validateBody } from '../../../shared/middlewares/validate.middleware';
import { CrearAsignacionDto } from '../dto/crearAsignacion.dto';
import { ActualizarAsignacionDto } from '../dto/actualizarAsignacion.dto';


const router = Router();
const controller = new AsignacionController();

/**
 * @swagger
 * tags:
 *   name: Asignaciones
 *   description: Gestión de asignaciones de vehículos a usuarios
 */

/** 
 * @swagger
 * /api/asignaciones:
 *   post:
 *     summary: Crear una nueva asignación
 *     tags: [Asignaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CrearAsignacionDto'
 *     responses:
 *       201:
 *         description: Asignación creada exitosamente
 *       400:
 *         description: Error en la solicitud
 *   put:
 *     summary: Actualizar una asignación existente
 *     tags: [Asignaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la asignación a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ActualizarAsignacionDto'
 *     responses:
 *       200:
 *         description: Asignación actualizada exitosamente
 *       400:
 *         description: Error en la solicitud
 *   delete:
 *     summary: Eliminar una asignación
 *     tags: [Asignaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la asignación a eliminar
 *     responses:
 *       200:
 *         description: Asignación eliminada exitosamente
 *       404:
 *         description: Asignación no encontrada
 *   get:
 *     summary: Listar asignaciones por usuario o vehículo
 *     tags: [Asignaciones]
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         schema:
 *           type: string
 *         required: false
 *         description: ID del usuario para filtrar asignaciones
 *       - in: path
 *         name: id_vehiculo
 *         schema:
 *           type: string
 *         required: false
 *         description: ID del vehículo para filtrar asignaciones
 *     responses:
 *       200:
 *         description: Lista de asignaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Asignacion'
 *       404:
 *         description: No se encontraron asignaciones
 **/
router.post('/',validateBody(CrearAsignacionDto), controller.crear);
router.put('/:id',validateBody(ActualizarAsignacionDto), controller.actualizar);
router.delete('/:id', controller.eliminar);
router.get('/usuario/:id_usuario', controller.listarPorUsuario);
router.get('/vehiculo/:id_vehiculo', controller.listarPorVehiculo);

export default router;
