//src/modules/usuarios/dto/crearRol.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';

export class CrearRolDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;
}
