/**
 * @swagger
 * tags:
 *   name: Usuario-Rol
 *   description: Gestión de asignaciones de roles a usuarios
 */

/**
 * @swagger
 * /usuario-rol/{usuario_id}:
 *   get:
 *     summary: Lista los roles asignados a un usuario
 *     tags: [Usuario-Rol]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: usuario_id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de roles obtenida correctamente
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Usuario no encontrado
 *
 * /usuario-rol:
 *   post:
 *     summary: Asigna un rol a un usuario
 *     tags: [Usuario-Rol]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario_id:
 *                 type: string
 *                 example: "user123"
 *               rol_id:
 *                 type: string
 *                 example: "admin"
 *     responses:
 *       201:
 *         description: Rol asignado correctamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *
 *   delete:
 *     summary: Quita un rol asignado a un usuario
 *     tags: [Usuario-Rol]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario_id:
 *                 type: string
 *                 example: "user123"
 *               rol_id:
 *                 type: string
 *                 example: "operador"
 *     responses:
 *       200:
 *         description: Rol eliminado del usuario correctamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 */



import { Router } from 'express';
import * as usuarioRolController from '../controllers/usuarioRol.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { checkRole } from '../middlewares/role.middleware';

const router = Router();

// Solo admin puede asignar o quitar roles
router.get('/:usuario_id', authMiddleware, checkRole(['admin']), usuarioRolController.listarRolesDeUsuario);
router.post('/', authMiddleware, checkRole(['admin']), usuarioRolController.asignarRolAUsuario);
router.delete('/', authMiddleware, checkRole(['admin']), usuarioRolController.quitarRolDeUsuario);

export default router;
