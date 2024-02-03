/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "email" TEXT,
ADD COLUMN     "nationality" TEXT,
ADD COLUMN     "passport" TEXT,
ADD COLUMN     "phone" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Employee_name_key" ON "Employee"("name");
