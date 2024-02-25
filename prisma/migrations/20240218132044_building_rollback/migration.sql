/*
  Warnings:

  - You are about to drop the `Building` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Property` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Buildings" AS ENUM ('VGI', 'VGII');

-- DropForeignKey
ALTER TABLE "Building" DROP CONSTRAINT "Building_propertyId_fkey";

-- AlterTable
ALTER TABLE "Unit" ADD COLUMN     "building" "Buildings" NOT NULL DEFAULT 'VGI';

-- DropTable
DROP TABLE "Building";

-- DropTable
DROP TABLE "Property";
