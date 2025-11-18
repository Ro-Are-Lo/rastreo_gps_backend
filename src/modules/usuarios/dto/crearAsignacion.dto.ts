//src/modules/usuarios/dto/crearAsignacion.dto.ts
import { IsInt, IsOptional, IsDateString } from 'class-validator';

export class CrearAsignacionDto {
  @IsInt()
  id_usuario: number;

  @IsInt()
  id_vehiculo: number;

  @IsDateString()
  @IsOptional()
  fecha_inicio?: string;

  @IsDateString()
  @IsOptional()
  fecha_fin?: string;
}
