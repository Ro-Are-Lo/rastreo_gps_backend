// src/seed/crearAdmin.ts
import bcrypt from 'bcrypt';
import { prisma } from '../prisma/client';

async function main() {
  console.log('Iniciando seed...');

  // 1) Limpiar tablas (solo para desarrollo)
  await prisma.usuarioRol.deleteMany();
  await prisma.usuario.deleteMany();

  // 2) Asegurar roles
  const rolAdmin = await prisma.rol.upsert({
    where: { nombre: 'admin' },
    update: {},
    create: { nombre: 'admin' },
  });

  const rolUser = await prisma.rol.upsert({
    where: { nombre: 'user' },
    update: {},
    create: { nombre: 'user' },
  });

  // 3) Crear 25 usuarios
  for (let i = 1; i <= 25; i++) {
    const username = `user${i}`;
    const plainPassword = '123456';

    // Generar valores únicos
    const timestamp = Date.now(); // para asegurar unicidad
    const cedula = `CID${timestamp}${i}`;
    const licencia = `LIC${timestamp}${i}`;

    // Crear usuario
    const usuario = await prisma.usuario.create({
      data: {
        username,
        password_hash: await bcrypt.hash(plainPassword, 10),
        nombre: `Nombre${i}`,
        apellido_paterno: `ApellidoP${i}`,
        apellido_materno: `ApellidoM${i}`,
        cedula_identidad: cedula,
        nacionalidad: 'Boliviana',
        genero: i % 2 === 0 ? 'F' : 'M',
        licencia_numero: licencia,
        licencia_categoria: 'B',
        foto_url: ''
      }
    });

    // Asignar rol
    const rolId = i === 1 ? rolAdmin.rol_id : rolUser.rol_id;
    await prisma.usuarioRol.create({
      data: { usuario_id: usuario.usuario_id, rol_id: rolId }
    });

    console.log(`Usuario creado: ${username} (${i === 1 ? 'admin' : 'user'})`);
  }

  console.log('Seed completado correctamente.');
}

main()
  .catch((e) => {
    console.error('Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
