// src/modules/persona/routes/contacto.routes.ts
import { Router } from 'express';
import { ContactoController } from '../controllers/contacto.controller';
import { validateBody } from '../../../shared/middlewares/validate.middleware';
import { CrearContactoDto } from '../dto/crear.contacto';
import { ActualizarContactoDto } from '../dto/actualizar.contacto';

const router = Router({ mergeParams: true });
const controller = new ContactoController();

/**
 * @swagger
 * tags:
 *   name: Contactos
 *   description: Gestión de contactos asociados a personas
 */

/**
 * @swagger
 * /api/personas/{personaId}/contactos:
 *   post:
 *     summary: Agregar un contacto a una persona
 *     tags: [Contactos]
 *     parameters:
 *       - in: path
 *         name: personaId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tipo_contacto
 *               - valor
 *             properties:
 *               tipo_contacto:
 *                 type: string
 *                 example: "correo"
 *               valor:
 *                 type: string
 *                 example: "correo@dominio.com"
 *     responses:
 *       201:
 *         description: Contacto creado correctamente
 */
router.post('/', validateBody(CrearContactoDto), controller.agregarContacto);

/**
 * @swagger
 * /api/personas/{personaId}/contactos:
 *   get:
 *     summary: Listar todos los contactos de una persona
 *     tags: [Contactos]
 *     parameters:
 *       - in: path
 *         name: personaId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de contactos
 */
router.get('/', controller.listarContactos);

/**
 * @swagger
 * /api/personas/{personaId}/contactos/{contactoId}:
 *   put:
 *     summary: Actualizar un contacto
 *     tags: [Contactos]
 *     parameters:
 *       - in: path
 *         name: personaId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: contactoId
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
 *               tipo_contacto:
 *                 type: string
 *                 example: "telefono"
 *               valor:
 *                 type: string
 *                 example: "987654321"
 *     responses:
 *       200:
 *         description: Contacto actualizado correctamente
 *       404:
 *         description: Contacto no encontrado
 */
router.put('/:contactoId', validateBody(ActualizarContactoDto), controller.actualizarContacto);

/**
 * @swagger
 * /api/personas/{personaId}/contactos/{contactoId}:
 *   delete:
 *     summary: Eliminar un contacto
 *     tags: [Contactos]
 *     parameters:
 *       - in: path
 *         name: personaId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: contactoId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Contacto eliminado correctamente
 *       404:
 *         description: Contacto no encontrado
 */
router.delete('/:contactoId', controller.eliminarContacto);

export default router;
