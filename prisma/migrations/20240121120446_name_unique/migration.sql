/*
  Warnings:

  - You are about to drop the column `buildingId` on the `Unit` table. All the data in the column will be lost.
  - You are about to drop the column `currencyId` on the `Unit` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Customers` will be added. If there are existing duplicate values, this will fail.
  - Made the column `firstName` on table `Customers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastName` on table `Customers` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "CurrencyEnum" AS ENUM ('USD', 'LBP', 'EUR');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "UnitType" ADD VALUE 'OFFICE';
ALTER TYPE "UnitType" ADD VALUE 'GYM';
ALTER TYPE "UnitType" ADD VALUE 'RESTAURANT';

-- DropForeignKey
ALTER TABLE "Unit" DROP CONSTRAINT "Unit_buildingId_fkey";

-- DropForeignKey
ALTER TABLE "Unit" DROP CONSTRAINT "Unit_currencyId_fkey";

-- AlterTable
ALTER TABLE "Customers" ALTER COLUMN "firstName" SET NOT NULL,
ALTER COLUMN "lastName" SET NOT NULL;

-- AlterTable
ALTER TABLE "Unit" DROP COLUMN "buildingId",
DROP COLUMN "currencyId",
ADD COLUMN     "currency" "CurrencyEnum" NOT NULL DEFAULT 'USD';

-- CreateIndex
CREATE UNIQUE INDEX "Customers_name_key" ON "Customers"("name");
