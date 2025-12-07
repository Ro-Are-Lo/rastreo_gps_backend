//src/modules/usuarios/routes/conexion.routes.ts
import { Router } from 'express';
import { ConexionController } from '../controllers/conexion.controller';

const router = Router();
const controller = new ConexionController();


/**
 * @swagger
 * tags:
 *   name: Conexiones
 *   description: Gestión de conexiones de usuarios y vehículos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CrearConexionDto:
 *       type: object
 *       required:
 *         - id_usuario
 *         - id_vehiculo
 *       properties:
 *         id_usuario:
 *           type: integer
 *           example: 12
 *         id_vehiculo:
 *           type: integer
 *           example: 45
 *         ip:
 *           type: string
 *           nullable: true
 *           example: "192.168.1.20"
 *         sesion_dispositivo:
 *           type: string
 *           nullable: true
 *           example: "android-abc123"
 */
router.post('/', controller.crear);

/**
 * @swagger
 * /api/conexiones:
 *   post:
 *     summary: Registrar una nueva conexión
 *     tags: [Conexiones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CrearConexionDto'
 *     responses:
 *       201:
 *         description: Conexión creada correctamente
 */
router.put('/desconectar/:id', controller.desconectar);

/**
 * @swagger
 * /api/conexiones/desconectar/{id}:
 *   put:
 *     summary: Finalizar una conexión activa
 *     tags: [Conexiones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la conexión
 *     responses:
 *       200:
 *         description: Conexión finalizada
 *       404:
 *         description: Conexión no encontrada
 */

router.put('/desconectar/:id', controller.desconectar);
/**
 * @swagger
 * /api/conexiones/usuario/{id_usuario}:
 *   get:
 *     summary: Obtener conexiones por usuario
 *     tags: [Conexiones]
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de conexiones del usuario
 */

router.get('/usuario/:id_usuario', controller.listarPorUsuario);
/**
 * @swagger
 * /api/conexiones/vehiculo/{id_vehiculo}:
 *   get:
 *     summary: Obtener conexiones por vehículo
 *     tags: [Conexiones]
 *     parameters:
 *       - in: path
 *         name: id_vehiculo
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del vehículo
 *     responses:
 *       200:
 *         description: Lista de conexiones del vehículo
 */

router.get('/vehiculo/:id_vehiculo', controller.listarPorVehiculo);

export default router;
