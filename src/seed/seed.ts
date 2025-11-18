import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Creamos roles iniciales si no existen
  const roles = [
    { nombre: 'admin', descripcion: 'Administrador del sistema' },
    { nombre: 'conductor', descripcion: 'Conductor de taxi o vehículo' },
    { nombre: 'usuario', descripcion: 'Cliente o pasajero' },
  ];

  for (const rol of roles) {
    const existe = await prisma.rol.findUnique({
      where: { nombre: rol.nombre },
    });

    if (!existe) {
      await prisma.rol.create({ data: rol });
      console.log(`Rol creado: ${rol.nombre}`);
    } else {
      console.log(`Rol ya existe: ${rol.nombre}`);
    }
  }

  console.log('Seed completado correctamente.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
