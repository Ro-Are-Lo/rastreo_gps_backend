// src/modules/usuarios/dto/crearRol.dto.ts
import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CrearRolDto {
  @IsString()
  @IsNotEmpty({ message: 'nombre es requerido' })
  @MinLength(2, { message: 'nombre debe tener al menos 2 caracteres' })
  @MaxLength(50, { message: 'nombre no puede tener más de 50 caracteres' })
  nombre!: string;
}