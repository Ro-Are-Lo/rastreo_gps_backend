//src/modules/usuarios/dto/actualizarAsignacion.dto.ts
import { IsOptional, IsDateString, IsBoolean } from 'class-validator';

export class ActualizarAsignacionDto {
  @IsDateString()
  @IsOptional()
  fecha_inicio?: string;

  @IsDateString()
  @IsOptional()
  fecha_fin?: string;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
