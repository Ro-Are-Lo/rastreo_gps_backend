import bcrypt from 'bcrypt';
import { prisma } from '../prisma/client';

async function main() {
  // 1) Asegurarnos de que existe el rol 'admin' (upsert)
  const rolAdmin = await prisma.rol.upsert({
    where: { nombre: 'admin' }, // requiere que 'nombre' sea UNIQUE en el modelo Rol
    update: {},
    create: { nombre: 'admin' }
  });

  // 2) Datos del usuario que queremos crear
  const username = 'admin2';
  const plainPassword = '123456';

  // 3) Verificar si el usuario ya existe
  const existingUser = await prisma.usuario.findUnique({ where: { username } });
  if (existingUser) {
    console.log(`Usuario "${username}" ya existe (id=${existingUser.usuario_id}).`);

    // Asegurarse de que la relación usuario↔rol exista
    const existingRel = await prisma.usuarioRol.findFirst({
      where: { usuario_id: existingUser.usuario_id, rol_id: rolAdmin.rol_id }
    });

    if (!existingRel) {
      await prisma.usuarioRol.create({
        data: {
          usuario_id: existingUser.usuario_id,
          rol_id: rolAdmin.rol_id
        }
      });
      console.log('Se asignó el rol "admin" al usuario existente.');
    } else {
      console.log('El usuario ya tiene asignado el rol "admin".');
    }

    return;
  }

  // 4) Crear el nuevo usuario (hashear password)
  const passwordHash = await bcrypt.hash(plainPassword, 10);

  const usuario = await prisma.usuario.create({
    data: {
      username,
      password_hash: passwordHash,
      nombre: 'Dante',
      apellido_paterno: 'Plant',
      apellido_materno: 'Lopez',
      cedula_identidad: '1000003',
      nacionalidad: 'Boliviana',
      genero: 'M',
      licencia_numero: 'LIC003',
      licencia_categoria: 'B',
      foto_url: ''
    }
  });

  // 5) Crear la relación usuario ↔ rol
  await prisma.usuarioRol.create({
    data: {
      usuario_id: usuario.usuario_id,
      rol_id: rolAdmin.rol_id
    }
  });

  console.log('Usuario admin creado:', { usuario_id: usuario.usuario_id, username: usuario.username });
}

main()
  .catch((e) => {
    console.error('Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
