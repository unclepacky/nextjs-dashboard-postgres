import { addTransaction } from '@/app/lib/actions';
import ExtensionInput from '@/app/ui/dashboard/extensions/ExtensionInput';
import Transaction from '@/app/ui/dashboard/transactions/Transaction';
import Cleaning from '@/app/ui/dashboard/transactions/Cleaning';
import prisma from '@/prisma/client';
import {
  BanknotesIcon,
  BuildingOffice2Icon,
  CalendarDaysIcon,
  CheckCircleIcon,
  FlagIcon,
  UserCircleIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';
import { Block, CurrencyEnum, TransactionType, UnitType } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { TbBed } from 'react-icons/tb';

const statusColors = {
  CLEANING: {
    color: 'bg-green-300',
    Icon: CheckCircleIcon, // Note the capital 'I' in Icon, indicating a component
  },
  INTERNET: {
    color: 'bg-blue-300',
    Icon: TbBed,
  },
  ELECTRICITY: {
    color: 'bg-red-300',
    Icon: WrenchScrewdriverIcon,
  },
  MAINTENANCE: {
    color: 'bg-orange-300',
    Icon: CalendarDaysIcon,
  },
  RENT: {
    color: 'bg-orange-300',
    Icon: CalendarDaysIcon,
  },
  PAYMENT: {
    color: 'bg-orange-300',
    Icon: CalendarDaysIcon,
  },
  CREDIT: {
    color: 'bg-orange-300',
    Icon: CalendarDaysIcon,
  },
  DEBIT: {
    color: 'bg-orange-300',
    Icon: CalendarDaysIcon,
  },
  TRANSFER: {
    color: 'bg-orange-300',
    Icon: CalendarDaysIcon,
  },
};

export default async function CreateTransactionWithExtId({
  params,
}: {
  params: { id: string };
}) {
  // get the extension with id
  const extension = await prisma.contractExtension.findUnique({
    where: {
      id: params.id,
    },
    include: {
      contract: {
        include: {
          customer: true,
          unit: true,
        },
      },
    },
  });
  // Get the Contract to which we are adding the extension
  //   const contract = await prisma.contract.findUnique({
  //     where: {
  //       id: params.id,
  //     },
  //     include: {
  //       customer: true,
  //       unit: true,
  //     },
  //   });
  const units = await prisma.unit.findMany({
    where: {
      status: 'OCCUPIED',
    },
  });

  const employees = await prisma.employee.findMany();

  const handleAddTransaction = addTransaction.bind(null, params.id);

  const transactionTypes = Object.values(TransactionType);
  const halfLength = Math.ceil(transactionTypes.length / 2); // Calculate the midpoint, rounding up
  const firstHalfTransactionTypes = transactionTypes.slice(0, halfLength); // Get the first half
  const secondHalfTransactionTypes = transactionTypes.slice(halfLength); // Get the second half

  return (
    <form action={handleAddTransaction}>
      <div className=" flex flex-col rounded-md bg-gray-50 p-4 md:p-6">
        <div className="flex flex-wrap gap-6">
          <div className="flex-1/4 flex">
            <div className="flex flex-col">
              <div className=" flex items-center justify-center rounded-[50%] "></div>
              <div className="relative"></div>
            </div>
          </div>
          <div className="flex flex-1 flex-col">
            {/* Contract Info */}
            <fieldset className="mb-4">
              <legend className="mb-2 block text-sm font-medium">
                Contract Info
              </legend>
              <div className=" w-full rounded-md border border-gray-200 bg-white px-[14px] py-3">
                <div className="flex flex-wrap gap-9">
                  <div className="flex w-full items-center justify-evenly">
                    {/* Tenant Name */}
                    <div className="relative mb-4">
                      <ExtensionInput
                        htmlFor="customer"
                        label="Tenant"
                        disabled={true}
                        required={false}
                        id="customer"
                        name="customer"
                        type="text"
                        placeholder=""
                        defaultValue={extension?.contract.customer.name}
                        // readOnly={true}
                        icon={<UserCircleIcon />}
                      />
                    </div>
                    {/* Units */}
                    <div className="mb-4">
                      <label className="mb-2 block text-sm font-medium">
                        Units
                      </label>
                      <div className="relative">
                        <select
                          required
                          id="unitId"
                          name="unitId"
                          className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                          aria-describedby="units-error"
                          disabled={true}
                          defaultValue={extension?.contract.unitId}
                        >
                          <option value="" disabled>
                            Select a unit
                          </option>
                          {units.map((unit) => {
                            // console.log('UNIT ID IS: ', unit.id);
                            return (
                              <option
                                key={unit.id}
                                value={unit.id}
                                style={{ fontFamily: 'monospace' }}
                              >
                                {unit.name}
                              </option>
                            );
                          })}
                        </select>
                        <FlagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                      </div>
                    </div>
                    {/* Start Date */}
                    <div className="relative mb-4">
                      <ExtensionInput
                        htmlFor="ContractStartDate"
                        label="Start Date"
                        disabled={true}
                        // readOnly={true}
                        required={false}
                        id="ContractStartDate"
                        name="ContractStartDate"
                        type="text"
                        placeholder=""
                        defaultValue={extension?.contract.startDate.toDateString()}
                        icon={<UserCircleIcon />}
                      />
                    </div>
                    {/* End Date */}
                    <div className="relative mb-4">
                      <ExtensionInput
                        htmlFor="ContractEndDate"
                        label="End Date"
                        disabled={true}
                        // readOnly={true}
                        required={false}
                        id="ContractEndDate"
                        name="ContractEndDate"
                        type="text"
                        placeholder=""
                        defaultValue={extension?.contract.endDate.toDateString()}
                        icon={<UserCircleIcon />}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </fieldset>
            {/* Extension Info */}
            <fieldset className="mb-4">
              <legend className="mb-2 block text-sm font-medium">
                Extension Info
              </legend>
              <div className=" w-full rounded-md border border-gray-200 bg-white px-[14px] py-3">
                <div className="flex flex-wrap gap-9">
                  <div className="flex w-full items-center justify-evenly">
                    {/* Start Date */}
                    <div className="relative mb-4">
                      <ExtensionInput
                        htmlFor="ExtensionStartDate"
                        label="Start Date"
                        // readOnly={true}
                        disabled={true}
                        required={false}
                        id="ExtensionStartDate"
                        name="ExtensionStartDate"
                        type="text"
                        placeholder=""
                        defaultValue={extension?.startDate.toDateString()}
                        icon={<UserCircleIcon />}
                      />
                    </div>
                    {/* End Date */}
                    <div className="relative mb-4">
                      <ExtensionInput
                        htmlFor="ExtensionEndDate"
                        label="End Date"
                        disabled={true}
                        // readOnly={true}
                        required={false}
                        id="ExtensionEndDate"
                        name="ExtensionEndDate"
                        type="text"
                        placeholder=""
                        defaultValue={extension?.endDate.toDateString()}
                        icon={<UserCircleIcon />}
                      />
                    </div>
                    {extension?.isDaily ? (
                      <div className="mb-4">
                        <ExtensionInput
                          htmlFor="ExtensionDailyRate"
                          label="Daily Rate"
                          disabled={true}
                          // readOnly={true}
                          required={true}
                          id="ExtensionDailyRate"
                          name="ExtensionDailyRate"
                          type="number"
                          placeholder="Enter Daily rate"
                          step="0.01"
                          defaultValue={extension?.dailyAmount.toString()}
                          icon={<UserCircleIcon />}
                        />
                      </div>
                    ) : (
                      <div className="mb-4">
                        <ExtensionInput
                          htmlFor="ExtensionMonthlyRate"
                          label="Monthly Rate"
                          disabled={true}
                          // readOnly={true}
                          required={true}
                          id="ExtensionMonthlyRate"
                          name="ExtensionMonthlyRate"
                          type="number"
                          placeholder="Enter Monthly rate"
                          step="0.01"
                          defaultValue={extension?.monthlyAmount.toString()}
                          icon={<UserCircleIcon />}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </fieldset>
            <div className="flex gap-4">
              <Transaction employees={employees} />
            </div>
          </div>
        </div>
        {/* Button */}
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/contracts"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
          <button type="submit">Create</button>
          {/* <Button type="submit">Create Invoice</Button> */}
        </div>
      </div>
    </form>
  );
}
