// src/modules/usuarios/dto/actualizarRol.dto.ts
import { IsString, IsBoolean, IsOptional, MinLength, MaxLength } from 'class-validator';

export class ActualizarRolDto {
  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'nombre debe tener al menos 2 caracteres' })
  @MaxLength(50, { message: 'nombre no puede tener más de 50 caracteres' })
  nombre?: string;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}