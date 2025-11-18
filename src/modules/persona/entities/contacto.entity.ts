//src/modules/persona/entities/contacto.entity.ts
export interface Contactoentity {
    id: number; 
    id_persona: number;
    tipo_contacto: 'correo' | 'telefono' | 'direccion';
    valor: string;
    fecha_creacion: Date;
    fecha_modificacion?: Date | null;
    activo: boolean;
    eliminado: boolean;
}