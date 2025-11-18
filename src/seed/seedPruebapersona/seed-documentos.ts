import { PrismaClient } from '@prisma/client';
import { DocumentoEntity } from '../../modules/persona/entities/documento.entity';


const prisma = new PrismaClient();

export const seedDocumentos = async () => {
  const documentos: DocumentoEntity[] = [
    {
      id: 1,
      id_persona: 1,
      tipo_documento: 'DNI',
      nro_documento: '12345678',
      fecha_creacion: new Date(),
      fecha_modificacion: null,
      activo: true,
      eliminado: false,
    },
    {
      id: 2,
      id_persona: 2,
      tipo_documento: 'CE',
      nro_documento: 'AB123456',
      fecha_creacion: new Date(),
      fecha_modificacion: null,
      activo: true,
      eliminado: false,
    },
  ];

  for (const doc of documentos) {
    await prisma.documento.upsert({
      where: { id: doc.id },
      update: doc,
      create: doc,
    });
  }

  console.log('Seed documentos completado');
};
