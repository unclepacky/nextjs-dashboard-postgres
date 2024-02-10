import prisma from '@/prisma/client';

export async function getContractIdFromExtension(id: string) {
  // Get the ContractId associated with this extensionId
  const extension = await prisma.contractExtension.findUnique({
    where: {
      id: id,
    },
    select: {
      contractId: true,
    },
  });

  const contractId = extension?.contractId as string;

  return contractId;
}
