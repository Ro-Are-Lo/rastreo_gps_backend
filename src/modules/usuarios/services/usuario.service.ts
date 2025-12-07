// usuario.service.ts
import { UsuarioRepository } from '../repositories/usuario.repository';
import { CrearUsuarioDto } from '../dto/crearUsuario.dto';
import { ActualizarUsuarioDto } from '../dto/actualizarUsuario.dto';
import { UsuarioEntity } from '../entities/usuario.entity';
import { AppError } from '../../../core/errors/AppError';
import bcrypt from 'bcrypt';

export class UsuarioService {
  private repo = new UsuarioRepository();

  async crearUsuario(dto: CrearUsuarioDto) {
    const exists = await this.repo.buscarPorUsername(dto.username);
    if (exists) throw new AppError('Usuario ya existe', 400);

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const entity = new UsuarioEntity({
      id_persona: dto.id_persona,
      username: dto.username,
      password_hash: hashedPassword,
      activo: true,
      eliminado: false
    });

    return this.repo.crear(entity);
  }

  async actualizarUsuario(id: number, dto: ActualizarUsuarioDto) {
    const usuario = await this.repo.buscarPorId(id);
    if (!usuario) throw new AppError('Usuario no encontrado', 404);

    if (dto.username) usuario.username = dto.username;
    if (dto.password) usuario.password_hash = await bcrypt.hash(dto.password, 10);
    if (dto.activo !== undefined) usuario.activo = dto.activo;

    usuario.fecha_modificacion = new Date();

    return this.repo.actualizar(id, usuario);
  }

  async eliminarUsuario(id: number) {
    const usuario = await this.repo.buscarPorId(id);
    if (!usuario) throw new AppError('Usuario no encontrado', 404);

    return this.repo.eliminarSuavemente(id);
  }

  async obtenerUsuario(id: number) {
    const usuario = await this.repo.buscarPorId(id);
    if (!usuario) throw new AppError('Usuario no encontrado', 404);

    return usuario;
  }


  async listarUsuarios(pagina: number = 1, porPagina: number = 20) {
  return this.repo.buscarTodosUsuarios();
}

}
