-- CreateTable
CREATE TABLE "Rol" (
    "rol_id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Rol_pkey" PRIMARY KEY ("rol_id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "usuario_id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido_paterno" TEXT,
    "apellido_materno" TEXT,
    "cedula_identidad" TEXT NOT NULL,
    "nacionalidad" TEXT,
    "genero" TEXT,
    "licencia_numero" TEXT,
    "licencia_categoria" TEXT,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "foto_url" TEXT,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("usuario_id")
);

-- CreateTable
CREATE TABLE "UsuarioRol" (
    "usuario_id" INTEGER NOT NULL,
    "rol_id" INTEGER NOT NULL,

    CONSTRAINT "UsuarioRol_pkey" PRIMARY KEY ("usuario_id","rol_id")
);

-- CreateTable
CREATE TABLE "CorreoUsuario" (
    "correo_id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "correo" TEXT NOT NULL,

    CONSTRAINT "CorreoUsuario_pkey" PRIMARY KEY ("correo_id")
);

-- CreateTable
CREATE TABLE "TelefonoUsuario" (
    "telefono_id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "telefono" TEXT NOT NULL,

    CONSTRAINT "TelefonoUsuario_pkey" PRIMARY KEY ("telefono_id")
);

-- CreateTable
CREATE TABLE "Vehiculo" (
    "vehicle_id" SERIAL NOT NULL,
    "placa" TEXT NOT NULL,
    "modelo" TEXT,
    "anio" INTEGER,

    CONSTRAINT "Vehiculo_pkey" PRIMARY KEY ("vehicle_id")
);

-- CreateTable
CREATE TABLE "Asignacion" (
    "asignacion_id" SERIAL NOT NULL,
    "vehicle_id" INTEGER NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "fecha_inicio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_fin" TIMESTAMP(3),

    CONSTRAINT "Asignacion_pkey" PRIMARY KEY ("asignacion_id")
);

-- CreateTable
CREATE TABLE "Conexion" (
    "connection_id" SERIAL NOT NULL,
    "vehicle_id" INTEGER NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "connected_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "disconnected_at" TIMESTAMP(3),
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "ip" TEXT,
    "user_agent" TEXT,

    CONSTRAINT "Conexion_pkey" PRIMARY KEY ("connection_id")
);

-- CreateTable
CREATE TABLE "Ubicacion" (
    "location_id" SERIAL NOT NULL,
    "vehicle_id" INTEGER NOT NULL,
    "fecha_hora" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "latitud" DOUBLE PRECISION NOT NULL,
    "longitud" DOUBLE PRECISION NOT NULL,
    "velocidad_kmh" DOUBLE PRECISION,

    CONSTRAINT "Ubicacion_pkey" PRIMARY KEY ("location_id")
);



-- Habilitar la extensión PostGIS
CREATE EXTENSION IF NOT EXISTS postgis;

-- Agregar columna geográfica a la tabla Ubicacion (si no existe)
ALTER TABLE "Ubicacion"
ADD COLUMN IF NOT EXISTS posicion geography(Point, 4326);

-- Actualizar la columna posicion con latitud/longitud existentes (opcional)
UPDATE "Ubicacion"
SET posicion = ST_SetSRID(ST_MakePoint(longitud, latitud), 4326)
WHERE posicion IS NULL;

-- Crear índice GIST para consultas espaciales rápidas
CREATE INDEX IF NOT EXISTS idx_posicion_gix
ON "Ubicacion" USING GIST(posicion);

-- Crear índice compuesto vehicle_id + fecha_hora para consultas rápidas
CREATE INDEX IF NOT EXISTS idx_ubicacion_vehicle_fecha
ON "Ubicacion"(vehicle_id, fecha_hora DESC);




-- CreateIndex
CREATE UNIQUE INDEX "Rol_nombre_key" ON "Rol"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_username_key" ON "Usuario"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_cedula_identidad_key" ON "Usuario"("cedula_identidad");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_licencia_numero_key" ON "Usuario"("licencia_numero");

-- CreateIndex
CREATE UNIQUE INDEX "CorreoUsuario_correo_key" ON "CorreoUsuario"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "Vehiculo_placa_key" ON "Vehiculo"("placa");

-- AddForeignKey
ALTER TABLE "UsuarioRol" ADD CONSTRAINT "UsuarioRol_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioRol" ADD CONSTRAINT "UsuarioRol_rol_id_fkey" FOREIGN KEY ("rol_id") REFERENCES "Rol"("rol_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CorreoUsuario" ADD CONSTRAINT "CorreoUsuario_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TelefonoUsuario" ADD CONSTRAINT "TelefonoUsuario_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asignacion" ADD CONSTRAINT "Asignacion_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "Vehiculo"("vehicle_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asignacion" ADD CONSTRAINT "Asignacion_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conexion" ADD CONSTRAINT "Conexion_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "Vehiculo"("vehicle_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conexion" ADD CONSTRAINT "Conexion_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ubicacion" ADD CONSTRAINT "Ubicacion_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "Vehiculo"("vehicle_id") ON DELETE RESTRICT ON UPDATE CASCADE;
