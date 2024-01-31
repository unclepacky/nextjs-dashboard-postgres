import Badge from '@/app/(tools)/badge/Badge';
import { BadgeCategory, BadgeType } from '@/app/(tools)/badge/defenition';
import { editContract } from '@/app/lib/actions';
import ContractInput from '@/app/ui/dashboard/contracts/ContractInput';
import prisma from '@/prisma/client';
import {
  BanknotesIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  FlagIcon,
  UserCircleIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';
import { ContractType, CurrencyEnum } from '@prisma/client';
import Link from 'next/link';
import { TbBed } from 'react-icons/tb';

const statusColors = {
  INQUIRY: {
    color: 'bg-green-300',
    Icon: CheckCircleIcon, // Note the capital 'I' in Icon, indicating a component
  },
  ACTIVE: {
    color: 'bg-blue-300',
    Icon: TbBed,
  },
  INACTIVE: {
    color: 'bg-red-300',
    Icon: WrenchScrewdriverIcon,
  },
  RELEASED: {
    color: 'bg-orange-300',
    Icon: CalendarDaysIcon,
  },
  RESERVATION: {
    color: 'bg-orange-300',
    Icon: CalendarDaysIcon,
  },
};

export default async function ContractViewPage({
  params,
}: {
  params: { id: string };
}) {
  const handleEditContract = editContract.bind(null, params.id);

  const customers = await prisma.customers.findMany();

  const contractWithId = await prisma.contract.findUnique({
    where: {
      id: params.id,
    },
    include: {
      customer: true,
      unit: true,
    },
  });
  const units = await prisma.unit.findMany({
    where: {
      OR: [{ status: 'VACANT' }, { id: contractWithId?.unitId }],
    },
  });
  return (
    <form action={handleEditContract}>
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
                {/* Type */}
                <fieldset className="mb-4">
                  <legend className="mb-2 block text-sm font-medium">
                    Set the contract Type
                  </legend>
                  <div className=" w-full rounded-md border border-gray-200 bg-white px-[14px] py-3">
                    <div className="flex flex-wrap gap-9">
                      {Object.values(ContractType).map((type) => {
                        const StatusIcon = statusColors[type].Icon; // Capitalize the variable name
                        return (
                          <div key={type} className="flex w-1/4 items-center">
                            <input
                              disabled={true}
                              required
                              id={type}
                              name="type"
                              type="radio"
                              value={type}
                              defaultChecked={type === contractWithId?.type} // Set default checked
                              className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                            />
                            <label
                              htmlFor={type}
                              className={`ml-2 flex cursor-pointer items-center gap-1.5 rounded-full ${statusColors[type].color} px-3 py-1.5 text-xs font-medium`}
                            >
                              {type} <StatusIcon className="h-4 w-4" />
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </fieldset>
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
                      defaultValue={contractWithId?.unitId}
                    >
                      <option value="" disabled>
                        Select a unit
                      </option>
                      {units.map((unit) => {
                        const optionText = `${unit.name} ${' '.repeat(
                          50 - unit.name.length,
                        )} ${unit.dailyRate}$/${unit.monthlyRate}$ ${
                          unit.status
                        }`;
                        return (
                          <option
                            key={unit.id}
                            value={unit.id}
                            style={{ fontFamily: 'monospace' }}
                          >
                            {optionText}
                            {/* {unit.name} */}
                          </option>
                        );
                      })}
                    </select>
                    <FlagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                  </div>
                </div>
                {/* Customers */}
                <div className="mb-4">
                  <label className="mb-2 block text-sm font-medium">
                    Customers
                  </label>
                  <div className="relative">
                    <select
                      required
                      id="customerId"
                      name="customerId"
                      className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                      aria-describedby="customers-error"
                      disabled={true}
                      defaultValue={contractWithId?.customerId}
                    >
                      <option value="" disabled>
                        Select a customer
                      </option>
                      {customers.map((customer) => (
                        <option key={customer.id} value={customer.id}>
                          {customer.name}
                        </option>
                      ))}
                    </select>
                    <FlagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                  </div>
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
                    defaultValue={
                      contractWithId?.startDate.toISOString().split('T')[0]
                    }
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
                    defaultValue={
                      contractWithId?.endDate.toISOString().split('T')[0]
                    }
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
                      defaultValue={contractWithId?.currency}
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
                    defaultValue={contractWithId?.dailyAmount.toString()}
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
                    defaultValue={contractWithId?.monthlyAmount.toString()}
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
                    defaultChecked={contractWithId?.isDaily}
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
    </form>
  );
}
