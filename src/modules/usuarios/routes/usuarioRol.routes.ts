//src/modules/usuarios/routes/usuarioRol.routes.ts
import { Router } from 'express';
import { UsuarioRolController } from '../controllers/usuarioRol.controller';

const router = Router();
const controller = new UsuarioRolController();


/**
 * @swagger
 * tags:
 *   name: UsuarioRoles
 *   description: Asignación de roles a usuarios
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CrearUsuarioRolDto:
 *       type: object
 *       required:
 *         - id_usuario
 *         - id_rol
 *       properties:
 *         id_usuario:
 *           type: integer
 *           example: 1
 *         id_rol:
 *           type: integer
 *           example: 2
 *
 *     BorrarUsuarioRolDto:
 *       type: object
 *       required:
 *         - id_usuario
 *         - id_rol
 *       properties:
 *         id_usuario:
 *           type: integer
 *           example: 1
 *         id_rol:
 *           type: integer
 *           example: 2
 *
 *     UsuarioRolResponse:
 *       type: object
 *       properties:
 *         id_usuario:
 *           type: integer
 *           example: 1
 *         id_rol:
 *           type: integer
 *           example: 2
 */

/**
 * @swagger
 * /api/usuario-roles:
 *   post:
 *     summary: Asignar un rol a un usuario
 *     tags: [UsuarioRoles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CrearUsuarioRolDto'
 *     responses:
 *       201:
 *         description: Rol asignado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsuarioRolResponse'
 *       400:
 *         description: El usuario ya tiene asignado ese rol
 */

/**
 * @swagger
 * /api/usuario-roles:
 *   delete:
 *     summary: Remover un rol de un usuario
 *     tags: [UsuarioRoles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BorrarUsuarioRolDto'
 *     responses:
 *       200:
 *         description: Rol removido correctamente
 *       404:
 *         description: El usuario no tiene asignado ese rol
 */

/**
 * @swagger
 * /api/usuario-roles/{id_usuario}:
 *   get:
 *     summary: Listar roles asignados a un usuario
 *     tags: [UsuarioRoles]
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de roles asignados al usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UsuarioRolResponse'
 */

router.post('/', controller.asignarRol);
router.delete('/', controller.removerRol);
router.get('/:id_usuario', controller.listarRolesUsuario);

export default router;
