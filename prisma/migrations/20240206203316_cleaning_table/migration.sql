/*
  Warnings:

  - You are about to drop the column `fromDate` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `fromTime` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `tillTime` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `toDate` on the `Transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "fromDate",
DROP COLUMN "fromTime",
DROP COLUMN "tillTime",
DROP COLUMN "toDate",
ADD COLUMN     "currentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "CleaningLaundry" (
    "id" TEXT NOT NULL,
    "transactionId" TEXT,
    "employeeId" TEXT NOT NULL,
    "cleaningRate" DOUBLE PRECISION NOT NULL,
    "fromTime" TIMESTAMP(3),
    "tillTime" TIMESTAMP(3),
    "timeSpent" TIMESTAMP(3),
    "cleaningTotal" DOUBLE PRECISION NOT NULL,
    "laundryRate" DOUBLE PRECISION NOT NULL,
    "set" DOUBLE PRECISION NOT NULL,
    "totalLaundry" DOUBLE PRECISION NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CleaningLaundry_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CleaningLaundry" ADD CONSTRAINT "CleaningLaundry_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CleaningLaundry" ADD CONSTRAINT "CleaningLaundry_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
