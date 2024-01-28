import { addExtensionToContract } from '@/app/lib/actions';
import { isFirstExt } from '@/app/lib/dates';
import ExtensionInput from '@/app/ui/dashboard/extensions/ExtensionInput';
import prisma from '@/prisma/client';
import {
  BanknotesIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  UserCircleIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';
import { ContractType, CurrencyEnum } from '@prisma/client';
import Link from 'next/link';
import { extname } from 'path';
import React from 'react';
import { TbBed } from 'react-icons/tb';

export default async function ViewExtensionPage({
  params,
}: {
  params: { id: string };
}) {
  console.log(params.id);

  // Get the Contract to which we are adding the extension
  // const contract = await prisma.contract.findUnique({
  //   where: {
  //     id: params.id,
  //   },
  //   include: {
  //     customer: true,
  //     unit: true,
  //     // contractExtension : true
  //   },
  // });

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
          {/* Type */}
          <fieldset className="mb-4">
            <legend className="mb-2 block text-sm font-medium">
              Contract Info
            </legend>
            <div className=" w-full rounded-md border border-gray-200 bg-white px-[14px] py-3">
              <div className="flex flex-wrap gap-9">
                <div className="flex w-full items-center justify-evenly">
                  {/* Tenat Name */}
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
                      icon={<UserCircleIcon />}
                    />
                  </div>
                  {/* Tenant Unit */}
                  <div className="relative mb-4">
                    <ExtensionInput
                      htmlFor="unit"
                      label="Unit"
                      disabled={true}
                      required={false}
                      id="unit"
                      name="unit"
                      type="text"
                      placeholder=""
                      defaultValue={extension?.contract.unit.name}
                      icon={<UserCircleIcon />}
                    />
                  </div>
                  {/* Start Date */}
                  <div className="relative mb-4">
                    <ExtensionInput
                      htmlFor="startDate"
                      label="Start Date"
                      disabled={true}
                      required={false}
                      id="startDate"
                      name="startDate"
                      type="text"
                      placeholder=""
                      defaultValue={extension?.contract.startDate.toDateString()}
                      icon={<UserCircleIcon />}
                    />
                  </div>
                  {/* End Date */}
                  <div className="relative mb-4">
                    <ExtensionInput
                      htmlFor="endDate"
                      label="End Date"
                      disabled={true}
                      required={false}
                      id="endDate"
                      name="endDate"
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
          <div className="flex gap-4">
            <div className="flex flex-1 flex-col justify-start">
              {/* Start date */}
              <div className="relative mb-4">
                <ExtensionInput
                  htmlFor="startDate"
                  label="Start date"
                  disabled={true}
                  required={true}
                  id="startDate"
                  name="startDate"
                  type="text"
                  placeholder=""
                  defaultValue={extension?.startDate.toDateString()}
                  icon={<UserCircleIcon />}
                />
              </div>
              {/* End date */}
              <div className="relative mb-4">
                <ExtensionInput
                  htmlFor="endDate"
                  label="End Date"
                  disabled={true}
                  required={true}
                  id="endDate"
                  name="endDate"
                  type="text"
                  placeholder=""
                  defaultValue={extension?.endDate.toDateString()}
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
                    defaultValue={extension?.contract.currency}
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
            </div>
            <div className="flex flex-1 flex-col justify-start">
              {/* Daily Rate */}
              <div className="mb-4">
                <ExtensionInput
                  htmlFor="dailyRate"
                  label="Daily Rate"
                  disabled={true}
                  required={true}
                  id="dailyRate"
                  name="dailyRate"
                  type="number"
                  placeholder="Enter Daily rate"
                  step="0.01"
                  defaultValue={extension?.dailyAmount.toString()}
                  icon={<UserCircleIcon />}
                />
              </div>
              {/* Monthly Rate */}
              <div className="mb-4">
                <ExtensionInput
                  htmlFor="monthlyRate"
                  label="Monthly Rate"
                  disabled={true}
                  required={true}
                  id="monthlyRate"
                  name="monthlyRate"
                  type="number"
                  placeholder="Enter Monthly rate"
                  step="0.01"
                  defaultValue={extension?.monthlyAmount.toString()}
                  icon={<UserCircleIcon />}
                />
              </div>
              {/* Is Daily */}
              <div className="mb-4 flex gap-4">
                <ExtensionInput
                  htmlFor="isDaily"
                  label="Is Daily"
                  disabled={true}
                  required={false}
                  id="isDaily"
                  name="isDaily"
                  type="checkbox"
                  defaultChecked={extension?.isDaily}
                  placeholder=""
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
