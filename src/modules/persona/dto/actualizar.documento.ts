import { IsString, IsOptional, IsIn, Matches } from 'class-validator';

// ✅ Cambiar nombre de clase a PascalCase (convención TypeScript)
export class ActualizarDocumentoDto {
  @IsOptional()
  @IsString()
  @IsIn(['CI', 'LICENCIA', 'PASAPORTE'], { 
    message: 'tipo_documento debe ser CI, LICENCIA o PASAPORTE' 
  })
  tipo_documento?: string;  // ✅ Ya tiene ? (correcto)

  @IsOptional()
  @IsString()
  @Matches(/^[0-9]+$/, { 
    message: 'nro_documento debe contener solo números' 
  })
  nro_documento?: string;  // ✅ Ya tiene ? (correcto)
}