// En el MISMO archivo usuario.controller.ts
import { Request, Response, NextFunction } from 'express';
import { UsuarioService } from '../services/usuario.service';
import { CrearUsuarioDto } from '../dto/crearUsuario.dto';
import { ActualizarUsuarioDto } from '../dto/actualizarUsuario.dto';

const service = new UsuarioService();

// 🔒 Helper MEJORADO para ocultar password_hash
const ocultarPasswordHash = (obj: any): any => {
  if (!obj || typeof obj !== 'object') return obj;
  
  // Si es instancia de UsuarioEntity, convertir a objeto plano
  let plainObj = obj;
  if (obj.constructor.name === 'UsuarioEntity') {
    plainObj = { ...obj };
  }
  
  // Si el objeto tiene password_hash, lo eliminamos
  if ('password_hash' in plainObj) {
    const { password_hash, ...rest } = plainObj;
    return rest;
  }
  
  return plainObj;
};

export class UsuarioController {

  crearUsuario = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // 🔍 req.body YA está validado por validateBody middleware
      const user = await service.crearUsuario(req.body);
      
      // 🔒 Aplicar helper
      const userSafe = ocultarPasswordHash(user);
      
      res.status(201).json(userSafe);
    } catch (err) {
      next(err);
    }
  };

  actualizarUsuario = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const updated = await service.actualizarUsuario(id, req.body);
      
      const updatedSafe = ocultarPasswordHash(updated);
      res.json(updatedSafe);
    } catch (err) {
      next(err);
    }
  };

  obtenerUsuario = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const user = await service.obtenerUsuario(id);
      
      const userSafe = ocultarPasswordHash(user);
      res.json(userSafe);
    } catch (err) {
      next(err);
    }
  };

  eliminarUsuario = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const result = await service.eliminarUsuario(id);
      
      const resultSafe = ocultarPasswordHash(result);
      res.json(resultSafe);
    } catch (err) {
      next(err);
    }
  };

  listarUsuarios = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pagina = parseInt(String(req.query.page || '1'), 10);
    const porPagina = parseInt(String(req.query.perPage || '20'), 10);
    
    const usuarios = await service.listarUsuarios(pagina, porPagina);
    
    // 🔒 Ocultar password_hash de todos los usuarios
    const usuariosSeguros = usuarios.map(usuario => ocultarPasswordHash(usuario));
    
    res.json({
      data: usuariosSeguros,
      pagina,
      porPagina,
      total: usuarios.length
    });
  } catch (err) {
    next(err);
  }
};


}