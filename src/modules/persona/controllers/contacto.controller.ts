// src/modules/persona/controllers/contacto.controller.ts
import { Request, Response, NextFunction } from 'express';
import { ContactoService } from '../services/contacto.service';
import { CrearContactoInput } from '../dto/crear.contacto';
const contactoService = new ContactoService();

export class ContactoController {
  



  
agregarContacto = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const personaId = Number(req.params.personaId);
    
    if (!personaId || isNaN(personaId)) {
      const error: any = new Error('personaId inválido');
      error.statusCode = 400;
      throw error;
    }
    
    const { tipo_contacto, valor } = req.body;
    
    // Crear input con tipo garantizado
    const contactoInput: CrearContactoInput = {
      id_persona: personaId,
      tipo_contacto,
      valor
    };
    
    const contacto = await contactoService.agregarContacto(contactoInput);
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
