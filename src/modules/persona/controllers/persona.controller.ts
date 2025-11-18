// src/modules/persona/controller/persona.controller.ts
import { Request, Response, NextFunction } from 'express';
import { PersonaService } from '../services/persona.service';

const service = new PersonaService();

export class PersonaController {
  crear = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const persona = await service.crearPersona(req.body);
      res.status(201).json(persona);
    } catch (err) {
      next(err);
    }
  };

  listar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const pagina = parseInt(String(req.query.page || '1'), 10);
      const perPage = parseInt(String(req.query.perPage || '20'), 10);
      const result = await service.listarPersonas(pagina, perPage);
      res.json(result);
    } catch (err) {
      next(err);
    }
  };

  obtener = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const persona = await service.obtenerPersona(id);
      res.json(persona);
    } catch (err) {
      next(err);
    }
  };

  actualizar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const updated = await service.actualizarPersona(id, req.body);
      res.json(updated);
    } catch (err) {
      next(err);
    }
  };

  eliminar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      await service.eliminarPersona(id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };
}