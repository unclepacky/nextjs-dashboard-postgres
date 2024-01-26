/*
  Warnings:

  - The values [RESERVED] on the enum `ContractType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ContractType_new" AS ENUM ('INQUIRY', 'ACTIVE', 'INACTIVE', 'RELEASED', 'RESERVATION');
ALTER TABLE "Contract" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "Contract" ALTER COLUMN "type" TYPE "ContractType_new" USING ("type"::text::"ContractType_new");
ALTER TYPE "ContractType" RENAME TO "ContractType_old";
ALTER TYPE "ContractType_new" RENAME TO "ContractType";
DROP TYPE "ContractType_old";
ALTER TABLE "Contract" ALTER COLUMN "type" SET DEFAULT 'INACTIVE';
COMMIT;

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "TransactionType" ADD VALUE 'CREDIT';
ALTER TYPE "TransactionType" ADD VALUE 'DEBIT';
ALTER TYPE "TransactionType" ADD VALUE 'TRANSFER';
