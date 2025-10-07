import { prisma } from '../prisma/client';
import bcrypt from 'bcrypt';
import { generateToken, generateRefreshToken } from '../utils/jwt';

export const loginUser = async (username: string, password: string) => {
  const user = await prisma.usuario.findUnique({
    where: { username },
    include: {
      roles: { include: { rol: true } },
      correos: true,
      telefonos: true,
      asignaciones: true,
      conexiones: true
    }
  });

  if (!user) {
    throw new Error('Usuario o contraseña incorrectos');
  }

  const passwordValid = await bcrypt.compare(password, user.password_hash);
  if (!passwordValid) {
    throw new Error('Usuario o contraseña incorrectos');
  }

  const roles = user.roles?.map((ur) => ur.rol.nombre) || [];

  const token = generateToken({
    usuario_id: user.usuario_id,
    username: user.username,
    roles
  });

  const refreshToken = generateRefreshToken({
    usuario_id: user.usuario_id,
    username: user.username
  });

  return {
    usuario: {
      usuario_id: user.usuario_id,
      username: user.username,
      nombre: user.nombre,
      apellido_paterno: user.apellido_paterno,
      apellido_materno: user.apellido_materno,
      roles,
      correos: user.correos?.map(c => c.correo) || [],
      telefonos: user.telefonos?.map(t => t.telefono) || []
    },
    token,
    refreshToken
  };
};
