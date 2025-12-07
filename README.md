<<<<<<< HEAD
## TECONLOGIAS USADAS

- EXPRES
- NODE JS
- PRISMA SECUALIZE
- POSTGRES 18

### COMO LEVANTAR EL PORYECTO

# Backend - Sistema de Rastreo GPS para Taxis

API REST completa para gestión y monitoreo de flota de taxis.

## Configuración 


# 1. Clonar repositorio

git clone https://github.com/tu-usuario/rastreo-gps-backend.git

cd rastreo-gps-backend

# 2. Instalar dependencias

npm install

# EDITAR .env con tu DATABASE_URL
   NORA QUI SE MODIFICA EL ENV. SEGUN TU CONFIGURACION DE POSTGRESQL
   
# 3. Configurar base de datos

npx prisma migrate dev
npx prisma generate

# 4. Insertar datos de prueba

npm run seed:completo

# 5. Iniciar servidor

npm run dev
