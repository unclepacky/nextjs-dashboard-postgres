import prisma from '@/prisma/client';

interface FormateDatesToCompareProps {
  startDate: Date | string;
  endDate: Date | string;
  existingStartDate: Date | string | undefined;
  exisitingEndDate: Date | string | undefined;
}

export async function isFirstExt(id: string) {
  let startDate: Date | undefined;

  const latestContractExtension = await prisma.contractExtension.findFirst({
    where: {
      contractId: id,
    },
    orderBy: {
      createdAt: 'desc', // Assuming 'createdAt' is the relevant timestamp
    },
    include: {
      contract: true,
    },
  });

  if (latestContractExtension) {
    startDate = latestContractExtension.endDate;
  } else {
    const contract = await prisma.contract.findUnique({
      where: {
        id: id,
      },
    });
    startDate = contract?.startDate;
  }

  return startDate;
}

export function ConvertDateToInputCompatible(date: Date) {
  return date?.toISOString().split('T')[0];
}

export function FormateDatesToCompare({
  startDate,
  endDate,
  existingStartDate,
  exisitingEndDate,
}: FormateDatesToCompareProps) {
  const formatDateString = (date: Date | string | undefined): string => {
    return new Date(date ?? new Date()).toISOString().split('T')[0];
  };

  const formatedDate = {
    startDate: formatDateString(startDate),
    existingStartDate: formatDateString(existingStartDate),
    endDate: formatDateString(endDate),
    exisitingEndDate: formatDateString(exisitingEndDate),
  };

  return formatedDate;
}

export function differenceOfDates(fromDate: Date, toDate: Date): number {
  // Assuming unit.contract[0].contractExtension[0]?.endDate and
  // unit.contract[0].contractExtension[0]?.startDate are valid date strings.

  const startDate = new Date(fromDate);
  const endDate = new Date(toDate);

  // Calculate the difference in milliseconds
  const differenceInMilliseconds = endDate.getTime() - startDate.getTime();

  // Convert the difference from milliseconds to days
  const differenceInDays = differenceInMilliseconds / (1000 * 3600 * 24);

  return differenceInDays;
}
