// src/config/prisma.ts
import { PrismaClient } from '@prisma/client';

// Creando un cliente global para evitar multiples instancias
export const prisma = new PrismaClient();
