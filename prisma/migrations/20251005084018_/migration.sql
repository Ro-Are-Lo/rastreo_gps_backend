/*
  Warnings:

  - You are about to drop the column `posicion` on the `Ubicacion` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."idx_posicion_gix";

-- DropIndex
DROP INDEX "public"."idx_ubicacion_vehicle_fecha";

-- AlterTable
ALTER TABLE "Ubicacion" DROP COLUMN "posicion";
