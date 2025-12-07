// src/modules/vehiculo/dto/crearUbicacion.dto.ts (AJUSTADO)
import { IsInt, IsNumber, IsOptional, IsDateString, Min, Max } from 'class-validator';

export class CrearUbicacionDto {
  @IsInt()
  id_vehiculo!: number;

  @IsNumber()
  @Min(-90)
  @Max(90)
  latitud!: number;

  @IsNumber()
  @Min(-180)
  @Max(180)
  longitud!: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  velocidad_kmh?: number;

  @IsDateString()
  @IsOptional()
  fecha_hora?: string;
}