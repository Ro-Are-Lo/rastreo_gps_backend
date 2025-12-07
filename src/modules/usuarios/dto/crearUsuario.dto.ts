import { IsInt, IsString, IsNotEmpty, MinLength, MaxLength, Min } from 'class-validator';

export class CrearUsuarioDto {
  @IsInt()
  @Min(1, { message: 'id_persona debe ser mayor a 0' })
  id_persona!: number;

  @IsString()
  @IsNotEmpty({ message: 'username es requerido' })
  @MinLength(3, { message: 'username debe tener al menos 3 caracteres' })
  @MaxLength(50, { message: 'username no puede tener más de 50 caracteres' })
  username!: string;

  @IsString()
  @IsNotEmpty({ message: 'password es requerido' })
  @MinLength(6, { message: 'password debe tener al menos 6 caracteres' })
  password!: string;
}