//src/modules/vehiculo/dto/crearUbicacion.dto.ts
import { IsInt, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CrearUbicacionDto {
  @IsInt()
  id_vehiculo: number;

  @IsNumber()
  latitud: number;

  @IsNumber()
  longitud: number;

  @IsNumber()
  @IsOptional()
  velocidad_kmh?: number;

  @IsDateString()
  @IsOptional()
  fecha_hora?: string;
}
