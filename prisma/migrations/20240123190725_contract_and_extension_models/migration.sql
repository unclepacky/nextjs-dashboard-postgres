/*
  Warnings:

  - You are about to drop the column `amount` on the `Contract` table. All the data in the column will be lost.
  - You are about to drop the column `deposit` on the `Contract` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Contract` table without a default value. This is not possible if the table is not empty.
  - Made the column `customerId` on table `Contract` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updateAt` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "TransactionType" ADD VALUE 'INTERNET';

-- DropForeignKey
ALTER TABLE "Contract" DROP CONSTRAINT "Contract_currencyId_fkey";

-- DropForeignKey
ALTER TABLE "Contract" DROP CONSTRAINT "Contract_customerId_fkey";

-- AlterTable
ALTER TABLE "Contract" DROP COLUMN "amount",
DROP COLUMN "deposit",
ADD COLUMN     "dailyAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "isDaily" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "monthlyAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "newMonthlyAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "type" SET DEFAULT 'INACTIVE',
ALTER COLUMN "endDate" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "currencyId" DROP NOT NULL,
ALTER COLUMN "customerId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Customers" ALTER COLUMN "nationality" SET DEFAULT 'Lebanon';

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "description",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "extensionId" TEXT,
ADD COLUMN     "fromDate" TIMESTAMP(3),
ADD COLUMN     "fromTime" TIMESTAMP(3),
ADD COLUMN     "tillTime" TIMESTAMP(3),
ADD COLUMN     "toDate" TIMESTAMP(3),
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "amount" SET DEFAULT 0;

-- CreateTable
CREATE TABLE "ContractExtension" (
    "id" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "isDaily" BOOLEAN NOT NULL DEFAULT false,
    "dailyAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "monthlyAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "contractId" TEXT NOT NULL,

    CONSTRAINT "ContractExtension_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_extensionId_fkey" FOREIGN KEY ("extensionId") REFERENCES "ContractExtension"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContractExtension" ADD CONSTRAINT "ContractExtension_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
