// src/seed/seedPruebapersona/seed-documentos.ts (CORREGIDO)
import { DocumentoEntity } from '../../modules/persona/entities/documento.entity';
import { prisma } from '.././../config/prisma';

export async function seedDocumentos() {
  try {
    console.log('=== Sembrando datos de prueba (Documentos) ===');

    // Documento 1 - Usar Entity correctamente
    const documento1 = new DocumentoEntity({
      id_persona: 1,
      tipo_documento: 'CI',
      nro_documento: '12345678'
    });

    // Verificar si existe
    const existe1 = await prisma.documento.findUnique({
      where: { nro_documento: '12345678' }
    });

    if (!existe1) {
      await prisma.documento.create({
        data: documento1.toPrisma()
      });
      console.log('✅ Documento 1 creado');
    }

    // Documento 2
    const documento2 = new DocumentoEntity({
      id_persona: 2,
      tipo_documento: 'LICENCIA',
      nro_documento: 'ABC12345'
    });

    const existe2 = await prisma.documento.findUnique({
      where: { nro_documento: 'ABC12345' }
    });

    if (!existe2) {
      await prisma.documento.create({
        data: documento2.toPrisma()
      });
      console.log('✅ Documento 2 creado');
    }

    console.log('✅ Seed de documentos completado');
    
  } catch (error) {
    console.error('❌ Error en seed de documentos:', error);
    throw error;
  }
}

if (require.main === module) {
  seedDocumentos()
    .then(() => {
      console.log('✅ Script de documentos completado');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Error:', error);
      process.exit(1);
    });
}