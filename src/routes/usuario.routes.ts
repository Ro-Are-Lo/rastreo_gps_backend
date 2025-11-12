
/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Gestión de usuarios del sistema
 */

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Lista todos los usuarios
 *     tags: [Usuarios]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente
 *       401:
 *         description: Token inválido o faltante
 */

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     tags: [Usuarios]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado correctamente
 *       404:
 *         description: Usuario no encontrado
 */
/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Usuarios]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: admin1
 *               password:
 *                 type: string
 *                 example: 123456
 *               nombre:
 *                 type: string
 *                 example: Carlos
 *               apellido_paterno:
 *                 type: string
 *                 example: Gómez
 *               apellido_materno:
 *                 type: string
 *                 example: López
 *               cedula_identidad:
 *                 type: string
 *                 example: 12345678
 *               nacionalidad:
 *                 type: string
 *                 example: Boliviana
 *               genero:
 *                 type: string
 *                 example: M
 *               licencia_numero:
 *                 type: string
 *                 example: 123456
 *               licencia_categoria:
 *                 type: string
 *                 example: A
 *               foto_url:
 *                 type: string
 *                 example: https://ejemplo.com/foto.jpg
 *               roles:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     rol_id:
 *                       type: integer
 *                       example: 1
 *               correos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     correo:
 *                       type: string
 *                       example: ejemplo@correo.com
 *               telefonos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     telefono:
 *                       type: string
 *                       example: 1234567890
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 *       400:
 *         description: Datos inválidos
 */

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Actualiza un usuario existente
 *     tags: [Usuarios]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               nombre:
 *                 type: string
 *               apellido_paterno:
 *                 type: string
 *               apellido_materno:
 *                 type: string
 *               cedula_identidad:
 *                 type: string
 *                 example: 12345678
 *               nacionalidad:
 *                 type: string
 *                 example: Boliviana
 *               genero:
 *                 type: string
 *                 example: M
 *               licencia_numero:
 *                 type: string
 *                 example: 123456
 *               licencia_categoria:
 *                 type: string
 *                 example: A
 *               foto_url:
 *                 type: string
 *                 example: https://ejemplo.com/foto.jpg
 *               roles:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     rol_id:
 *                       type: integer
 *                       example: 1
 *               correos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     correo:
 *                       type: string
 *                       example: ejemplo@correo.com
 *               telefonos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     telefono:
 *                       type: string
 *                       example: 1234567890
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *       404:
 *         description: Usuario no encontrado
 */


/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Elimina un usuario por ID
 *     tags: [Usuarios]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *       404:
 *         description: Usuario no encontrado
 */

/**
 * @swagger
 * /usuarios/me/list:
 *   get:
 *     summary: Devuelve la información de los usuarios autenticados sin que seas admin solo para pruebas
 *     tags: [Usuarios]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Información del usuario autenticado
 */
import { Router } from 'express';
import {
  listarUsuarios,
  obtenerUsuario,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  getUsuarios
} from '../controllers/usuario.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { checkRole } from '../middlewares/role.middleware';

const router = Router();

router.get('/', authMiddleware, checkRole(['admin']), listarUsuarios);
router.get('/:id', authMiddleware, checkRole(['admin']), obtenerUsuario);
router.post('/', authMiddleware, checkRole(['admin']), crearUsuario);
router.put('/:id', authMiddleware, checkRole(['admin']), actualizarUsuario);
router.delete('/:id', authMiddleware, checkRole(['admin']), eliminarUsuario);

// Ruta auxiliar para pruebas (necesita solo auth)
router.get('/me/list', authMiddleware, getUsuarios);

export default router;
