// src/modules/persona/dto/actualizarDocumento.ts

import { IsString, IsOptional,IsIn, Matches } from 'class-validator';

export class actualizarDocumentoDto {
  @IsOptional()
  @IsString()
  @IsIn(['CI', 'LICENCIA', 'PASAPORTE'], { message: 'tipo_documento debe ser CI, LICENCIA o PASAPORTE' })
  tipo_documento?: string;

  @IsOptional()
  @IsString()
  @Matches(/^[0-9]+$/, { message: 'nro_documento debe contener solo números' })
  nro_documento?: string;
}
