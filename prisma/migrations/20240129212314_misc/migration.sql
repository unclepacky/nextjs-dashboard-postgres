-- DropForeignKey
ALTER TABLE "ContractExtension" DROP CONSTRAINT "ContractExtension_contractId_fkey";

-- AddForeignKey
ALTER TABLE "ContractExtension" ADD CONSTRAINT "ContractExtension_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE CASCADE ON UPDATE CASCADE;
