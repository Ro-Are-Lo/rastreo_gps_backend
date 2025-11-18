  //src/modules/persona/dto/crear.documento.ts

  import { IsInt, IsString, IsNotEmpty, IsIn, Matches } from 'class-validator';

  export class CrearDocumentoDto {
    @IsInt()
    id_persona: number;

    @IsString()
    @IsNotEmpty()
    @IsIn(['CI', 'LICENCIA', 'PASAPORTE'], {
      message: 'tipo_documento debe ser CI, LICENCIA o PASAPORTE',
    })
    tipo_documento: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^[0-9]+$/, { message: 'nro_documento debe contener solo números' })
    nro_documento: string;
  }
