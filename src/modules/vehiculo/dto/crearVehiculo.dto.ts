//src/modules/vehiculo/dto/crearVehiculo.dto.ts
import { IsString, IsOptional, IsInt } from 'class-validator';

export class CrearVehiculoDto {
  @IsString()
  placa: string;

  @IsString()
  @IsOptional()
  modelo?: string;

  @IsInt()
  @IsOptional()
  anio?: number;
}
