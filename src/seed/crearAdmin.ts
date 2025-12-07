// src/seed/crearAdmin.ts (COMPLETO CORREGIDO - NUEVA VERSIÓN)
import { prisma } from '../config/prisma';
import bcrypt from 'bcrypt';

export async function crearAdmin() {
  try {
    const username = 'admin';
    const password = 'admin123';
    
    console.log('=== Creando usuario administrador ===');

    // 1. Verificar o crear rol ADMIN
    let rolAdmin = await prisma.rol.findFirst({
      where: { nombre: 'ADMIN' }
    });
    
    if (!rolAdmin) {
      rolAdmin = await prisma.rol.create({
        data: {
          nombre: 'ADMIN',
          fecha_creacion: new Date(),
          activo: true,
          eliminado: false
        }
      });
      console.log('✅ Rol ADMIN creado');
    } else {
      console.log('✅ Rol ADMIN ya existe');
    }

    // 2. Buscar usuario existente
    const existingUser = await prisma.usuario.findFirst({
      where: { username }
    });

    if (existingUser) {
      console.log(`✅ Usuario "${username}" ya existe (id=${existingUser.id})`);
      
      // Verificar si ya tiene rol ADMIN
      const existingRole = await prisma.usuarioRol.findUnique({
        where: { 
          id_usuario_id_rol: { 
            id_usuario: existingUser.id, 
            id_rol: rolAdmin.id 
          } 
        }
      });

      if (!existingRole) {
        // Asignar rol ADMIN
        await prisma.usuarioRol.create({
          data: {
            id_usuario: existingUser.id,
            id_rol: rolAdmin.id
          }
        });
        console.log('✅ Rol ADMIN asignado al usuario existente');
      } else {
        console.log('✅ El usuario ya tenía rol ADMIN');
      }
      
      console.log('Credenciales:', { username, password });
      return;
    }

    // 3. Crear persona para el admin
    const personaAdmin = await prisma.persona.create({
      data: {
        nombre: 'Administrador',
        apellido_paterno: 'Sistema',
        genero: 'O',
        fecha_creacion: new Date(),
        activo: true,
        eliminado: false
      }
    });
    console.log('✅ Persona admin creada');

    // 4. Crear usuario admin con password hasheado
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const usuarioAdmin = await prisma.usuario.create({
      data: {
        id_persona: personaAdmin.id,
        username,
        password_hash: hashedPassword,
        fecha_creacion: new Date(),
        activo: true,
        eliminado: false
      }
    });
    console.log('✅ Usuario admin creado');

    // 5. Asignar rol ADMIN
    await prisma.usuarioRol.create({
      data: {
        id_usuario: usuarioAdmin.id,
        id_rol: rolAdmin.id
      }
    });
    console.log('✅ Rol ADMIN asignado');

    console.log('========================================');
    console.log('✅ ADMIN CREADO EXITOSAMENTE');
    console.log('Usuario:', username);
    console.log('Password:', password);
    console.log('Usuario ID:', usuarioAdmin.id);
    console.log('========================================');
    
  } catch (error) {
    console.error('❌ Error al crear admin:', error);
    throw error;
  }
}

// Ejecutar si es script principal
if (require.main === module) {
  crearAdmin()
    .then(() => {
      console.log('✅ Script completado');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Error:', error);
      process.exit(1);
    });
}