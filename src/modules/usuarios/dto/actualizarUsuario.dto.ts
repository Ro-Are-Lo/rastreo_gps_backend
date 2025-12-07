// src/modules/usuarios/dto/actualizarUsuario.dto.ts
import { IsString, IsBoolean, IsOptional, MinLength, MaxLength } from 'class-validator';

export class ActualizarUsuarioDto {
  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'username debe tener al menos 3 caracteres' })
  @MaxLength(50, { message: 'username no puede tener más de 50 caracteres' })
  username?: string;

  @IsOptional()
  @IsString()
  @MinLength(6, { message: 'password debe tener al menos 6 caracteres' })
  password?: string;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}