// src/modules/persona/dto/crear.contacto.ts
import { IsInt, IsString, IsNotEmpty, IsIn, IsEmail, Matches } from 'class-validator';

export class CrearContactoDto {
  @IsInt()
  id_persona: number;

  @IsString()
  @IsIn(['correo', 'telefono', 'direccion'], { message: 'tipo_contacto debe ser correo, telefono o direccion' })
  tipo_contacto: 'correo' | 'telefono' | 'direccion';

  @IsString()
  @IsNotEmpty()
  valor: string;
}
