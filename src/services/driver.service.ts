/*
Capa de lógica de negocio

Aquí se implementan las reglas del negocio, validaciones, cálculos, filtros, condiciones, etc.
Esta capa llama a los repositories para acceder a datos.

/ Lógica de negocio relacionada con los conductores
import { DriverRepository } from '../repositories/driver.repository';
import { Driver } from '../models/driver.model';

export class DriverService {
  private repository = new DriverRepository();

  async getAllDrivers(): Promise<Driver[]> {
    // Aquí podrías aplicar lógica como filtrar solo los que están activos
    return this.repository.getAll();
  }

  async createDriver(driver: Driver): Promise<Driver> {
    // Validar si el conductor ya existe antes de crearlo
    const all = await this.repository.getAll();
    const exists = all.find(d => d.carPlate === driver.carPlate);
    if (exists) throw new Error('Conductor ya registrado');
    
    return this.repository.create(driver);
  }
}
*/