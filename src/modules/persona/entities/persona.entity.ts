// src/modules/persona/entities/persona.entity.ts
export interface PersonaEntity {
  nombre: string;
  apellido_paterno?: string | null;
  apellido_materno?: string | null;
  genero?: string | null;
  foto_url?: string | null;
  fecha_creacion: Date;
  fecha_modificacion?: Date | null;
  activo: boolean;
  eliminado: boolean;
}
