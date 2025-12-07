// src/shared/middlewares/validate.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export const validateBody = (dtoClass: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoInstance = plainToInstance(dtoClass, req.body);
    
    const errors = await validate(dtoInstance);
    
    if (errors.length > 0) {
      return res.status(400).json({
        message: 'Error de validación',
        errors: errors.map(error => ({
          property: error.property,
          value: error.value,
          constraints: error.constraints
        }))
      });
    }
    
    req.body = dtoInstance; // Reemplazar con la instancia validada
    next();
  };
};