# Backend - Sistema de Rastreo GPS para Taxis

API REST completa para gestión y monitoreo de flota de taxis.

## Configuración en CUALQUIER MÁQUINA

### Método 1: Script Automático (Recomendado)

# 1. Clonar repositorio

git clone https://github.com/tu-usuario/rastreo-gps-backend.git
cd rastreo-gps-backend

# 2. Cambiar a la rama de implementación

git checkout feature/mi-implementacion-completa

# 3. Ejecutar setup automático

chmod +x scripts/setup.sh
./scripts/setup.sh

# Método 2: Manual

# 1. Instalar dependencias

npm install

# 2. Configurar entorno

cp .env.example .env

# EDITAR .env con tu DATABASE_URL

# 3. Configurar base de datos

npx prisma migrate dev
npx prisma generate

# 4. Insertar datos de prueba

npm run seed:completo

# 5. Iniciar servidor

npm run dev
