// src/modules/usuarios-completos/interfaces/usuario-completo.interface.ts
export interface UsuarioCompleto {
  id: number;
  persona: {
    id: number;
    nombre: string;
    apellido_paterno?: string | null;
    apellido_materno?: string | null;
    genero?: string | null;
    foto_url?: string | null;
    fecha_creacion: Date;
    fecha_modificacion?: Date | null;
    activo: boolean;
    eliminado: boolean;
  };
  usuario: {
    id: number;
    username: string;
    fecha_creacion: Date;
    fecha_modificacion?: Date | null;
    activo: boolean;
    eliminado: boolean;
  };
  documentos: Array<{
    id: number;
    tipo_documento: string;
    nro_documento: string;
  }>;
  contactos: Array<{
    id: number;
    tipo: string;
    valor: string;
  }>;
  roles: Array<{
    id: number;
    nombre: string;
  }>;
  // AGREGAR ESTO:
  datosExtras?: {
    email?: string;
    telefono?: string;
    nacionalidad?: string;
    cedula_identidad?: string;
    licencia_numero?: string;
  };
}