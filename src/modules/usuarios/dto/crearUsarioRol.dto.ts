// src/modules/usuarios/dto/crearUsuarioRol.dto.ts
import { IsNumber } from 'class-validator';

export class CrearUsuarioRolDto {
  @IsNumber()
  id_usuario!: number;  

  @IsNumber()
  id_rol!: number;      
}