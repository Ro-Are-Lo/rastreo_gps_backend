# Dockerfile.dev
FROM node:18-alpine

WORKDIR /app

# Instalar dependencias del sistema
RUN apk add --no-cache openssl python3 make g++

# Copiar archivos de dependencias
COPY package*.json ./
COPY prisma ./prisma/

# Instalar dependencias
RUN npm ci

# Generar cliente Prisma
RUN npx prisma generate

# Copiar código fuente
COPY . .

# Puerto
EXPOSE 3000

# Comando de desarrollo
CMD ["npm", "run", "dev"]