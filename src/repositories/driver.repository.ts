/*
Capa de acceso a datos

Aquí se maneja todo lo relacionado con la base de datos:
consultas SQL, ORM (Sequelize, Prisma), o incluso APIs externas.

/ Acceso a los datos de los conductores

ORM 

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class DriverRepository {
  async getAll() {
    // Ya no escribes SQL, Prisma lo genera automáticamente
    return await prisma.driver.findMany();
  }

  async create(driverData: { name: string; carPlate: string }) {
    return await prisma.driver.create({ data: driverData });
  }
}
*/
