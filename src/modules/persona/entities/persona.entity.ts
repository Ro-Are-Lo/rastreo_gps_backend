// src/modules/persona/entities/persona.entity.ts
export class PersonaEntity {
  id?: number; // ✅ AÑADIR ID (opcional para creación)
  nombre: string;
  apellido_paterno?: string | null;
  apellido_materno?: string | null;
  genero?: string | null;
  foto_url?: string | null;
  fecha_creacion: Date;
  fecha_modificacion?: Date | null;
  activo: boolean;
  eliminado: boolean;

  constructor(data: {
    id?: number;
    nombre: string;
    apellido_paterno?: string | null;
    apellido_materno?: string | null;
    genero?: string | null;
    foto_url?: string | null;
    fecha_creacion?: Date;
    fecha_modificacion?: Date | null;
    activo?: boolean;
    eliminado?: boolean;
  }) {
    this.id = data.id;
    this.nombre = data.nombre;
    this.apellido_paterno = data.apellido_paterno ?? null;
    this.apellido_materno = data.apellido_materno ?? null;
    this.genero = data.genero ?? null;
    this.foto_url = data.foto_url ?? null;
    this.fecha_creacion = data.fecha_creacion ?? new Date();
    this.fecha_modificacion = data.fecha_modificacion ?? null;
    this.activo = data.activo ?? true;
    this.eliminado = data.eliminado ?? false;
  }

  // ✅ MÉTODOS DE DOMINIO/NEGOCIO
  get nombreCompleto(): string {
    return `${this.nombre} ${this.apellido_paterno || ''} ${this.apellido_materno || ''}`.trim();
  }

  estaActiva(): boolean {
    return this.activo && !this.eliminado;
  }

  desactivar(): void {
    this.activo = false;
    this.fecha_modificacion = new Date();
  }

  eliminar(): void {
    this.activo = false;
    this.eliminado = true;
    this.fecha_modificacion = new Date();
  }

  // ✅ Para Prisma (si necesitas convertir a formato DB)
  toPrisma(): any {
    return {
      nombre: this.nombre,
      apellido_paterno: this.apellido_paterno,
      apellido_materno: this.apellido_materno,
      genero: this.genero,
      foto_url: this.foto_url,
      fecha_creacion: this.fecha_creacion,
      fecha_modificacion: this.fecha_modificacion,
      activo: this.activo,
      eliminado: this.eliminado
    };
  }
}