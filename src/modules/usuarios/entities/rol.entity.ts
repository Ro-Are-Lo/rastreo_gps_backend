//src/modules/usuarios/entities/rol.entity.ts
export interface RolEntity {
  id: number;
  nombre: string;
  fecha_creacion: Date;
  fecha_modificacion?: Date | null;
  activo: boolean;
  eliminado: boolean;
}
