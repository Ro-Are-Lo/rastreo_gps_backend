// src/shared/utils/jwt.ts (COMPLETO CORREGIDO)
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh_secret';

export function generarToken(payload: object): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
}

export function generarRefreshToken(payload: object): string {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '7d' });
}

export function verificarToken(token: string): any {
  return jwt.verify(token, JWT_SECRET);
}

export function verificarRefreshToken(token: string): any {
  return jwt.verify(token, JWT_REFRESH_SECRET);
}