import transactionComponents from '@/app/lib/TransactionComponents';
import { addTransactionV2 } from '@/app/lib/actions';
import ExtensionInput from '@/app/ui/dashboard/extensions/ExtensionInput';
import Transaction from '@/app/ui/dashboard/transactions/Transaction';
import UnitInput from '@/app/ui/dashboard/units/UnitInput';
import prisma from '@/prisma/client';
import {
  BanknotesIcon,
  BuildingOffice2Icon,
  CalendarDaysIcon,
  CheckCircleIcon,
  FlagIcon,
  TagIcon,
  UserCircleIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import React, { ChangeEvent, useState } from 'react';
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

interface SearchParamsProps {
  searchParams: {
    id: string;
  };
}

export default async function CreateTransactionPage({
  searchParams,
}: SearchParamsProps) {
  const unitId = searchParams.id || undefined;

  const employees = await prisma.employee.findMany();
  const units = await prisma.unit.findMany({
    where: {
      status: 'OCCUPIED',
      // id: unitId,
    },
    include: {
      contract: {
        where: {
          type: 'ACTIVE',
        },
        include: {
          contractExtension: {
            orderBy: {
              startDate: 'desc', // Assuming you want to use startDate to determine the "latest"
            },
            take: 1,
          },
          customer: true,
        },
      },
    },
  });

  // console.log(JSON.stringify(units, null, 2));

  return (
    <form action={addTransactionV2}>
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
                Select client
              </legend>
              <div className=" w-full rounded-md border border-gray-200 bg-white px-[14px] py-3">
                <div className="flex flex-wrap gap-9">
                  <div className="flex w-full items-center justify-evenly">
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
                          disabled={false}
                          defaultValue=""
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
                                {unit.name} {unit.contract[0].customer.name}{' '}
                                {unit.contract[0].contractExtension[0].startDate.toDateString()}
                              </option>
                            );
                          })}
                        </select>
                        <FlagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                      </div>
                    </div>
                    {/* Tenant Name */}
                    <div className="relative mb-4">
                      <label
                        htmlFor="tenant"
                        className="mb-2 block text-sm font-medium"
                      >
                        Tenant
                      </label>
                      {/* <div className={`relative ${isCheckbox ? 'flex items-center' : ''}`}> */}
                      <div className={`relative`}>
                        <input
                          // defaultValue={unit.contract[0].customer.name}
                          id="tenant"
                          name="tenant"
                          type="text"
                          // step={props.step}
                          // placeholder={props.placeholder}
                          className="block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                        <div className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500">
                          {<UserCircleIcon />}
                        </div>
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
                        // defaultValue={extension?.contract.startDate.toDateString()}
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
                        // defaultValue={extension?.contract.endDate.toDateString()}
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
                        // defaultValue={extension?.startDate.toDateString()}
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
                        // defaultValue={extension?.endDate.toDateString()}
                        icon={<UserCircleIcon />}
                      />
                    </div>
                    {/* {extension?.isDaily ? (
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
                    )} */}
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
