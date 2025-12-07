// src/config/prisma.ts (si no lo tienes, créalo)
import { PrismaClient } from '@prisma/client';

// Evitar múltiples instancias de Prisma en desarrollo
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'test' 
    ? ['warn', 'error'] 
    : ['query', 'info', 'warn', 'error']
});

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}