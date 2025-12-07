// src/modules/auth/auth.routes.ts
import { Router } from 'express';
import { AuthController } from './auth.controller';
import { authMiddleware } from '../../shared/middlewares/auth.middleware';

const router = Router();
const controller = new AuthController();

// Login público
router.post('/login', controller.login.bind(controller));

// Verificar token
router.get('/verify', controller.verify.bind(controller));

// Perfil (requiere autenticación)
router.get('/profile', authMiddleware, controller.profile.bind(controller));

export default router;