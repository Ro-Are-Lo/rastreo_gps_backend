//src/modules/persona/dto/crear.persona.ts

import { Expose } from 'class-transformer';
import { IsString, IsOptional, IsIn, IsUrl, Matches } from 'class-validator';

/**
 * DTO para crear una persona
 */
export class CrearPersonaDto {
    
  @Expose()
  @IsString()
  @Matches(/^[A-Za-z]/, {
    message: 'nombre debe comenzar con una letra'
  })
  nombre!: string;

  @Expose()
  @IsOptional()
  @IsString()
  @Matches(/^[A-Za-z]/, {
    message: 'apellido_paterno debe comenzar con una letra'
  })
  apellido_paterno?: string;

  @Expose()
  @IsOptional()
  @IsString()
  @Matches(/^[A-Za-z]/, {
    message: 'apellido_materno debe comenzar con una letra'
  })
  apellido_materno?: string;

  @Expose()
  @IsOptional()
  @IsIn(['M', 'F', 'O', 'm', 'f', 'o'], {
    message: 'genero debe ser M, F u O'
  })
  genero?: string;

  @Expose()
  @IsOptional()
  @IsUrl({}, {
    message: 'foto_url debe ser una URL válida'
  })
  foto_url?: string;
}
