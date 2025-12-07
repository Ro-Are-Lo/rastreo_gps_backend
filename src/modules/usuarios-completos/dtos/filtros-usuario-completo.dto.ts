// src/modules/usuarios-completos/dtos/filtros-usuario-completo.dto.ts
import { IsOptional, IsString, IsNumber, Min, IsBoolean } from 'class-validator';

export class FiltrosUsuarioCompletoDto {
  @IsString()
  @IsOptional()
  search?: string;

  @IsString()
  @IsOptional()
  rol?: string;

  @IsBoolean()
  @IsOptional()
  activo?: boolean = true;

  @IsNumber()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @IsNumber()
  @Min(1)
  @IsOptional()
  limit?: number = 10;
}