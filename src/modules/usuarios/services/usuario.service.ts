//src/modules/usuarios/services/usuario.service.ts
import { UsuarioRepository } from '../repositories/usuario.repository';
import { CrearUsuarioDto } from '../dto/crearUsuario.dto';
import { ActualizarUsuarioDto } from '../dto/actualizarUsuario.dto';
import { AppError } from '../../../core/errors/AppError';
import bcrypt from 'bcrypt';

export class UsuarioService {
  private repo = new UsuarioRepository();

  async crearUsuario(dto: CrearUsuarioDto) {
    const exists = await this.repo.findByUsername(dto.username);
    if (exists) throw new AppError('Usuario ya existe', 400);

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    return this.repo.create({ ...dto, password_hash: hashedPassword });
  }

  async actualizarUsuario(id: number, dto: ActualizarUsuarioDto) {
    const user = await this.repo.findById(id);
    if (!user || user.eliminado) throw new AppError('Usuario no encontrado', 404);

    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }

    return this.repo.update(id, dto);
  }

  async eliminarUsuario(id: number) {
    const user = await this.repo.findById(id);
    if (!user || user.eliminado) throw new AppError('Usuario no encontrado', 404);

    await this.repo.softDelete(id);
    return { success: true, message: 'Usuario eliminado' };
  }

  async obtenerUsuario(id: number) {
    const user = await this.repo.findById(id);
    if (!user || user.eliminado) throw new AppError('Usuario no encontrado', 404);
    return user;
  }
}
