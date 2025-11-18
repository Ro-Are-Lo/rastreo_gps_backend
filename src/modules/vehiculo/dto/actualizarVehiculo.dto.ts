//src/modules/vehiculo/dto/actualizarVehiculo.dto.ts
import { IsString, IsOptional, IsInt, IsBoolean } from 'class-validator';

export class ActualizarVehiculoDto {
  @IsString()
  @IsOptional()
  modelo?: string;

  @IsInt()
  @IsOptional()
  anio?: number;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
