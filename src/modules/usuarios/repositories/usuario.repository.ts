
import { prisma } from '../../../config/prisma';
import { UsuarioEntity } from '../entities/usuario.entity';
import { AppError } from '../../../core/errors/AppError'; // ¡AGREGA ESTO!

export class UsuarioRepository {


    async crear(entity: UsuarioEntity): Promise<UsuarioEntity> {
    try {
      // 🔍 Validar que id_persona no sea undefined
      if (!entity.id_persona || entity.id_persona <= 0) {
        throw new AppError('id_persona es requerido y debe ser válido', 400);
      }

      // 🔍 Validar que la persona existe
      const personaExiste = await prisma.persona.findUnique({
        where: { id: entity.id_persona }
      });
      
      if (!personaExiste) {
        throw new AppError(`La persona con ID ${entity.id_persona} no existe`, 400);
      }

      const data = await prisma.usuario.create({
        data: {
          id_persona: entity.id_persona,
          username: entity.username,
          password_hash: entity.password_hash,
          activo: entity.activo,
          eliminado: entity.eliminado,
          fecha_creacion: entity.fecha_creacion || new Date()
        }
      });

      return new UsuarioEntity(data);
    } catch (error: any) {
      // 🔍 Manejar errores específicos de Prisma
      if (error.code === 'P2002') {
        // Error de constraint única (username duplicado)
        throw new AppError('El nombre de usuario ya existe', 400);
      }
      
      if (error.code === 'P2003') {
        // Error de clave foránea
        throw new AppError('Referencia inválida (persona no existe)', 400);
      }
      
      // Si ya es un AppError, re-lanzarlo
      if (error instanceof AppError) {
        throw error;
      }
      
      // Convertir otros errores a AppError
      throw new AppError(error.message || 'Error al crear usuario', 500);
    }
  }


  async buscarPorId(id: number): Promise<UsuarioEntity | null> {
    const data = await prisma.usuario.findFirst({
      where: { id, eliminado: false }
    });

    return data ? new UsuarioEntity(data) : null;
  }

  async buscarPorUsername(username: string): Promise<UsuarioEntity | null> {
    const data = await prisma.usuario.findFirst({
      where: { username, eliminado: false }
    });

    return data ? new UsuarioEntity(data) : null;
  }

  async actualizar(id: number, entity: UsuarioEntity): Promise<UsuarioEntity> {

    const existente = await this.buscarPorId(id);
    if (!existente) {
      throw new Error('Usuario no encontrado o ya eliminado');
    }

    const data = await prisma.usuario.update({
      where: { id },
      data: {
        username: entity.username,
        password_hash: entity.password_hash,
        activo: entity.activo,
        fecha_modificacion: new Date()
      }
    });

    return new UsuarioEntity(data);
  }

  async eliminarSuavemente(id: number): Promise<UsuarioEntity> {

    const existente = await this.buscarPorId(id);
    if (!existente) {
      throw new Error('Usuario no encontrado o ya eliminado');
    }

    const data = await prisma.usuario.update({
      where: { id },
      data: {
        activo: false,
        eliminado: true,
        fecha_modificacion: new Date()
      }
    });

    return new UsuarioEntity(data);
  }

  async buscarTodosUsuarios(): Promise<UsuarioEntity[]> {
    const data = await prisma.usuario.findMany({
      where: { eliminado: false },
      orderBy: { fecha_creacion: 'desc' }
    });

    return data.map(x => new UsuarioEntity(x));
  }
}
