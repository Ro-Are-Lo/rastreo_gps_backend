// src/modules/usuarios/dto/borrarUsuarioRol.dto.ts
import { IsNumber } from 'class-validator';

export class BorrarUsuarioRolDto {
  @IsNumber()
  id_usuario!: number;  

  @IsNumber()
  id_rol!: number;      
}