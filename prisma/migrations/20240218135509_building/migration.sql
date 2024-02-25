/*
  Warnings:

  - The `building` column on the `Unit` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Building" AS ENUM ('VGI', 'VGII');

-- AlterTable
ALTER TABLE "Unit" DROP COLUMN "building",
ADD COLUMN     "building" "Building" NOT NULL DEFAULT 'VGI';

-- DropEnum
DROP TYPE "Buildings";
