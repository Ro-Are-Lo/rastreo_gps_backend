//src/modules/usuarios/services/usuarioRol.service.ts
import { UsuarioRolRepository } from '../repositories/usuarioRol.repository';
import { AppError } from '../../../core/errors/AppError';

export class UsuarioRolService {
  private repo = new UsuarioRolRepository();

  async asignarRol(id_usuario: number, id_rol: number) {
    return this.repo.asignarRol(id_usuario, id_rol);
  }

  async removerRol(id_usuario: number, id_rol: number) {
    return this.repo.removerRol(id_usuario, id_rol);
  }

  async listarRolesUsuario(id_usuario: number) {
    return this.repo.listarRolesUsuario(id_usuario);
  }
}
