

import { Router } from 'express';


import { UsuarioController } from '../controllers/usuario.controller';

import { validateBody } from '../../../shared/middlewares/validate.middleware'; // ¡IMPORTANTE!
import { CrearUsuarioDto } from '../dto/crearUsuario.dto'; // ¡IMPORTANTE!
import { ActualizarUsuarioDto } from '../dto/actualizarUsuario.dto'; // ¡IMPORTANTE!

const router = Router();
const controller = new UsuarioController();

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Gestión de usuarios
 */


/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_persona
 *               - username
 *               - password
 *             properties:
 *               id_persona:
 *                 type: integer
 *                 example: 1
 *               username:
 *                 type: string
 *                 example: jdoe
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 *       400:
 *         description: Error de validación
 */
router.post('/', validateBody(CrearUsuarioDto), controller.crearUsuario);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Datos del usuario
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/:id', controller.obtenerUsuario);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   put:
 *     summary: Actualizar un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: nuevoUser
 *               password:
 *                 type: string
 *                 example: newPassword
 *               activo:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Usuario no encontrado
 */
router.put('/:id', validateBody(ActualizarUsuarioDto), controller.actualizarUsuario);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Eliminar un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *       404:
 *         description: Usuario no encontrado
 */
router.delete('/:id', controller.eliminarUsuario);



router.get('/', controller.listarUsuarios);
export default router;
