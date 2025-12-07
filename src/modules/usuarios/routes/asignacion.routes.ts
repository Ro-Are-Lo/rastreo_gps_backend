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
 */

router.post('/',validateBody(CrearAsignacionDto), controller.crear);

/**
 * @swagger
 * /api/asignaciones/{id}:
 *   put:
 *     summary: Actualizar una asignación existente
 *     tags: [Asignaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ActualizarAsignacionDto'
 *     responses:
 *       200:
 *         description: Asignación actualizada exitosamente
 */
router.put('/:id',validateBody(ActualizarAsignacionDto), controller.actualizar);
/**
 * @swagger
 * /api/asignaciones/{id}:
 *   delete:
 *     summary: Eliminar una asignación
 *     tags: [Asignaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Asignación eliminada
 */

router.delete('/:id', controller.eliminar);
/**
 * @swagger
 * /api/asignaciones/usuario/{id_usuario}:
 *   get:
 *     summary: Listar asignaciones por usuario
 *     tags: [Asignaciones]
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de asignaciones
 */

router.get('/usuario/:id_usuario', controller.listarPorUsuario);


/**
 * @swagger
 * /api/asignaciones/vehiculo/{id_vehiculo}:
 *   get:
 *     summary: Listar asignaciones por vehículo
 *     tags: [Asignaciones]
 *     parameters:
 *       - in: path
 *         name: id_vehiculo
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de asignaciones
 */

router.get('/vehiculo/:id_vehiculo', controller.listarPorVehiculo);

export default router;
