// src/modules/usuarios-completos/services/usuario-completo.service.ts - VERSIÓN COMPLETA
import bcrypt from 'bcrypt';
import { UsuarioCompletoRepository } from '../repositories/usuario-completo.repository';
import { CrearUsuarioCompletoDto } from '../dtos/crear-usuario-completo.dto';
import { ActualizarUsuarioCompletoDto } from '../dtos/actualizar-usuario-completo.dto';
import { FiltrosUsuarioCompletoDto } from '../dtos/filtros-usuario-completo.dto';

// Interfaz para datos que van al repository
interface UpdateDataForRepository {
  nombre?: string;
  apellido_paterno?: string;
  apellido_materno?: string;
  genero?: string;
  foto_url?: string;
  username?: string;
  password_hash?: string;
  email?: string;
  telefono?: string;
  cedula_identidad?: string;
  nacionalidad?: string;
  licencia_numero?: string;
  licencia_categoria?: string;
  roles?: string[];
  activo?: boolean;
}

export class UsuarioCompletoService {
  private repository: UsuarioCompletoRepository;

  constructor() {
    this.repository = new UsuarioCompletoRepository();
  }

  async crear(data: CrearUsuarioCompletoDto) {
    // Validar que password existe
    if (!data.password) {
      throw new Error('Password es requerido');
    }
    
    // Hash password
    const password_hash = await bcrypt.hash(data.password, 10);

    const usuarioData = {
      ...data,
      password_hash,
      roles: data.roles || ['CONDUCTOR']
    };

    return await this.repository.crear(usuarioData);
  }

  async obtenerPorId(id: number) {
    const usuario = await this.repository.obtenerPorId(id);
    
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    return usuario;
  }

  async listar(filtros: FiltrosUsuarioCompletoDto) {
    return await this.repository.listar(filtros);
  }

  async actualizar(id: number, data: ActualizarUsuarioCompletoDto) {
    // Crear objeto para el repository
    const updateData: UpdateDataForRepository = { ...data };
    
    // Si viene password, agregar password_hash
    if (data.password) {
      updateData.password_hash = await bcrypt.hash(data.password, 10);
      // Eliminar password del objeto
      delete (updateData as any).password;
    }

    return await this.repository.actualizar(id, updateData);
  }

  async eliminar(id: number) {
    return await this.repository.eliminarLogicamente(id);
  }

  async reactivar(id: number) {
    return await this.repository.reactivar(id);
  }
}