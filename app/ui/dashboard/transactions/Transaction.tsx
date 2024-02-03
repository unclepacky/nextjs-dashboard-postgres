import {
  BanknotesIcon,
  BuildingOffice2Icon,
  FlagIcon,
  TagIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import {
  Block,
  ContractType,
  CurrencyEnum,
  UnitStatus,
  UnitType,
} from '@prisma/client';
import Link from 'next/link';
import React from 'react';
import UnitInput from '../units/UnitInput';
import ContractInput from '../contracts/ContractInput';
import prisma from '@/prisma/client';
import EmployeeDropDown from './EmployeeDropDown';

export default async function Transaction() {
  const employees = await prisma.employee.findMany();

  return (
    <div className=" flex flex-col rounded-md bg-gray-50 p-4 md:p-6">
      <div className="flex flex-wrap gap-6">
        <div className="flex-1/4 flex">
          <div className="flex flex-col">
            <div className=" flex items-center justify-center rounded-[50%] "></div>
            <div className="relative"></div>
          </div>
        </div>
        <div className="flex flex-1 flex-col">
          <div className="flex gap-4">
            <div className="flex flex-1 flex-col justify-start">
              <EmployeeDropDown employees={employees} />

              {/* End date */}
              <div className="relative mb-4">
                <ContractInput
                  htmlFor="endDate"
                  label="End date"
                  disabled={false}
                  required={true}
                  id="endDate"
                  name="endDate"
                  type="date"
                  placeholder="Enter end date"
                  // defaultValue={
                  //   contractWithId?.endDate.toISOString().split('T')[0]
                  // }
                  icon={<UserCircleIcon />}
                />
              </div>
              {/* Currency */}
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium">
                  Choose a currency
                </label>
                <div className="relative">
                  <select
                    id="currency"
                    name="currency"
                    className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    aria-describedby="currency-error"
                    disabled={false}
                    // defaultValue={contractWithId?.currency}
                    required
                  >
                    <option value="" disabled>
                      Select a currency
                    </option>
                    {Object.values(CurrencyEnum).map((cur) => (
                      <option key={cur} value={cur}>
                        {cur}
                      </option>
                    ))}
                  </select>
                  <BanknotesIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                </div>
              </div>
              {/* Daily Rate */}
              <div className="mb-4">
                <ContractInput
                  htmlFor="dailyRate"
                  label="Daily Rate"
                  disabled={false}
                  required={true}
                  id="dailyRate"
                  name="dailyRate"
                  type="number"
                  placeholder="Enter Daily rate"
                  step="0.01"
                  // defaultValue={contractWithId?.dailyAmount.toString()}
                  icon={<UserCircleIcon />}
                />
              </div>
              {/* Monthly Rate */}
              <div className="mb-4">
                <ContractInput
                  htmlFor="monthlyRate"
                  label="Monthly Rate"
                  disabled={true}
                  required={true}
                  id="monthlyRate"
                  name="monthlyRate"
                  type="number"
                  placeholder="Enter Monthly rate"
                  step="0.01"
                  // defaultValue={contractWithId?.monthlyAmount.toString()}
                  icon={<UserCircleIcon />}
                />
              </div>
              {/* Is Daily */}
              <div className="mb-4 flex gap-4">
                <ContractInput
                  htmlFor="isDaily"
                  label="Is Daily"
                  required={false}
                  id="isDaily"
                  name="isDaily"
                  type="checkbox"
                  placeholder=""
                  // defaultChecked={contractWithId?.isDaily}
                  disabled={true}
                />
              </div>
            </div>
            <div className="flex flex-1 flex-col justify-start">
              {/* Start date */}
              <div className="relative mb-4">
                <ContractInput
                  htmlFor="startDate"
                  label="Start date"
                  disabled={true}
                  required={true}
                  id="startDate"
                  name="startDate"
                  type="date"
                  placeholder="Enter start date"
                  // defaultValue={
                  //   contractWithId?.startDate.toISOString().split('T')[0]
                  // }
                  icon={<UserCircleIcon />}
                />
              </div>
              {/* End date */}
              <div className="relative mb-4">
                <ContractInput
                  htmlFor="endDate"
                  label="End date"
                  disabled={true}
                  required={true}
                  id="endDate"
                  name="endDate"
                  type="date"
                  placeholder="Enter end date"
                  // defaultValue={
                  //   contractWithId?.endDate.toISOString().split('T')[0]
                  // }
                  icon={<UserCircleIcon />}
                />
              </div>
              {/* Currency */}
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium">
                  Choose a currency
                </label>
                <div className="relative">
                  <select
                    id="currency"
                    name="currency"
                    className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    aria-describedby="currency-error"
                    disabled={true}
                    // defaultValue={contractWithId?.currency}
                    required
                  >
                    <option value="" disabled>
                      Select a currency
                    </option>
                    {Object.values(CurrencyEnum).map((cur) => (
                      <option key={cur} value={cur}>
                        {cur}
                      </option>
                    ))}
                  </select>
                  <BanknotesIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                </div>
              </div>
              {/* Daily Rate */}
              <div className="mb-4">
                <ContractInput
                  htmlFor="dailyRate"
                  label="Daily Rate"
                  disabled={true}
                  required={true}
                  id="dailyRate"
                  name="dailyRate"
                  type="number"
                  placeholder="Enter Daily rate"
                  step="0.01"
                  // defaultValue={contractWithId?.dailyAmount.toString()}
                  icon={<UserCircleIcon />}
                />
              </div>
              {/* Monthly Rate */}
              <div className="mb-4">
                <ContractInput
                  htmlFor="monthlyRate"
                  label="Monthly Rate"
                  disabled={true}
                  required={true}
                  id="monthlyRate"
                  name="monthlyRate"
                  type="number"
                  placeholder="Enter Monthly rate"
                  step="0.01"
                  // defaultValue={contractWithId?.monthlyAmount.toString()}
                  icon={<UserCircleIcon />}
                />
              </div>
              {/* Is Daily */}
              <div className="mb-4 flex gap-4">
                <ContractInput
                  htmlFor="isDaily"
                  label="Is Daily"
                  required={false}
                  id="isDaily"
                  name="isDaily"
                  type="checkbox"
                  placeholder=""
                  // defaultChecked={contractWithId?.isDaily}
                  disabled={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/contracts"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <button type="submit" disabled>
          Create
        </button>
        {/* <Button type="submit">Create Invoice</Button> */}
      </div>
    </div>
  );
}
