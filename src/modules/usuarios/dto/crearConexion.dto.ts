
//src/modules/usuarios/dto/crearConexion.dto.ts
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CrearConexionDto {
  @IsInt()
  id_usuario: number;

  @IsInt()
  id_vehiculo: number;

  @IsString()
  @IsOptional()
  ip?: string;

  @IsString()
  @IsOptional()
  sesion_dispositivo?: string;
}
