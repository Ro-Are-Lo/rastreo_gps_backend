# 🚖 Backend - Sistema de Rastreo GPS para Taxis

API REST completa para gestión y monitoreo de flota de taxis.

## 🚀 Configuración en CUALQUIER MÁQUINA

### Método 1: Script Automático (Recomendado)

```bash
# 1. Clonar repositorio
git clone https://github.com/tu-usuario/rastreo-gps-backend.git
cd rastreo-gps-backend

# 2. Cambiar a la rama de implementación
git checkout feature/mi-implementacion-completa

# 3. Ejecutar setup automático
chmod +x scripts/setup.sh
./scripts/setup.sh
```



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



### Método 3: Docker (Más fácil)

**bash**

```
# Solo necesitas Docker instalado
docker-compose up -d
# Listo! El backend corre en http://localhost:3000
```


## 🌐 URLs del Servidor

* **API:** [http://localhost:3000/api](http://localhost:3000/api)
* **Documentación Swagger:** [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
* **Health Check:** [http://localhost:3000/health](http://localhost:3000/health)
* **Estado del sistema:** [http://localhost:3000/](http://localhost:3000/)

## 🧪 Pruebas Automatizadas

**bash**

```
# Ejecutar TODAS las pruebas
npm test

# Pruebas específicas
npm run test:persona      # Módulo Persona
npm run test:usuario      # Módulo Usuario  
npm run test:vehiculo     # Módulo Vehículo
npm run test:coverage     # Con reporte de cobertura
```

## 📁 Estructura del Proyecto

**text**

```
src/
├── modules/          # Módulos organizados
│   ├── auth/        # 🔐 Autenticación JWT
│   ├── persona/     # 👥 Gestión de personas
│   ├── usuario/     # 👤 Usuarios y roles
│   ├── vehiculo/    # 🚗 Vehículos y ubicaciones
│   └── usuarios-completos/ # Usuarios completos
├── shared/          # Utilidades compartidas
├── seed/            # 🌱 Datos de prueba
└── test/            # ✅ Pruebas de integración
```

## 🔧 Variables de Entorno (.env)

**env**

```
DATABASE_URL="postgresql://usuario:password@localhost:5432/rastreo_gps"
JWT_SECRET="tu-clave-secreta-min-32-caracteres"
PORT=3000
```

## 🐳 Docker Compose

**yaml**

```
# Incluye:
# - PostgreSQL 15
# - Backend Node.js
# - Redes configuradas
# - Volúmenes persistentes
```

Para iniciar: `docker-compose up -d`

## 📞 Endpoints Principales

### Autenticación

* `POST /api/auth/login` - Login con JWT
* `GET /api/auth/verify` - Verificar token

### Personas

* `GET /api/personas` - Listar personas
* `POST /api/personas` - Crear persona

### Usuarios

* `GET /api/usuarios` - Listar usuarios
* `POST /api/usuarios-completos` - Crear usuario completo

### Vehículos

* `GET /api/vehiculos` - Listar vehículos
* `POST /api/ubicaciones` - Registrar ubicación GPS

## 🛠️ Comandos Útiles

**bash**

```
npm run dev              # Desarrollo con hot-reload
npm run build           # Compilar para producción
npm start               # Producción
npx prisma studio       # Admin web de la BD
docker-compose logs -f  # Ver logs de Docker
```
