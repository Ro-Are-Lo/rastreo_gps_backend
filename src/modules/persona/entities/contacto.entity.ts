// src/modules/persona/entities/contacto.entity.ts (CORREGIDO)
export class ContactoEntity {
  id?: number;
  id_persona: number;
  tipo: 'correo' | 'telefono' | 'direccion';
  valor: string;
  fecha_creacion: Date;
  fecha_modificacion?: Date | null;
  activo: boolean;
  eliminado: boolean;

  constructor(data: {
    id?: number;
    id_persona: number;
    tipo: string | 'correo' | 'telefono' | 'direccion'; // ✅ Aceptar string también
    valor: string;
    fecha_creacion?: Date;
    fecha_modificacion?: Date | null;
    activo?: boolean;
    eliminado?: boolean;
  }) {
    this.id = data.id;
    this.id_persona = data.id_persona;
    
    // ✅ Convertir string al tipo enumerado (asegurar que sea válido)
    const tipoValido = data.tipo as 'correo' | 'telefono' | 'direccion';
    if (!['correo', 'telefono', 'direccion'].includes(tipoValido)) {
      throw new Error(`Tipo de contacto inválido: ${data.tipo}`);
    }
    this.tipo = tipoValido;
    
    this.valor = data.valor;
    this.fecha_creacion = data.fecha_creacion ?? new Date();
    this.fecha_modificacion = data.fecha_modificacion ?? null;
    this.activo = data.activo ?? true;
    this.eliminado = data.eliminado ?? false;
  }
// src/modules/persona/entities/contacto.entity.ts
validarFormato(): boolean {
  if (this.tipo === 'correo') {
    // Validación de email más robusta pero flexible
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(this.valor);
  }
  
  if (this.tipo === 'telefono') {
    // Teléfono: solo números, entre 7 y 15 dígitos
    const telefonoRegex = /^[0-9]{7,15}$/;
    return telefonoRegex.test(this.valor);
  }
  
  if (this.tipo === 'direccion') {
    // Dirección: mínimo 5 caracteres, máximo 255
    return this.valor.length >= 5 && this.valor.length <= 255;
  }
  
  return false; // Tipo no reconocido
}

// Añade un método para obtener mensajes de error descriptivos
obtenerMensajeErrorValidacion(): string {
  if (this.tipo === 'correo') {
    return 'El correo electrónico no tiene un formato válido (ejemplo: usuario@dominio.com)';
  }
  
  if (this.tipo === 'telefono') {
    return 'El teléfono debe contener solo números (7 a 15 dígitos)';
  }
  
  if (this.tipo === 'direccion') {
    return 'La dirección debe tener entre 5 y 255 caracteres';
  }
  
  return 'Tipo de contacto no válido';
}
  toPrisma(): any {
    return {
      id_persona: this.id_persona,
      tipo: this.tipo,
      valor: this.valor,
      fecha_creacion: this.fecha_creacion,
      fecha_modificacion: this.fecha_modificacion,
      activo: this.activo,
      eliminado: this.eliminado
    };
  }

  

}