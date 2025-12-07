// src/modules/vehiculo/entities/vehiculo.entity.ts (REFACTORIZADO)
export class VehiculoEntity {
  id?: number; // ✅ Cambiar a opcional
  placa: string;
  modelo?: string | null;
  anio?: number | null;
  fecha_creacion: Date;
  fecha_modificacion?: Date | null;
  activo: boolean;
  eliminado: boolean;

  constructor(data: {
    id?: number;
    placa: string;
    modelo?: string | null;
    anio?: number | null;
    fecha_creacion?: Date;
    fecha_modificacion?: Date | null;
    activo?: boolean;
    eliminado?: boolean;
  }) {
    this.id = data.id;
    this.placa = data.placa;
    this.modelo = data.modelo ?? null;
    this.anio = data.anio ?? null;
    this.fecha_creacion = data.fecha_creacion ?? new Date();
    this.fecha_modificacion = data.fecha_modificacion ?? null;
    this.activo = data.activo ?? true;
    this.eliminado = data.eliminado ?? false;
  }

  // ✅ MÉTODOS DE DOMINIO (lógica de negocio aquí)
  validarPlaca(): boolean {
    // Validar formato de placa boliviana: ABC-123 o AB-1234
    const regexPlaca = /^[A-Z]{2,4}-?\d{3,4}$/i; // ✅ Acepta TEST-001
    return regexPlaca.test(this.placa.toUpperCase());
  }

  estaDisponible(): boolean {
    return this.activo && !this.eliminado;
  }

  obtenerInfoCompleta(): string {
    const año = this.anio ? ` (${this.anio})` : '';
    return `${this.placa}${this.modelo ? ` - ${this.modelo}` : ''}${año}`;
  }

  toPrisma(): any {
    return {
      placa: this.placa.toUpperCase(), // ✅ Normalizar a mayúsculas
      modelo: this.modelo,
      anio: this.anio,
      fecha_creacion: this.fecha_creacion,
      fecha_modificacion: this.fecha_modificacion,
      activo: this.activo,
      eliminado: this.eliminado
    };
  }
}