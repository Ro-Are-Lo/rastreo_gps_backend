
/**
 * @swagger
 * tags:
 *   - name: Conexiones
 *     description: Endpoints para gestionar las conexiones entre conductores y vehículos.
 */

/**
 * @swagger
 * /api/conexiones:
 *   get:
 *     summary: Obtener todas las conexiones
 *     description: Devuelve la lista completa de conexiones activas o registradas en el sistema.
 *     tags: [Conexiones]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de conexiones obtenida correctamente.
 *       401:
 *         description: Token no proporcionado o inválido.
 *       403:
 *         description: Acceso denegado, rol no autorizado.
 */
/**
 * @swagger
 * /api/conexiones/{id}:
 *   get:
 *     summary: Obtener una conexión por ID
 *     description: Devuelve la información de una conexión específica por su ID.
 *     tags: [Conexiones]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de la conexión
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Conexión obtenida correctamente.
 *       404:
 *         description: Conexión no encontrada.
 *       401:
 *         description: Token no válido o no proporcionado.
 */
/**
 * @swagger
 * /api/conexiones:
 *   post:
 *     summary: Crear una nueva conexión
 *     description: Registra una nueva conexión entre un conductor y un vehículo.
 *     tags: [Conexiones]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - conductorId
 *               - vehiculoId
 *             properties:
 *               conductorId:
 *                 type: string
 *                 description: ID del conductor
 *                 example: "cd12345"
 *               vehiculoId:
 *                 type: string
 *                 description: ID del vehículo
 *                 example: "vh67890"
 *     responses:
 *       201:
 *         description: Conexión creada correctamente.
 *       400:
 *         description: Datos inválidos o faltantes.
 *       401:
 *         description: Token no válido o no proporcionado.
 *       403:
 *         description: Acceso denegado, rol no autorizado.
 */

/**
 * @swagger
 * /api/conexiones/desconectar/{id}:
 *   put:
 *     summary: Desconectar una conexión
 *     description: Marca una conexión existente como desconectada.
 *     tags: [Conexiones]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de la conexión a desconectar
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Conexión desconectada correctamente.
 *       404:
 *         description: Conexión no encontrada.
 *       401:
 *         description: Token no válido o no proporcionado.
 *       403:
 *         description: Acceso denegado, rol no autorizado.
 */
import { Router } from 'express';
import {
  getConexiones,
  getConexion,
  postConexion,
  putDesconectar
} from '../controllers/conexion.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { checkRole } from '../middlewares/role.middleware';

const router = Router();

router.get('/', authMiddleware, checkRole(['admin', 'operador']), getConexiones);
router.get('/:id', authMiddleware, checkRole(['admin', 'operador']), getConexion);
router.post('/', authMiddleware, checkRole(['admin']), postConexion);
router.put('/desconectar/:id', authMiddleware, checkRole(['admin']), putDesconectar);

export default router;
