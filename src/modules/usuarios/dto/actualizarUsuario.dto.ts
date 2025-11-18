//src/modules/usuarios/dto/actualizarRol.dto.ts
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class ActualizarUsuarioDto {
  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
