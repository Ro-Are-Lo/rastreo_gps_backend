// src/modules/usuarios/services/usuarioRol.service.ts (CORREGIDO)
import { UsuarioRolRepository } from '../repositories/usuarioRol.repository';
import { UsuarioRolEntity } from '../entities/usuarioRol.entity';
import { CrearUsuarioRolDto } from '../dto/crearUsarioRol.dto';
import { BorrarUsuarioRolDto } from '../dto/borrarUsuarioRol.dto';
import { AppError } from '../../../core/errors/AppError';
import { prisma } from '../../../config/prisma'; // ¡IMPORTANTE!

export class UsuarioRolService {
  private repo = new UsuarioRolRepository();

  async asignarRol(dto: CrearUsuarioRolDto): Promise<any> {
    // ✅ VALIDAR que usuario existe
    const usuarioExiste = await prisma.usuario.findUnique({
      where: { id: dto.id_usuario, activo: true, eliminado: false }
    });
    
    if (!usuarioExiste) {
      throw new AppError('Usuario no encontrado o inactivo', 400);
    }

    // ✅ VALIDAR que rol existe
    const rolExiste = await prisma.rol.findUnique({
      where: { id: dto.id_rol, activo: true, eliminado: false }
    });
    
    if (!rolExiste) {
      throw new AppError('Rol no encontrado o inactivo', 400);
    }

    // ✅ Convertir DTO a Entity
    const usuarioRolEntity = new UsuarioRolEntity({
      id_usuario: dto.id_usuario,
      id_rol: dto.id_rol
    });

    return this.repo.asignarRol(usuarioRolEntity);
  }

  async borrarRol(dto: BorrarUsuarioRolDto): Promise<any> {
    // ✅ VALIDAR que usuario existe
    const usuarioExiste = await prisma.usuario.findUnique({
      where: { id: dto.id_usuario }
    });
    
    if (!usuarioExiste) {
      throw new AppError('Usuario no encontrado', 404);
    }

    // ✅ VALIDAR que rol existe
    const rolExiste = await prisma.rol.findUnique({
      where: { id: dto.id_rol }
    });
    
    if (!rolExiste) {
      throw new AppError('Rol no encontrado', 404);
    }

    // ✅ Convertir DTO a Entity
    const usuarioRolEntity = new UsuarioRolEntity({
      id_usuario: dto.id_usuario,
      id_rol: dto.id_rol
    });

    return this.repo.borrarRol(usuarioRolEntity);
  }

  async listarRolesUsuario(id_usuario: number): Promise<any[]> {
    // ✅ VALIDAR que usuario existe
    const usuarioExiste = await prisma.usuario.findUnique({
      where: { id: id_usuario }
    });
    
    if (!usuarioExiste) {
      throw new AppError('Usuario no encontrado', 404);
    }

    return this.repo.listarRolesUsuario(id_usuario);
  }
}