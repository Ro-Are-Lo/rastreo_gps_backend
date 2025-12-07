//src/shared/middlewares/role.middleware.ts
import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.middleware';

/**
 * checkRole(['admin','controlador'])
 * devuelve un middleware que verifica que req.user.roles contenga al menos uno de los roles permitidos
 */


export const checkRole = (allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const userRoles: string[] = req.user?.roles || [];
    
    if (!Array.isArray(userRoles) || userRoles.length === 0) {
      return res.status(403).json({ error: 'No autorizado: sin roles' });
    }

    // Convertir todo a minúsculas para comparación case-insensitive
    const userRolesLower = userRoles.map(r => r.toLowerCase());
    const allowedRolesLower = allowedRoles.map(r => r.toLowerCase());
    
    const hasRole = userRolesLower.some(r => allowedRolesLower.includes(r));
    
    if (!hasRole) {
      return res.status(403).json({ error: 'No autorizado: rol insuficiente' });
    }

    next();
  };
};