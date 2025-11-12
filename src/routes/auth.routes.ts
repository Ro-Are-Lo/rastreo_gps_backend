import { Router } from 'express';
import { login } from '../controllers/auth.controller';

/**
 * @swagger
 * tags:
 *   name: Autenticación
 *   description: Endpoints para el inicio de sesión y manejo de tokens JWT
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Inicia sesión y devuelve un token JWT
 *     description: Autentica un usuario existente y retorna un token JWT válido para acceder a las rutas protegidas.
 *     tags: [Autenticación]
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
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso, token generado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login exitoso
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Faltan credenciales o formato incorrecto.
 *       401:
 *         description: Credenciales inválidas.
 *       500:
 *         description: Error interno del servidor.
 */

const router = Router();

router.post('/login', login);

export default router;
