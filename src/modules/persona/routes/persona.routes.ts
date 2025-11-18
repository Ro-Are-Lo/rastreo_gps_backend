import { Router } from 'express';
import { PersonaController } from '../controllers/persona.controller';
import { validateBody } from '../../../shared/middlewares/validate.middleware';
import { CrearPersonaDto as CreatePersonaDto } from '../dto/crear.persona';
import { actualizarPersonaDto as UpdatePersonaDto } from '../dto/actualizar.persona';

const router = Router();
const controller = new PersonaController();



/**
 * @swagger
 * tags:
 *   name: Personas
 *   description: Endpoints para gestión de personas
 */

/**
 * @swagger
 * /api/personas:
 *   post:
 *     summary: Crear una nueva persona
 *     tags: [Personas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Ana
 *               apellido_paterno:
 *                 type: string
 *                 example: Gomez
 *               apellido_materno:
 *                 type: string
 *                 example: Lopez
 *               genero:
 *                 type: string
 *                 example: F
 *               foto_url:
 *                 type: string
 *                 nullable: true
 *                 example: null
 *             required:
 *               - nombre
 *               - apellido_paterno
 *               - apellido_materno
 *               - genero
 *     responses:
 *       201:
 *         description: Persona creada exitosamente
 *       400:
 *         description: Error de validación
 */
router.post('/', validateBody(CreatePersonaDto), controller.crear);

/**
 * @swagger
 * /api/personas:
 *   get:
 *     summary: Listar todas las personas
 *     tags: [Personas]
 *     responses:
 *       200:
 *         description: Lista de personas
 */
router.get('/', controller.listar);

/**
 * @swagger
 * /api/personas/{id}:
 *   get:
 *     summary: Obtener persona por ID
 *     tags: [Personas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la persona
 *     responses:
 *       200:
 *         description: Datos de la persona
 *       404:
 *         description: Persona no encontrada
 */
router.get('/:id', controller.obtener);

/**
 * @swagger
 * /api/personas/{id}:
 *   put:
 *     summary: Actualizar una persona
 *     tags: [Personas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la persona
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Carlos
 *               apellido_paterno:
 *                 type: string
 *                 example: Perez
 *               apellido_materno:
 *                 type: string
 *                 example: Lopez
 *               genero:
 *                 type: string
 *                 example: M
 *               foto_url:
 *                 type: string
 *                 nullable: true
 *                 example: https://example.com/foto.jpg
 *               activo:
 *                 type: boolean
 *                 example: true
 *               eliminado:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Persona actualizada correctamente
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Persona no encontrada
 */
router.put('/:id', validateBody(UpdatePersonaDto), controller.actualizar);


/**
 * @swagger
 * /api/personas/{id}:
 *   delete:
 *     summary: Eliminar una persona
 *     tags: [Personas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       204:
 *         description: Persona eliminada exitosamente
 *       404:
 *         description: Persona no encontrada
 */
router.delete('/:id', controller.eliminar);

export default router;
