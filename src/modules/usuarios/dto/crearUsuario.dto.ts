
//src/modules/usuarios/dto/crearUsuario.dto.ts
import { IsInt, IsString, IsNotEmpty } from 'class-validator';

export class CrearUsuarioDto {
  @IsInt()
  id_persona: number;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
