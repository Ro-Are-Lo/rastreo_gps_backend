-- CreateTable
CREATE TABLE "Persona" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido_paterno" TEXT,
    "apellido_materno" TEXT,
    "genero" TEXT,
    "foto_url" TEXT,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_modificacion" TIMESTAMP(3),
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "eliminado" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Persona_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Documento" (
    "id" SERIAL NOT NULL,
    "id_persona" INTEGER NOT NULL,
    "tipo_documento" TEXT NOT NULL,
    "nro_documento" TEXT NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_modificacion" TIMESTAMP(3),
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "eliminado" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Documento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "id_persona" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_modificacion" TIMESTAMP(3),
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "eliminado" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contacto" (
    "id" SERIAL NOT NULL,
    "id_persona" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_modificacion" TIMESTAMP(3),
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "eliminado" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Contacto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rol" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_modificacion" TIMESTAMP(3),
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "eliminado" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Rol_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsuarioRol" (
    "id_usuario" INTEGER NOT NULL,
    "id_rol" INTEGER NOT NULL,

    CONSTRAINT "UsuarioRol_pkey" PRIMARY KEY ("id_usuario","id_rol")
);

-- CreateTable
CREATE TABLE "Vehiculo" (
    "id" SERIAL NOT NULL,
    "placa" TEXT NOT NULL,
    "modelo" TEXT,
    "anio" INTEGER,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_modificacion" TIMESTAMP(3),
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "eliminado" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Vehiculo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Asignacion" (
    "id" SERIAL NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "id_vehiculo" INTEGER NOT NULL,
    "fecha_inicio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_fin" TIMESTAMP(3),
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_modificacion" TIMESTAMP(3),
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "eliminado" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Asignacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Conexion" (
    "id" SERIAL NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "id_vehiculo" INTEGER NOT NULL,
    "conectado_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "desconectado_at" TIMESTAMP(3),
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "ip" TEXT,
    "sesion_dispositivo" TEXT,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_modificacion" TIMESTAMP(3),
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "eliminado" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Conexion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ubicacion" (
    "id" SERIAL NOT NULL,
    "id_vehiculo" INTEGER NOT NULL,
    "fecha_hora" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "latitud" DOUBLE PRECISION NOT NULL,
    "longitud" DOUBLE PRECISION NOT NULL,
    "velocidad_kmh" DOUBLE PRECISION,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_modificacion" TIMESTAMP(3),
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "eliminado" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Ubicacion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Persona_activo_idx" ON "Persona"("activo");

-- CreateIndex
CREATE INDEX "Persona_eliminado_idx" ON "Persona"("eliminado");

-- CreateIndex
CREATE UNIQUE INDEX "Documento_nro_documento_key" ON "Documento"("nro_documento");

-- CreateIndex
CREATE INDEX "Documento_id_persona_idx" ON "Documento"("id_persona");

-- CreateIndex
CREATE INDEX "Documento_tipo_documento_idx" ON "Documento"("tipo_documento");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_id_persona_key" ON "Usuario"("id_persona");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_username_key" ON "Usuario"("username");

-- CreateIndex
CREATE INDEX "Usuario_id_persona_idx" ON "Usuario"("id_persona");

-- CreateIndex
CREATE INDEX "Usuario_activo_idx" ON "Usuario"("activo");

-- CreateIndex
CREATE INDEX "Usuario_eliminado_idx" ON "Usuario"("eliminado");

-- CreateIndex
CREATE INDEX "Contacto_id_persona_idx" ON "Contacto"("id_persona");

-- CreateIndex
CREATE INDEX "Contacto_tipo_idx" ON "Contacto"("tipo");

-- CreateIndex
CREATE UNIQUE INDEX "Rol_nombre_key" ON "Rol"("nombre");

-- CreateIndex
CREATE INDEX "Rol_activo_idx" ON "Rol"("activo");

-- CreateIndex
CREATE INDEX "Rol_eliminado_idx" ON "Rol"("eliminado");

-- CreateIndex
CREATE INDEX "UsuarioRol_id_usuario_idx" ON "UsuarioRol"("id_usuario");

-- CreateIndex
CREATE INDEX "UsuarioRol_id_rol_idx" ON "UsuarioRol"("id_rol");

-- CreateIndex
CREATE UNIQUE INDEX "Vehiculo_placa_key" ON "Vehiculo"("placa");

-- CreateIndex
CREATE INDEX "Vehiculo_activo_idx" ON "Vehiculo"("activo");

-- CreateIndex
CREATE INDEX "Vehiculo_eliminado_idx" ON "Vehiculo"("eliminado");

-- CreateIndex
CREATE INDEX "Asignacion_id_usuario_idx" ON "Asignacion"("id_usuario");

-- CreateIndex
CREATE INDEX "Asignacion_id_vehiculo_idx" ON "Asignacion"("id_vehiculo");

-- CreateIndex
CREATE INDEX "Asignacion_activo_idx" ON "Asignacion"("activo");

-- CreateIndex
CREATE INDEX "Conexion_id_usuario_idx" ON "Conexion"("id_usuario");

-- CreateIndex
CREATE INDEX "Conexion_id_vehiculo_idx" ON "Conexion"("id_vehiculo");

-- CreateIndex
CREATE INDEX "Conexion_estado_idx" ON "Conexion"("estado");

-- CreateIndex
CREATE INDEX "Ubicacion_id_vehiculo_idx" ON "Ubicacion"("id_vehiculo");

-- CreateIndex
CREATE INDEX "Ubicacion_fecha_hora_idx" ON "Ubicacion"("fecha_hora");

-- AddForeignKey
ALTER TABLE "Documento" ADD CONSTRAINT "Documento_id_persona_fkey" FOREIGN KEY ("id_persona") REFERENCES "Persona"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_id_persona_fkey" FOREIGN KEY ("id_persona") REFERENCES "Persona"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contacto" ADD CONSTRAINT "Contacto_id_persona_fkey" FOREIGN KEY ("id_persona") REFERENCES "Persona"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioRol" ADD CONSTRAINT "UsuarioRol_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioRol" ADD CONSTRAINT "UsuarioRol_id_rol_fkey" FOREIGN KEY ("id_rol") REFERENCES "Rol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asignacion" ADD CONSTRAINT "Asignacion_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asignacion" ADD CONSTRAINT "Asignacion_id_vehiculo_fkey" FOREIGN KEY ("id_vehiculo") REFERENCES "Vehiculo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conexion" ADD CONSTRAINT "Conexion_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conexion" ADD CONSTRAINT "Conexion_id_vehiculo_fkey" FOREIGN KEY ("id_vehiculo") REFERENCES "Vehiculo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ubicacion" ADD CONSTRAINT "Ubicacion_id_vehiculo_fkey" FOREIGN KEY ("id_vehiculo") REFERENCES "Vehiculo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
