// src/modules/persona/entities/documento.entity.ts
export interface DocumentoEntity {
  id: number;
  id_persona: number;
  tipo_documento: string;
  nro_documento: string;
  fecha_creacion: Date;
  fecha_modificacion?: Date | null;
  activo: boolean;
  eliminado: boolean;
}

