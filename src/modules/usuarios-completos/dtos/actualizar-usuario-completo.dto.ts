import { IsOptional, IsBoolean, IsString, MinLength, IsIn, IsEmail, IsArray } from 'class-validator';

export class ActualizarUsuarioCompletoDto {
  @IsString()
  @MinLength(2)
  @IsOptional()
  nombre?: string;

  @IsString()
  @MinLength(2)
  @IsOptional()
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

  @IsString()
  @MinLength(3)
  @IsOptional()
  username?: string;

  @IsString()
  @MinLength(6)
  @IsOptional()
  password?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  telefono?: string;

  @IsString()
  @IsOptional()
  cedula_identidad?: string;

  @IsString()
  @IsOptional()
  nacionalidad?: string;

  @IsString()
  @IsOptional()
  licencia_numero?: string;

  @IsString()
  @IsOptional()
  licencia_categoria?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  roles?: string[];

  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}