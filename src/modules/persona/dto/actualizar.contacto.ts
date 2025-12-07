import { IsOptional, IsString, IsIn } from 'class-validator';

export class ActualizarContactoDto {
  @IsOptional()
  @IsIn(['correo', 'telefono', 'direccion'], { 
    message: 'tipo_contacto debe ser correo, telefono o direccion' 
  })
  tipo_contacto?: 'correo' | 'telefono' | 'direccion';  // ✅ Ya tiene ? (correcto)

  @IsOptional()
  @IsString()
  valor?: string;  // ✅ Ya tiene ? (correcto)
}