'use server';

import prisma from '@/prisma/client';
import {
  Block,
  ContractType,
  CurrencyEnum,
  CustomerStatus,
  CustomerType,
  UnitStatus,
  UnitType,
} from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

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
  console.log('ADDRESS: ', existingCustomer?.passport);
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

  revalidatePath(`/dashboard/customers/edit/${id}`);
  redirect(`/dashboard/customers/edit/${id}`);
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
  redirect(`/dashboard/units/edit/${id}`);
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
    console.log(startDate, ' vs ', existingContract?.startDate);
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

export async function addExtensionToContract(id: string, formData: FormData) {
  console.log('The contract Id is : ', id);
  console.log(formData);

  const startDate = new Date(formData.get('startDate') as string);
  const endDate = new Date(formData.get('endDate') as string);
  const currency = formData.get('currency') as CurrencyEnum;
  const dailyAmount = Number(formData.get('dailyRate'));
  const monthlyAmount = Number(formData.get('monthlyRate'));
  const isDaily = Boolean(formData.get('isDaily'));

  // Using $transaction to create a ContractExtension and update Contract
  // const result = await prisma.$transaction([
  //   prisma.contractExtension.create({
  //     data: {
  //       contractId: id,
  //       startDate: startDate,
  //       endDate: endDate,
  //       currency: currency,
  //       dailyAmount: dailyAmount,
  //       monthlyAmount: monthlyAmount,
  //       isDaily: isDaily,
  //     },
  //   }),
  //   prisma.contract.update({
  //     where: {
  //       id: id,
  //     },
  //     data: {
  //       type: 'ACTIVE',
  //       newMonthlyAmount: monthlyAmount,
  //     },
  //   }),
  // ]);

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
  console.log(formData);
}
