
// seed para pruebas de personas y documentos
import { seedPersonas } from './seed-personas';
import { seedDocumentos } from './seed-documentos';

async function main() {
  try {
    await seedPersonas();
    await seedDocumentos();
  
    console.log('Todos los seeds ejecutados correctamente!');
  } catch (error) {
    console.error('Error ejecutando seeds:', error);
    process.exit(1);
  }
}

main();