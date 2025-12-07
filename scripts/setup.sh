#!/bin/bash

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Configurando Backend - Rastreo GPS Taxis${NC}"
echo "================================================"

# 1. Verificar Node.js
echo -e "\n${BLUE}1. Verificando Node.js...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js no está instalado${NC}"
    echo "Instala Node.js desde: https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v)
echo -e "${GREEN}✅ Node.js $NODE_VERSION instalado${NC}"

# 2. Verificar PostgreSQL
echo -e "\n${BLUE}2. Verificando PostgreSQL...${NC}"
if ! command -v psql &> /dev/null; then
    echo -e "${YELLOW}⚠️  PostgreSQL no encontrado${NC}"
    echo "Puedes usar Docker o instalarlo manualmente"
    echo "Docker: docker-compose up -d postgres"
    echo "Manual: https://www.postgresql.org/download/"
else
    echo -e "${GREEN}✅ PostgreSQL detectado${NC}"
fi

# 3. Instalar dependencias
echo -e "\n${BLUE}3. Instalando dependencias...${NC}"
npm ci
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Dependencias instaladas${NC}"
else
    echo -e "${RED}❌ Error instalando dependencias${NC}"
    exit 1
fi

# 4. Configurar variables de entorno
echo -e "\n${BLUE}4. Configurando variables de entorno...${NC}"
if [ ! -f .env ]; then
    if [ -f .env.example ]; then
        cp .env.example .env
        echo -e "${YELLOW}📄 Archivo .env creado desde .env.example${NC}"
        echo -e "${YELLOW}⚠️  Edita el archivo .env con tus credenciales${NC}"
    else
        echo -e "${RED}❌ No se encontró .env.example${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✅ Archivo .env ya existe${NC}"
fi

# 5. Configurar base de datos
echo -e "\n${BLUE}5. Configurando base de datos...${NC}"
if command -v docker &> /dev/null && [ -f docker-compose.yml ]; then
    echo -e "${BLUE}🐳 Usando Docker para la base de datos...${NC}"
    docker-compose up -d postgres
    sleep 5
fi

# 6. Ejecutar migraciones
echo -e "\n${BLUE}6. Ejecutando migraciones...${NC}"
npx prisma migrate dev --name init
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Migraciones aplicadas${NC}"
else
    echo -e "${YELLOW}⚠️  Error en migraciones, intentando generar cliente...${NC}"
    npx prisma generate
fi

# 7. Ejecutar seed de datos
echo -e "\n${BLUE}7. Ejecutando seed de datos...${NC}"
if [ -f "src/seed/seed-completo.ts" ]; then
    npm run seed:completo
    echo -e "${GREEN}✅ Datos de prueba insertados${NC}"
elif [ -f "src/seed/seedPruebapersona/prueba-seed.ts" ]; then
    npm run seed
    echo -e "${GREEN}✅ Datos de prueba insertados${NC}"
else
    echo -e "${YELLOW}⚠️  No se encontró archivo seed${NC}"
fi

echo -e "\n${GREEN}✅ CONFIGURACIÓN COMPLETADA!${NC}"
echo -e "\n${BLUE}📋 COMANDOS DISPONIBLES:${NC}"
echo "  ${GREEN}npm run dev${NC}           # Iniciar servidor de desarrollo"
echo "  ${GREEN}npm test${NC}              # Ejecutar tests"
echo "  ${GREEN}npm run build${NC}         # Compilar para producción"
echo "  ${GREEN}docker-compose up${NC}     # Iniciar con Docker"
echo "  ${GREEN}npx prisma studio${NC}     # Abrir administrador de BD"
echo -e "\n${BLUE}🌐 URLs:${NC}"
echo "  Servidor:    http://localhost:3000"
echo "  Swagger:     http://localhost:3000/api-docs"
echo "  Health:      http://localhost:3000/health"

# 8. Verificar que todo funcione
echo -e "\n${BLUE}8. Verificando instalación...${NC}"
curl -s http://localhost:3000/health > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Servidor funcionando correctamente${NC}"
else
    echo -e "${YELLOW}⚠️  Servidor no responde, inícialo con: npm run dev${NC}"
fi