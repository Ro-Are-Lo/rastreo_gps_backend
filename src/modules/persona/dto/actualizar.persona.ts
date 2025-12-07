import { Expose } from 'class-transformer';
import { IsString, IsOptional, IsIn, IsUrl, Matches } from 'class-validator';

// ✅ Considerar cambiar nombre a PascalCase: ActualizarPersonaDto
export class actualizarPersonaDto {  // ❌ Considerar cambiar a: ActualizarPersonaDto
  @Expose()
  @IsOptional()
  @IsString()
  @Matches(/^[A-Za-z]/, { 
    message: 'nombre debe comenzar con una letra' 
  })
  nombre?: string;  // ✅ Ya tiene ? (correcto)

  @Expose()
  @IsOptional()
  @IsString()
  @Matches(/^[A-Za-z]/, { 
    message: 'apellido_paterno debe comenzar con una letra' 
  })
  apellido_paterno?: string;  // ✅ Ya tiene ? (correcto)

  @Expose()
  @IsOptional()
  @IsString()
  @Matches(/^[A-Za-z]/, { 
    message: 'apellido_materno debe comenzar con una letra' 
  })
  apellido_materno?: string;  // ✅ Ya tiene ? (correcto)

  @Expose()
  @IsOptional()
  @IsIn(['M', 'F', 'O', 'm', 'f', 'o'])
  genero?: string;  // ✅ Ya tiene ? (correcto)

  @Expose()
  @IsOptional()
  @IsUrl({}, { 
    message: 'foto_url debe ser una URL válida' 
  })
  foto_url?: string;  // ✅ Ya tiene ? (correcto)
}