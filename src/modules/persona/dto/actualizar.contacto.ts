// src/modules/persona/dto/actualizarContacto.ts

import { IsOptional, IsString, IsIn, IsEmail, Matches } from 'class-validator';

export class ActualizarContactoDto {
  @IsOptional()
  @IsIn(['correo', 'telefono', 'direccion'], { message: 'tipo_contacto debe ser correo, telefono o direccion' })
  tipo_contacto?: 'correo' | 'telefono' | 'direccion';

  @IsOptional()
  @IsString()
  valor?: string;
}
