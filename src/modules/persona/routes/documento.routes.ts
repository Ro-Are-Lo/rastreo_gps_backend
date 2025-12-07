// src/modules/persona/routes/documento.routes.ts
import { Router } from 'express';
import { DocumentoController } from '../controllers/documento.controller';
import { validateBody } from '../../../shared/middlewares/validate.middleware';
import { CrearDocumentoDto } from '../dto/crear.documento';
import { ActualizarDocumentoDto } from '../dto/actualizar.documento';

const router = Router({ mergeParams: true });
const controller = new DocumentoController();
/**
 * @swagger
 * tags:
 *   name: Documentos
 *   description: Documentos asociados a una persona
 */
/**
 * @swagger
 * /api/personas/{personaId}/documentos:
 *   post:
 *     summary: Agregar documento a una persona
 *     tags: [Documentos]
 *     parameters:
 *       - in: path
 *         name: personaId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la persona
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tipo_documento
 *               - nro_documento
 *             properties:
 *               tipo_documento:
 *                 type: string
 *                 example: "CI"
 *               nro_documento:
 *                 type: string
 *                 example: "12345678"
 *     responses:
 *       201:
 *         description: Documento creado correctamente
 *       400:
 *         description: Datos inválidos
 */

router.post(
  '/',
  validateBody(CrearDocumentoDto),
  controller.agregarDocumento
);

/**
 * @swagger
 * /api/personas/{personaId}/documentos:
 *   get:
 *     summary: Listar documentos de una persona
 *     tags: [Documentos]
 *     parameters:
 *       - in: path
 *         name: personaId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de documentos
 */
router.get('/', controller.listarDocumentos);
/**
 * @swagger
 * /api/personas/{personaId}/documentos/{id}:
 *   put:
 *     summary: Actualizar un documento
 *     tags: [Documentos]
 *     parameters:
 *       - in: path
 *         name: personaId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: id
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
 *               tipo_documento:
 *                 type: string
 *                 example: "PASAPORTE"
 *               nro_documento:
 *                 type: string
 *                 example: "XP998833"
 *     responses:
 *       200:
 *         description: Documento actualizado correctamente
 *       404:
 *         description: Documento no encontrado
 */

router.put(
  '/:id',
  validateBody(ActualizarDocumentoDto),
  controller.actualizarDocumento
);

/**
 * @swagger
 * /api/personas/{personaId}/documentos/{id}:
 *   delete:
 *     summary: Eliminar un documento
 *     tags: [Documentos]
 *     parameters:
 *       - in: path
 *         name: personaId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Documento eliminado correctamente
 *       404:
 *         description: Documento no encontrado
 */
router.delete('/:id', controller.eliminarDocumento);
export default router;