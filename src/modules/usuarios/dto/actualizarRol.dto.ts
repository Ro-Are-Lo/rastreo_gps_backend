//src/modules/usuarios/dto/actualizarRol.dto.ts
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class ActualizarRolDto {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
