-- CreateEnum
CREATE TYPE "Department" AS ENUM ('RECEPTION', 'MAINTENANCE', 'CLEANING');

-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "department" "Department" NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);
