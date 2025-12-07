// src/modules/usuarios-completos/controllers/usuario-completo.controller.ts - VERSIÓN CORREGIDA
import { Request, Response, NextFunction } from 'express';
import { UsuarioCompletoService } from '../services/usuario-completo.service';
import { CrearUsuarioCompletoDto } from '../dtos/crear-usuario-completo.dto';
import { ActualizarUsuarioCompletoDto } from '../dtos/actualizar-usuario-completo.dto';
import { FiltrosUsuarioCompletoDto } from '../dtos/filtros-usuario-completo.dto';
import { validateBody } from '../../../shared/middlewares/validate.middleware';


const usuarioCompletoService = new UsuarioCompletoService();

export class UsuarioCompletoController {
  private service: UsuarioCompletoService;

  constructor() {
    this.service = new UsuarioCompletoService();
  }

  // POST /api/usuarios-completos
  async crear(req: Request, res: Response, next: NextFunction) {
    try {
      // Usar tu middleware de validación
      const validationMiddleware = validateBody(CrearUsuarioCompletoDto);
      
      await new Promise<void>((resolve, reject) => {
        validationMiddleware(req, res, (err?: any) => {
          if (err) return reject(err);
          resolve();
        });
      });

      const resultado = await this.service.crear(req.body);
      
      res.status(201).json({
        success: true,
        message: 'Usuario creado exitosamente',
        data: resultado
      });
    } catch (error: any) {
      // Si ya es una respuesta HTTP (del middleware), enviarla
      if (error.statusCode) {
        return res.status(error.statusCode).json(error);
      }
      next(error);
    }
  }

  // GET /api/usuarios-completos/:id
  async obtenerPorId(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'ID inválido'
        });
      }

      const usuario = await this.service.obtenerPorId(id);
      
      res.json({
        success: true,
        data: usuario
      });
    } catch (error: any) {
      if (error.message === 'Usuario no encontrado') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }
      next(error);
    }
  }

  // GET /api/usuarios-completos

   async listar(req: Request, res: Response) {
    try {
      console.log('📥 [Controller] Listar usuarios - Query:', req.query);
      
      // Convertir query params
      const filtros: FiltrosUsuarioCompletoDto = {
        search: req.query.search as string || '',
        rol: req.query.rol as string || '',
        activo: req.query.activo !== undefined ? (req.query.activo === 'true') : true,
        page: req.query.page ? parseInt(req.query.page as string) : 1,
        limit: req.query.limit ? parseInt(req.query.limit as string) : 50
      };
      
      console.log('📋 [Controller] Filtros procesados:', filtros);
      
      // 🔥 LLAMAR AL SERVICE (ahora está definido)
      const resultado = await usuarioCompletoService.listar(filtros);
      
      console.log('📤 [Controller] Resultado:', {
        success: resultado.success,
        dataLength: resultado.data?.length || 0,
        total: resultado.meta?.total || 0
      });
      
      return res.json(resultado);
      
    } catch (error: any) { // 🔥 TIPAR EL ERROR
      console.error('🔥 [Controller] Error:', error);
      return res.status(500).json({
        success: false,
        error: error.message,
        message: 'Error interno del servidor'
      });
    }
  }
  


  // PUT /api/usuarios-completos/:id
  async actualizar(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'ID inválido'
        });
      }

      // Usar tu middleware de validación
      const validationMiddleware = validateBody(ActualizarUsuarioCompletoDto);
      
      await new Promise<void>((resolve, reject) => {
        validationMiddleware(req, res, (err?: any) => {
          if (err) return reject(err);
          resolve();
        });
      });

      const usuario = await this.service.actualizar(id, req.body);
      
      res.json({
        success: true,
        message: 'Usuario actualizado exitosamente',
        data: usuario
      });
    } catch (error: any) {
      if (error.message === 'Usuario no encontrado') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }
      next(error);
    }
  }

  // DELETE /api/usuarios-completos/:id (eliminación lógica)
  async eliminar(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'ID inválido'
        });
      }

      await this.service.eliminar(id);
      
      res.json({
        success: true,
        message: 'Usuario eliminado exitosamente'
      });
    } catch (error: any) {
      if (error.message === 'Usuario no encontrado') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }
      next(error);
    }
  }

  // PATCH /api/usuarios-completos/:id/reactivar
  async reactivar(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'ID inválido'
        });
      }

      await this.service.reactivar(id);
      
      res.json({
        success: true,
        message: 'Usuario reactivado exitosamente'
      });
    } catch (error: any) {
      if (error.message === 'Usuario no encontrado') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }
      next(error);
    }
  }
}