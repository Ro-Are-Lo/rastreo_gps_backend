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
      foto_url: data.foto_url
    }
  });

  return newUser;
};

export const updateUsuario = async (
  usuario_id: number,
  data: Partial<{
    username: string;
    password: string;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    cedula_identidad: string;
    nacionalidad: string;
    genero: string;
    licencia_numero: string;
    licencia_categoria: string;
    foto_url: string;
  }>
) => {
  if (data.password) {
    (data as any).password_hash = await bcrypt.hash(data.password, SALT_ROUNDS);
    delete (data as any).password;
  }

  const updatedUser = await prisma.usuario.update({
    where: { usuario_id },
    data: data as any
  });

  return updatedUser;
};

export const deleteUsuario = async (usuario_id: number) => {
  await prisma.usuario.delete({
    where: { usuario_id }
  });
  return { message: 'Usuario eliminado correctamente' };
};
