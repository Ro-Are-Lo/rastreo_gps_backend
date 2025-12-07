// src/modules/auth/auth.controller.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      console.log(`🔐 Intento de login para usuario: ${username}`);

      // 1. Buscar usuario con sus relaciones según tu schema
      const usuario = await prisma.usuario.findFirst({
        where: { 
          username: username.trim(),
          activo: true,
          eliminado: false 
        },
        include: {
          persona: true,  // Relación "persona" existe según tu schema
          roles: {        // Relación "roles" existe (es UsuarioRol[])
            include: {
              rol: true   // Incluir el rol relacionado
            }
          }
        }
      });

      if (!usuario) {
        console.log(`❌ Usuario no encontrado: ${username}`);
        return res.status(401).json({ 
          success: false,
          error: 'Usuario o contraseña incorrectos' 
        });
      }

      // 2. Verificar contraseña
      const passwordValida = await bcrypt.compare(password, usuario.password_hash);
      
      if (!passwordValida) {
        console.log(`❌ Contraseña incorrecta para: ${username}`);
        return res.status(401).json({ 
          success: false,
          error: 'Usuario o contraseña incorrectos' 
        });
      }

      // 3. Obtener roles (según tu schema: usuario.roles es UsuarioRol[])
      const roles = usuario.roles.map(ur => ur.rol.nombre);

      // 4. Generar token JWT
      const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';
      const token = jwt.sign(
        {
          id: usuario.id,
          username: usuario.username,
          personaId: usuario.id_persona,
          roles: roles
        },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      console.log(`✅ Login exitoso: ${username}, roles: ${roles.join(', ')}`);

      // 5. Responder
      res.json({
        success: true,
        message: 'Login exitoso',
        token,
        usuario: {
          id: usuario.id,
          username: usuario.username,
          persona: usuario.persona,
          roles: roles
        }
      });

    } catch (error: any) {
      console.error('🔥 Error en login:', error);
      res.status(500).json({ 
        success: false,
        error: 'Error interno del servidor',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // Verificar token
  async verify(req: Request, res: Response) {
    try {
      const authHeader = req.headers.authorization;
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ 
          success: false,
          error: 'Token no proporcionado' 
        });
      }

      const token = authHeader.split(' ')[1];
      const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';
      
      const decoded = jwt.verify(token, JWT_SECRET);

      res.json({
        success: true,
        message: 'Token válido',
        user: decoded
      });
    } catch (error) {
      res.status(401).json({ 
        success: false,
        error: 'Token inválido o expirado' 
      });
    }
  }

  // Perfil del usuario autenticado
  async profile(req: Request, res: Response) {
    try {
      // Usuario viene del middleware de auth
      const user = (req as any).user;
      
      if (!user) {
        return res.status(401).json({ 
          success: false,
          error: 'No autenticado' 
        });
      }

      // Buscar información completa según tu schema
      const usuario = await prisma.usuario.findUnique({
        where: { id: user.id },
        include: {
          persona: true,
          roles: {
            include: {
              rol: true
            }
          }
        }
      });

      if (!usuario) {
        return res.status(404).json({ 
          success: false,
          error: 'Usuario no encontrado' 
        });
      }

      const roles = usuario.roles.map(ur => ur.rol.nombre);

      res.json({
        success: true,
        usuario: {
          id: usuario.id,
          username: usuario.username,
          persona: usuario.persona,
          roles: roles
        }
      });

    } catch (error: any) {
      console.error('Error obteniendo perfil:', error);
      res.status(500).json({ 
        success: false,
        error: 'Error interno del servidor' 
      });
    }
  }
}