//src/modules/usuarios/repositories/usuario.repository.ts
import { prisma } from '../../../config/prisma';
import { CrearUsuarioDto } from '../dto/crearUsuario.dto';
import { ActualizarUsuarioDto } from '../dto/actualizarUsuario.dto';

export class UsuarioRepository {
  //crear usuario
  async create(data: CrearUsuarioDto) {
    return prisma.usuario.create({ data });
  }

  //buscar usuario por id
  async findById(id: number) {
    return prisma.usuario.findUnique({ where: { id } });
  }
//buscar usuario por username
  async findByUsername(username: string) {
    return prisma.usuario.findUnique({ where: { username } });
  }
//actualizar usuario
  async update(id: number, data: ActualizarUsuarioDto) {
    return prisma.usuario.update({
      where: { id },
      data: { ...data, fecha_modificacion: new Date() },
    });
  }
//eliminar usuario (soft delete)
  async softDelete(id: number) {
    return prisma.usuario.update({
      where: { id },
      data: { activo: false, eliminado: true, fecha_modificacion: new Date() },
    });
  }
}
