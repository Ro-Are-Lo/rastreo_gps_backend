<<<<<<< HEAD
## TECONLOGIAS USADAS

- EXPRES
- NODE JS
- PRISMA SECUALIZE
- POSTGRES 18

### COMO LEVANTAR EL PORYECTO

1. clonar el repositorio

   ```
   git clone https://github.com/Ro-Are-Lo/rastreo_gps_backend.git
   ```
2. installar las dependecias

   ```
   npm install
   ```
3. ejecutar posgres sql si no lo tiene pateado PATH

   ```
   $env:Path += ";C:\Program Files\PostgreSQL\18\bin"
   ```
4. crear las .env
   NOTA= moditficar el usario y contrasena segun su configuracion

```
@"
PORT=3000
DATABASE_URL="postgresql://postgres:root@localhost:5432/gps_db?schema=public"
JWT_SECRET=supersecret
"@ | Out-File -FilePath ".env"
```

5. crear la base ded datos

```
$env:PGPASSWORD = "TU_CONTRASENA"
```

```
psql -h localhost -p 5432 -U postgres -c 'CREATE DATABASE "gps_db";'
```

6. hacer las migraciones

- codigo 1

  ```
  $env:DATABASE_URL="postgresql://postgres:root@localhost:5432/gps_db?schema=public"
  ```

  codggo 2

  ```
  npx prisma migrate dev
  ```

7 correr los seeds

```
 npm run seed
```

8 correr el proyecto

```
npm run dev
```
=======
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
>>>>>>> backend_3er_par
