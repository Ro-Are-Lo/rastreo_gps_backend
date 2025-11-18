// src/modules/persona/controllers/documento.controller.ts
import { Request, Response, NextFunction } from 'express';
import { DocumentoService } from '../services/documento.service';

const documentoService = new DocumentoService();

export class DocumentoController {

  agregarDocumento = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id_persona = Number(req.params.id);
      const { tipo_documento, nro_documento } = req.body;

      const doc = await documentoService.agregarDocumento({
        id_persona,
        tipo_documento,
        nro_documento,
      });

      res.status(201).json(doc);
    } catch (err) {
      next(err);
    }
  };

  listarDocumentos = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id_persona = Number(req.params.id);
      const docs = await documentoService.listarDocumentos(id_persona);
      res.json(docs);
    } catch (err) {
      next(err);
    }
  };

  actualizarDocumento = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const { tipo_documento, nro_documento } = req.body;

      const doc = await documentoService.actualizarDocumento(id, {
        tipo_documento,
        nro_documento,
      });

      res.json(doc);
    } catch (err) {
      next(err);
    }
  };

  eliminarDocumento = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const result = await documentoService.eliminarDocumento(id);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };
}
