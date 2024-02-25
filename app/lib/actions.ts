'use server';

import prisma from '@/prisma/client';
import {
  Block,
  ContractType,
  CurrencyEnum,
  CustomerStatus,
  CustomerType,
  Department,
  TransactionType,
  UnitStatus,
  UnitType,
} from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { FormateDatesToCompare } from './dates';
import { getContractIdFromExtension } from './utilFunctions';

// **********************************************************************
// CUSTOMER
// **********************************************************************
interface CustomerUpdateData {
  name?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  type?: CustomerType;
  nationality?: string;
  passport?: string;
  address?: string;
  occupation?: string;
  status?: CustomerStatus;
}
interface UnitUpdateData {
  name?: string;
  monthlyRate?: number;
  dailyRate?: number;
  type?: UnitType;
  status?: UnitStatus;
  block?: Block;
  currency?: CurrencyEnum;
}
interface ContractUpdateData {
  type?: ContractType;
  startDate?: Date;
  endDate?: Date;
  isDaily?: boolean;
  dailyAmount?: number;
  monthlyAmount?: number;
  newMonthlyAmount?: number;
  currency?: CurrencyEnum;
  unitId?: string;
  customerId?: string;
}
interface ExtensionUpdateData {
  startDate?: Date;
  endDate?: Date;
  currency?: CurrencyEnum;
  dailyAmount?: number;
  monthlyAmount?: number;
  isDaily?: boolean;
  contractId?: string;
}

export async function addCustomer(formData: FormData) {
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const phone = formData.get('phone') as string;
  const email = formData.get('email') as string;
  const type = formData.get('type') as CustomerType;
  const nationality = formData.get('nationality') as string;
  const passport = formData.get('passport') as string;

  const newCustomer = await prisma.customers.create({
    data: {
      name: firstName + ' ' + lastName,
      firstName: firstName,
      lastName: lastName,
      email: email,
      nationality: nationality,
      passport: passport,
      type: type,
      phone: phone,
    },
  });
  revalidatePath('/dashboard/customers');
  redirect('/dashboard/customers');
}

export async function deleteCustomer(id: string) {
  const customer = await prisma.customers.delete({
    where: {
      id: id,
    },
  });

  revalidatePath('/dashboard/customers');
}

export async function viewCustomer(id: string) {
  const customer = await prisma.customers.findUnique({
    where: {
      id: id,
    },
  });

  revalidatePath('/dashboard/customers');
  redirect(`/dashboard/customers/view/${id}`);
}

export async function editCustomer(id: string, formData: FormData) {
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const phone = formData.get('phone') as string;
  const email = formData.get('email') as string;
  const type = formData.get('type') as CustomerType;
  const nationality = formData.get('nationality') as string;
  let passport = formData.get('passport') as string | null;
  let address = formData.get('address') as string | null;
  let occupation = formData.get('occupation') as string | null;
  const status = formData.get('status') as CustomerStatus;

  const existingCustomer = await prisma.customers.findUnique({
    where: {
      id: id,
    },
  });

  // Convert empty strings or undefined values to null
  // passport = passport !== null && passport.trim() !== '' ? passport : null;
  // address = address !== null && address.trim() !== '' ? address : null;

  if (!passport) {
    passport = null;
  }
  if (!address) {
    address = null;
  }
  if (!occupation) {
    occupation = null;
  }
  const updateData: CustomerUpdateData = {};

  // Compare each field and prepare the update object
  if (firstName !== existingCustomer?.firstName) {
    updateData.firstName = firstName;
    updateData.name = firstName + ' ' + lastName;
  }
  if (lastName !== existingCustomer?.lastName) {
    updateData.lastName = lastName;
    updateData.name = firstName + ' ' + lastName;
  }

  if (phone !== existingCustomer?.phone) {
    updateData.phone = formData.get('phone') as string;
  }
  if (email !== existingCustomer?.email) {
    updateData.email = formData.get('email') as string;
  }
  if (type !== existingCustomer?.type) {
    updateData.type = formData.get('type') as CustomerType;
  }
  if (nationality !== existingCustomer?.nationality) {
    updateData.nationality = formData.get('nationality') as string;
  }
  if (passport !== existingCustomer?.passport) {
    updateData.passport = formData.get('passport') as string;
  }
  if (address !== existingCustomer?.address) {
    updateData.address = formData.get('address') as string;
  }
  if (occupation !== existingCustomer?.occupation) {
    updateData.occupation = formData.get('occupation') as string;
  }
  if (status !== existingCustomer?.status) {
    updateData.status = formData.get('status') as CustomerStatus;
  }

  // Perform the update if there are changes
  if (Object.keys(updateData).length > 0) {
    console.log('LENGHT > 0', { updateData });
    await prisma.customers.update({
      where: { id },
      data: updateData,
    });
  } else {
    console.log({ updateData });
  }

  revalidatePath(`/dashboard/customers`);
  redirect(`/dashboard/customers`);
}

export async function addUnit(formData: FormData) {
  console.log(formData);
  const unitName = formData.get('unitName') as string;
  const monthlyRate = Number(formData.get('monthlyRate'));
  const dailyRate = Number(formData.get('dailyRate'));
  const type = formData.get('type') as UnitType;
  const block = formData.get('block') as Block;
  const currency = formData.get('currency') as CurrencyEnum;
  const status = formData.get('status') as UnitStatus;

  const newCustomer = await prisma.unit.create({
    data: {
      name: unitName,
      block: block,
      currency: currency,
      dailyRate: dailyRate,
      monthlyRate: monthlyRate,
      status: status,
      type: type,
    },
  });
  revalidatePath('/dashboard/units/create');
  redirect('/dashboard/units');
}

export async function editUnit(id: string, formData: FormData) {
  const name = formData.get('name') as string;
  const monthlyRate = Number(formData.get('monthlyRate'));
  const dailyRate = Number(formData.get('dailyRate'));
  const type = formData.get('type') as UnitType;
  const block = formData.get('block') as Block;
  const currency = formData.get('currency') as CurrencyEnum;
  const status = formData.get('status') as UnitStatus;

  const existingUnit = await prisma.unit.findUnique({
    where: {
      id: id,
    },
  });

  const updateData: UnitUpdateData = {};

  // Compare each field and prepare the update object
  if (name !== existingUnit?.name) {
    updateData.name = name;
  }

  if (monthlyRate !== existingUnit?.monthlyRate) {
    updateData.monthlyRate = monthlyRate;
  }
  if (dailyRate !== existingUnit?.dailyRate) {
    updateData.dailyRate = dailyRate;
  }
  if (type !== existingUnit?.type) {
    updateData.type = type;
  }
  if (block !== existingUnit?.block) {
    updateData.block = block;
  }
  if (currency !== existingUnit?.currency) {
    updateData.currency = currency;
  }

  if (status !== existingUnit?.status) {
    updateData.status = status;
  }

  // Perform the update if there are changes
  if (Object.keys(updateData).length > 0) {
    console.log('LENGHT > 0', { updateData });
    await prisma.unit.update({
      where: { id },
      data: updateData,
    });
  } else {
    console.log({ updateData });
  }

  revalidatePath(`/dashboard/units/edit/${id}`);
  redirect(`/dashboard/units`);
}

export async function deleteUnit(id: string) {
  const customer = await prisma.unit.delete({
    where: {
      id: id,
    },
  });

  revalidatePath('/dashboard/units');
}

export async function deleteContract(id: string) {
  const contract = await prisma.contract.delete({
    where: {
      id: id,
    },
  });

  revalidatePath('/dashboard/contracts');
}

export async function addContract(formData: FormData) {
  console.log(formData);

  const type = formData.get('type') as ContractType;
  const unitId = formData.get('unitId') as string;
  const customerId = formData.get('customerId') as string;
  const currency = formData.get('currency') as CurrencyEnum;
  const startDate = new Date(formData.get('startDate') as string);
  const endDate = new Date(formData.get('endDate') as string);
  const dailyRate = Number(formData.get('dailyRate'));
  const monthlyRate = Number(formData.get('monthlyRate'));
  const isDaily = formData.get('isDaily') === 'on';

  // const firstName = formData.get('firstName') as string;
  // const lastName = formData.get('lastName') as string;
  // const phone = formData.get('phone') as string;
  // const email = formData.get('email') as string;
  // const nationality = formData.get('nationality') as string;
  // const passport = formData.get('passport') as string;

  const newCustomer = await prisma.contract.create({
    data: {
      currency: currency,
      customerId: customerId,
      unitId: unitId,
      type: type,
      dailyAmount: dailyRate,
      monthlyAmount: monthlyRate,
      startDate: startDate,
      endDate: endDate,
      isDaily: isDaily,
      newMonthlyAmount: monthlyRate,
    },
  });
  revalidatePath('/dashboard/contracts');
  redirect('/dashboard/contracts');
}

export async function editContract(id: string, formData: FormData) {
  const type = formData.get('type') as ContractType;
  const unitId = formData.get('unitId') as string;
  const customerId = formData.get('customerId') as string;
  const currency = formData.get('currency') as CurrencyEnum;
  const monthlyAmount = Number(formData.get('monthlyRate'));
  const dailyAmount = Number(formData.get('dailyRate'));
  const startDate = new Date(formData.get('startDate') as string);
  const endDate = new Date(formData.get('endDate') as string);
  const isDaily = Boolean(formData.get('isDaily'));

  const existingContract = await prisma.contract.findUnique({
    where: {
      id: id,
    },
  });

  const updateData: ContractUpdateData = {};

  // Compare each field and prepare the update object

  const formatDateString = (date: Date | string): string => {
    return new Date(date).toISOString().split('T')[0];
  };

  const formattedStartDate = formatDateString(startDate);
  const formattedExistingStartDate = formatDateString(
    existingContract?.startDate ?? new Date(),
  );

  const formattedEndDate = formatDateString(endDate);
  const formattedExistingEndDate = formatDateString(
    existingContract?.endDate ?? new Date(),
  );

  if (formattedStartDate !== formattedExistingStartDate) {
    updateData.startDate = startDate;
  }

  if (formattedEndDate !== formattedExistingEndDate) {
    updateData.endDate = endDate;
  }

  if (isDaily !== existingContract?.isDaily) {
    updateData.isDaily = isDaily;
  }

  if (monthlyAmount !== existingContract?.monthlyAmount) {
    updateData.monthlyAmount = monthlyAmount;
    updateData.newMonthlyAmount = monthlyAmount;
  }

  if (unitId !== existingContract?.unitId) {
    updateData.unitId = unitId;
  }

  if (customerId !== existingContract?.customerId) {
    updateData.customerId = customerId;
  }

  if (dailyAmount !== existingContract?.dailyAmount) {
    updateData.dailyAmount = dailyAmount;
  }

  if (type !== existingContract?.type) {
    updateData.type = type;
  }

  if (currency !== existingContract?.currency) {
    updateData.currency = currency;
  }

  // Perform the update if there are changes
  if (Object.keys(updateData).length > 0) {
    console.log('LENGHT > 0', { updateData });
    await prisma.contract.update({
      where: { id },
      data: updateData,
    });
  } else {
    console.log({ updateData });
  }

  revalidatePath(`/dashboard/contracts/edit/${id}`);
  redirect(`/dashboard/contracts`);
}

export async function releaseContract(id: string) {
  const contract = await prisma.contract.findUnique({
    where: {
      id: id,
    },
    select: {
      unitId: true,
      customerId: true,
    },
  });

  const result = await prisma.$transaction([
    prisma.contract.update({
      where: {
        id: id,
      },
      data: {
        type: 'RELEASED',
      },
    }),
    prisma.customers.update({
      where: {
        id: contract?.customerId,
      },
      data: {
        status: 'EX_TENANT',
      },
    }),
    prisma.unit.update({
      where: {
        id: contract?.unitId,
      },
      data: {
        status: 'VACANT',
      },
    }),
  ]);

  revalidatePath(`/dashboard/contracts`);
  redirect(`/dashboard/contracts`);
}

export async function addExtensionToContract(id: string, formData: FormData) {
  console.log('The contract Id is : ', id);
  console.log(formData);

  const startDate = new Date(formData.get('startDate') as string);
  const endDate = new Date(formData.get('endDate') as string);
  const currency = formData.get('currency') as CurrencyEnum;
  const dailyAmount = Number(formData.get('dailyRate'));
  const monthlyAmount = Number(formData.get('monthlyRate'));
  const isDaily = Boolean(formData.get('isDaily'));

  // Retrieve the contract to get unitId and customerId
  const contract = await prisma.contract.findUnique({
    where: { id },
    select: {
      unitId: true,
      customerId: true,
    },
  });

  if (!contract) {
    throw new Error('Contract not found');
  }

  // Start the first transaction to create contractExtension
  const newExtension = await prisma.contractExtension.create({
    data: {
      contractId: id,
      startDate: startDate,
      endDate: endDate,
      currency: currency,
      dailyAmount: dailyAmount,
      monthlyAmount: monthlyAmount,
      isDaily: isDaily,
    },
  });

  // Use the ID of the newExtension in the second transaction
  const result = await prisma.$transaction([
    prisma.transaction.create({
      data: {
        contractId: id,
        amount: monthlyAmount,
        type: 'RENT',
        fromDate: startDate,
        toDate: endDate,
        extensionId: newExtension.id,
      },
    }),
    prisma.contract.update({
      where: {
        id: id,
      },
      data: {
        type: 'ACTIVE',
        newMonthlyAmount: monthlyAmount,
      },
    }),
    prisma.unit.update({
      where: {
        id: contract.unitId,
      },
      data: {
        status: 'OCCUPIED',
      },
    }),
    prisma.customers.update({
      where: { id: contract.customerId },
      data: { status: 'TENANT' },
    }),
  ]);

  // 'result' now contains the results of the transaction and update operations

  revalidatePath(`/dashboard/extensions/${id}`);
  redirect(`/dashboard/contracts`);
}

export async function deleteExtension(id: string) {
  const extension = await prisma.contractExtension.delete({
    where: {
      id: id,
    },
  });

  revalidatePath('/dashboard/contracts');
}

export async function updateExtension(id: string, formData: FormData) {
  const startDate = new Date(formData.get('startDate') as string);
  const endDate = new Date(formData.get('endDate') as string);
  const currency = formData.get('currency') as CurrencyEnum;
  const dailyAmount = Number(formData.get('dailyRate'));
  const monthlyAmount = Number(formData.get('monthlyRate'));
  const isDaily = Boolean(formData.get('isDaily'));

  const existingExtension = await prisma.contractExtension.findUnique({
    where: {
      id: id,
    },
  });

  const updateData: ExtensionUpdateData = {};

  const formattedDate = FormateDatesToCompare({
    startDate: startDate,
    endDate: endDate,
    existingStartDate: existingExtension?.startDate,
    exisitingEndDate: existingExtension?.endDate,
  });

  if (formattedDate.startDate !== formattedDate.existingStartDate) {
    updateData.startDate = startDate;
  }

  if (formattedDate.endDate !== formattedDate.exisitingEndDate) {
    updateData.endDate = endDate;
  }

  if (currency !== existingExtension?.currency) {
    updateData.currency = currency;
  }
  if (dailyAmount !== existingExtension?.dailyAmount) {
    updateData.dailyAmount = dailyAmount;
  }
  if (monthlyAmount !== existingExtension?.monthlyAmount) {
    updateData.monthlyAmount = monthlyAmount;

    await prisma.contract.update({
      where: {
        id: existingExtension?.contractId,
      },
      data: {
        newMonthlyAmount: monthlyAmount,
      },
    });
  }

  if (isDaily !== existingExtension?.isDaily) {
    updateData.isDaily = isDaily;
  }
  // Perform the update if there are changes
  if (Object.keys(updateData).length > 0) {
    console.log('LENGHT > 0', { updateData });
    await prisma.contractExtension.update({
      where: { id },
      data: updateData,
    });
  } else {
    console.log({ updateData });
  }
  revalidatePath(`/dashboard/extensions/${id}`);
  redirect(`/dashboard/contracts`);
}

export async function addTransaction(id: string, formData: FormData) {
  const data = Object.fromEntries(formData);
  console.log('DATA: ', data);
  const contractId = await getContractIdFromExtension(id);
  const transactionType = data.type as TransactionType;
  const transactionAmount = Number(data.total);
  // const currentDate = d

  // Assuming all other form data entries can be safely converted to strings
  const details = Object.fromEntries(
    Object.entries(data)
      .filter(([key]) => key !== 'type' && key !== 'total')
      .map(([key, value]) => [key, value.toString()]),
  );
  const newTransaction = await prisma.transaction.create({
    data: {
      type: transactionType,
      amount:
        transactionType === 'PAYMENT' ? -transactionAmount : transactionAmount,
      contractId: contractId,
      extensionId: id,
      // currentDate : ,
      transactionDetails: details,
    },
  });
  console.log('NEW TRANSACTION', newTransaction);
  revalidatePath('/dashboard/employee/create');
  redirect('/dashboard/contracts');
}

export async function addTransactionV2(formData: FormData) {
  console.log(formData);
}

export async function addEmployee(formData: FormData) {
  console.log(formData);
  const name = formData.get('name') as string;
  const phone = formData.get('phone') as string;
  const email = formData.get('email') as string;
  const nationality = formData.get('nationality') as string;
  const passport = formData.get('passport') as string;
  const department = formData.get('department') as Department;
  const startDate = new Date(formData.get('startDate') as string);

  const newEmployee = await prisma.employee.create({
    data: {
      name,
      phone,
      email,
      nationality,
      passport,
      department,
      startDate,
    },
  });

  revalidatePath('/dashboard/employee/create');
  redirect('/dashboard/employee');
}

export async function curencyRate(
  currencyCode: CurrencyEnum,
): Promise<number | null> {
  // Find the currency by its code
  const currency = await prisma.currency.findUnique({
    where: {
      code: currencyCode,
    },
    include: {
      conversionRateLogs: {
        orderBy: {
          recordedAt: 'desc',
        },
        take: 1, // Get the most recent record
      },
    },
  });

  // Check if currency and conversionRateLogs are found
  if (currency && currency.conversionRateLogs.length > 0) {
    return currency.conversionRateLogs[0].rate; // Return the most recent conversion rate
  } else {
    return null; // Return null if no currency or conversion rate is found
  }
}

export async function customerStatement(formData: FormData) {
  console.log(formData);
}
