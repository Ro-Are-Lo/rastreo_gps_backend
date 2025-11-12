import { prisma } from '../prisma/client';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const getAllUsuarios = async () => {
  return prisma.usuario.findMany({
    select: {
      usuario_id: true,
      username: true,
      nombre: true,
      apellido_paterno: true,
      apellido_materno: true,
      cedula_identidad: true,
      nacionalidad: true,
      genero: true,
      licencia_numero: true,
      licencia_categoria: true,
      foto_url: true,
      roles: { include: { rol: true } },
      correos: { select: { correo: true } },
      telefonos: { select: { telefono: true } }
    }
  });
};

export const getUsuarioById = async (usuario_id: number) => {
  const user = await prisma.usuario.findUnique({
    where: { usuario_id },
    include: {
      roles: { include: { rol: true } },
      correos: true,
      telefonos: true
    }
  });

  if (!user) throw new Error('Usuario no encontrado');
  return user;
};


export const createUsuario = async (data: {
  username: string;
  password: string;
  nombre: string;
  apellido_paterno?: string;
  apellido_materno?: string;
  cedula_identidad: string;
  nacionalidad?: string;
  genero?: string;
  licencia_numero?: string;
  licencia_categoria?: string;
  foto_url?: string;

  roles?: { rol_id: number }[];       // roles a asignar
  correos?: { correo: string }[];     // correos
  telefonos?: { telefono: string }[]; // teléfonos
}) => {
  const password_hash = await bcrypt.hash(data.password, SALT_ROUNDS);

  const newUser = await prisma.usuario.create({
    data: {
      username: data.username,
      password_hash,
      nombre: data.nombre,
      apellido_paterno: data.apellido_paterno,
      apellido_materno: data.apellido_materno,
      cedula_identidad: data.cedula_identidad,
      nacionalidad: data.nacionalidad,
      genero: data.genero,
      licencia_numero: data.licencia_numero,
      licencia_categoria: data.licencia_categoria,
      foto_url: data.foto_url,

      // Relaciones
      roles: data.roles
        ? {
            create: data.roles.map(r => ({ rol_id: r.rol_id }))
          }
        : undefined,

      correos: data.correos
        ? {
            create: data.correos
          }
        : undefined,

      telefonos: data.telefonos
        ? {
            create: data.telefonos
          }
        : undefined
    }
  });

  return newUser;
};

export const updateUsuario = async (
  usuario_id: number,
  data: any
) => {
  if (data.password) {
    data.password_hash = await bcrypt.hash(data.password, SALT_ROUNDS);
    delete data.password;
  }

  // Estructura para actualización anidada
  const updateData: any = {
    username: data.username,
    nombre: data.nombre,
    apellido_paterno: data.apellido_paterno,
    apellido_materno: data.apellido_materno,
    cedula_identidad: data.cedula_identidad,
    nacionalidad: data.nacionalidad,
    genero: data.genero,
    licencia_numero: data.licencia_numero,
    licencia_categoria: data.licencia_categoria,
    foto_url: data.foto_url,
    password_hash: data.password_hash
  };

  // Actualizar roles (si vienen en el body)
  if (data.roles && data.roles.length > 0) {
    updateData.roles = {
      deleteMany: {}, // elimina los roles actuales
      create: data.roles.map((r: any) => ({
        rol_id: r.rol_id
      }))
    };
  }

  // Actualizar correos (si vienen en el body)
  if (data.correos && data.correos.length > 0) {
    updateData.correos = {
      deleteMany: {},
      create: data.correos.map((c: any) => ({
        correo: c.correo
      }))
    };
  }

  // Actualizar teléfonos (si vienen en el body)
  if (data.telefonos && data.telefonos.length > 0) {
    updateData.telefonos = {
      deleteMany: {},
      create: data.telefonos.map((t: any) => ({
        telefono: t.telefono
      }))
    };
  }

  const updatedUser = await prisma.usuario.update({
    where: { usuario_id },
    data: updateData,
    include: {
      roles: { include: { rol: true } },
      correos: true,
      telefonos: true
    }
  });

  return updatedUser;
};

export const deleteUsuario = async (usuario_id: number) => {
  // Primero eliminamos relaciones dependientes
  await prisma.usuarioRol.deleteMany({
    where: { usuario_id }
  });

  await prisma.correoUsuario.deleteMany({
    where: { usuario_id }
  });

  await prisma.telefonoUsuario.deleteMany({
    where: { usuario_id }
  });

  await prisma.asignacion.deleteMany({
    where: { usuario_id }
  });

  await prisma.conexion.deleteMany({
    where: { usuario_id }
  });

  // Finalmente eliminamos el usuario
  await prisma.usuario.delete({
    where: { usuario_id }
  });

  return { message: 'Usuario y sus relaciones eliminados correctamente' };
};
