// src/modules/persona/dto/crear.contacto.ts
import { IsString, IsNotEmpty, IsIn, IsOptional, IsInt } from 'class-validator';

export class CrearContactoDto {
  @IsOptional()
  @IsInt()
  id_persona?: number;

  @IsString()
  @IsNotEmpty()
  @IsIn(['correo', 'telefono', 'direccion'], { 
    message: 'tipo_contacto debe ser: correo, telefono o direccion' 
  })
  tipo_contacto!: 'correo' | 'telefono' | 'direccion';

  @IsString()
  @IsNotEmpty({ message: 'El valor del contacto es requerido' })
  valor!: string; // ← Validación básica, formato específico lo valida la entidad
}

export type CrearContactoInput = CrearContactoDto & { id_persona: number };