import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export function validateBody(dtoClass: any) {
  return async (req: any, res: any, next: any) => {

    // Transformar y solo permitir campos con @Expose()
    const dto = plainToInstance(dtoClass, req.body, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true
    });

    const errors = await validate(dto, {
      whitelist: true,        //  elimina propiedades no definidas
      forbidNonWhitelisted: true, //  si envían algo raro → error inmediato
      skipMissingProperties: false
    });

    if (errors.length > 0) {
      return res.status(400).json({
        message: "Error de validación",
        errors
      });
    }

    req.body = dto;
    next();
  };
}
