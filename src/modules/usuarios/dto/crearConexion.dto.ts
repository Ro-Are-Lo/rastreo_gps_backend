// src/modules/usuarios/dto/crearConexion.dto.ts (CORREGIDO)
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CrearConexionDto {
  @IsInt()
  id_usuario!: number;
  
  @IsInt()
  id_vehiculo!: number;
  
  @IsString()
  @IsOptional()
  ip?: string | null; // ✅ Añadir | null
  
  @IsString()
  @IsOptional()
  sesion_dispositivo?: string | null; // ✅ Añadir | null
}