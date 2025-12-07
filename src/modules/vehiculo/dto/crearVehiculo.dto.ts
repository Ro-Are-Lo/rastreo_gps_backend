// src/modules/vehiculo/dto/crearVehiculo.dto.ts (AJUSTADO)
import { IsString, IsOptional, IsInt, Min, Max, Matches } from 'class-validator';

export class CrearVehiculoDto {
  @IsString()
  @Matches(/^[A-Z]{2,3}-?\d{3,4}$/i, {
    message: 'Formato de placa inválido. Use: ABC-123 o AB-1234'
  })
  placa!: string;

  @IsString()
  @IsOptional()
  modelo?: string;

  @IsInt()
  @Min(1900)
  @Max(new Date().getFullYear() + 1)
  @IsOptional()
  anio?: number;
}