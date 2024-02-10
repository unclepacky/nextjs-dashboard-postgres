/*
  Warnings:

  - You are about to drop the `CleaningLaundry` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CleaningLaundry" DROP CONSTRAINT "CleaningLaundry_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "CleaningLaundry" DROP CONSTRAINT "CleaningLaundry_transactionId_fkey";

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "fromTime" TIMESTAMP(3),
ADD COLUMN     "tillTime" TIMESTAMP(3);

-- DropTable
DROP TABLE "CleaningLaundry";
