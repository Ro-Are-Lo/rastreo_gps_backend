import { Router } from 'express';
import { RolController } from '../controllers/rol.controller';
import { validateBody } from '../../../shared/middlewares/validate.middleware';
import { CrearRolDto } from '../dto/crearRol.dto';
import { ActualizarRolDto } from '../dto/actualizarRol.dto';

const router = Router();
const controller = new RolController();

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Gestión de roles
 */

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Gestión de roles
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CrearRolDto:
 *       type: object
 *       required:
 *         - nombre
 *       properties:
 *         nombre:
 *           type: string
 *           example: "Administrador"
 *
 *     ActualizarRolDto:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *           example: "Supervisor"
 *         activo:
 *           type: boolean
 *           example: true
 *
 *     RolResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nombre:
 *           type: string
 *           example: "Administrador"
 *         fecha_creacion:
 *           type: string
 *           format: date-time
 *         fecha_modificacion:
 *           type: string
 *           format: date-time
 *         activo:
 *           type: boolean
 *         eliminado:
 *           type: boolean
 */

/**
 * @swagger
 * /api/roles:
 *   post:
 *     summary: Crear un nuevo rol
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CrearRolDto'
 *     responses:
 *       201:
 *         description: Rol creado correctamente
 */

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Listar roles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: Lista de roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RolResponse'
 */

/**
 * @swagger
 * /api/roles/{id}:
 *   put:
 *     summary: Actualizar un rol
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del rol
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ActualizarRolDto'
 *     responses:
 *       200:
 *         description: Rol actualizado
 *       404:
 *         description: Rol no encontrado
 */

/**
 * @swagger
 * /api/roles/{id}:
 *   delete:
 *     summary: Eliminar un rol
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del rol
 *     responses:
 *       200:
 *         description: Rol eliminado correctamente
 *       404:
 *         description: Rol no encontrado
 */
router.post('/', validateBody(CrearRolDto), controller.crearRol);
router.get('/', controller.listarRoles);
router.put('/:id', validateBody(ActualizarRolDto), controller.actualizarRol);
router.delete('/:id', controller.eliminarRol);

export default router;
