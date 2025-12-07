// src/modules/persona/entities/documento.entity.ts
export class DocumentoEntity {
  id?: number; // ✅ Cambiar a opcional
  id_persona: number;
  tipo_documento: string;
  nro_documento: string;
  fecha_creacion: Date;
  fecha_modificacion?: Date | null;
  activo: boolean;
  eliminado: boolean;

  constructor(data: {
    id?: number;
    id_persona: number;
    tipo_documento: string;
    nro_documento: string;
    fecha_creacion?: Date;
    fecha_modificacion?: Date | null;
    activo?: boolean;
    eliminado?: boolean;
  }) {
    this.id = data.id;
    this.id_persona = data.id_persona;
    this.tipo_documento = data.tipo_documento;
    this.nro_documento = data.nro_documento;
    this.fecha_creacion = data.fecha_creacion ?? new Date();
    this.fecha_modificacion = data.fecha_modificacion ?? null;
    this.activo = data.activo ?? true;
    this.eliminado = data.eliminado ?? false;
  }

  // ✅ MÉTODO: Validar según tipo de documento
  validarFormato(): boolean {
    if (this.tipo_documento === 'CI') {
      return /^[0-9]{7,10}$/.test(this.nro_documento);
    }
    if (this.tipo_documento === 'LICENCIA') {
      return /^[A-Z0-9]{6,12}$/.test(this.nro_documento);
    }
    return true; // otros documentos
  }

  toPrisma(): any {
    return {
      id_persona: this.id_persona,
      tipo_documento: this.tipo_documento,
      nro_documento: this.nro_documento,
      fecha_creacion: this.fecha_creacion,
      fecha_modificacion: this.fecha_modificacion,
      activo: this.activo,
      eliminado: this.eliminado
    };
  }
}