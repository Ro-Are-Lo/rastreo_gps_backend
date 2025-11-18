// src/modules/persona/controllers/contacto.controller.ts
import { Request, Response, NextFunction } from 'express';
import { ContactoService } from '../services/contacto.service';

const contactoService = new ContactoService();

export class ContactoController {
  
  agregarContacto = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id_persona = Number(req.params.id);
      const { tipo_contacto, valor } = req.body;
      const contacto = await contactoService.agregarContacto({ id_persona, tipo_contacto, valor });
      res.status(201).json(contacto);
    } catch (err) {
      next(err);
    }
  };

  listarContactos = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id_persona = Number(req.params.id);
      const contactos = await contactoService.listarContactos(id_persona);
      res.json(contactos);
    } catch (err) {
      next(err);
    }
  };

  actualizarContacto = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.contactoId);
      const { tipo_contacto, valor } = req.body;
      const updated = await contactoService.actualizarContacto(id, { tipo_contacto, valor });
      res.json(updated);
    } catch (err) {
      next(err);
    }
  };

  eliminarContacto = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.contactoId);
      const result = await contactoService.eliminarContacto(id);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };
}
