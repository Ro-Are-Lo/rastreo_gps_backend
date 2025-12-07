// src/modules/usuarios-completos/dtos/crear-usuario-completo.dto.ts
import { IsString, IsOptional, IsIn, MinLength, IsEmail, IsArray } from 'class-validator';

export class CrearUsuarioCompletoDto {
  // Campos para Persona
  @IsString()
  @MinLength(2)
  nombre?: string;

  @IsString()
  @MinLength(2)
  apellido_paterno?: string;

  @IsString()
  @IsOptional()
  apellido_materno?: string;

  @IsString()
  @IsIn(['M', 'F', 'O'])
  @IsOptional()
  genero?: string;

  @IsString()
  @IsOptional()
  foto_url?: string;

  // Campos para Usuario
  @IsString()
  @MinLength(3)
  username?: string;

  @IsString()
  @MinLength(6)
  password?: string;

  // Campos para Contacto
  @IsEmail()
  @IsOptional()
  email?: string;          // → Contacto tipo "EMAIL"

  @IsString()
  @IsOptional()
  telefono?: string;       // → Contacto tipo "TELEFONO"

  @IsString()
  @IsOptional()
  nacionalidad?: string;   // → Contacto tipo "NACIONALIDAD"

  // Campos para Documento
  @IsString()
  @IsOptional()
  cedula_identidad?: string;  // → Documento tipo "CEDULA"

  @IsString()
  @IsOptional()
  licencia_numero?: string;   // → Documento tipo "LICENCIA"

  @IsString()
  @IsOptional()
  licencia_categoria?: string; // → Podría ir en Documento como campo extra

  // Roles
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  roles?: string[] = ['CONDUCTOR'];
}