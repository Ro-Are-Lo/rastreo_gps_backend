/**
 * @swagger
 * tags:
 *   - name: Roles
 *     description: Endpoints para la gestión de roles de usuario.
 */

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Listar todos los roles
 *     description: Devuelve una lista con todos los roles registrados en el sistema.
 *     tags: [Roles]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de roles obtenida correctamente.
 *       401:
 *         description: Token no proporcionado o inválido.
 *       403:
 *         description: Acceso denegado, rol no autorizado.
 */

/**
 * @swagger
 * /api/roles/{id}:
 *   get:
 *     summary: Obtener un rol por ID
 *     description: Devuelve la información de un rol específico mediante su ID.
 *     tags: [Roles]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del rol
 *     responses:
 *       200:
 *         description: Rol obtenido correctamente.
 *       404:
 *         description: Rol no encontrado.
 *       401:
 *         description: Token no válido o no proporcionado.
 */

/**
 * @swagger
 * /api/roles:
 *   post:
 *     summary: Crear un nuevo rol
 *     description: Crea un nuevo rol en el sistema (solo accesible para administradores).
 *     tags: [Roles]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "operador"
 *     responses:
 *       201:
 *         description: Rol creado correctamente.
 *       400:
 *         description: Datos inválidos o faltantes.
 *       401:
 *         description: Token no válido o no proporcionado.
 *       403:
 *         description: Acceso denegado, rol no autorizado.
 */

/**
 * @swagger
 * /api/roles/{id}:
 *   put:
 *     summary: Actualizar un rol existente
 *     description: Modifica los datos de un rol específico.
 *     tags: [Roles]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del rol a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "conductor"
 *     responses:
 *       200:
 *         description: Rol actualizado correctamente.
 *       400:
 *         description: Datos inválidos.
 *       404:
 *         description: Rol no encontrado.
 *       401:
 *         description: Token no válido o no proporcionado.
 */

/**
 * @swagger
 * /api/roles/{id}:
 *   delete:
 *     summary: Eliminar un rol
 *     description: Elimina un rol del sistema por su ID (solo accesible para administradores).
 *     tags: [Roles]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del rol a eliminar
 *     responses:
 *       200:
 *         description: Rol eliminado correctamente.
 *       404:
 *         description: Rol no encontrado.
 *       401:
 *         description: Token no válido o no proporcionado.
 *       403:
 *         description: Acceso denegado, rol no autorizado.
 */

import { Router } from 'express';
import * as rolController from '../controllers/rol.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { checkRole } from '../middlewares/role.middleware';

const router = Router();

// CRUD de Roles protegido (solo admin)
router.get('/', authMiddleware, checkRole(['admin']), rolController.listarRoles);
router.get('/:id', authMiddleware, checkRole(['admin']), rolController.obtenerRol);
router.post('/', authMiddleware, checkRole(['admin']), rolController.crearRol);
router.put('/:id', authMiddleware, checkRole(['admin']), rolController.actualizarRol);
router.delete('/:id', authMiddleware, checkRole(['admin']), rolController.eliminarRol);

export default router;
   
