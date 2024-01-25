import { editCustomer, editUnit, viewCustomer } from '@/app/lib/actions';
import { countryList } from '@/app/lib/nationality';
import CustomerInput from '@/app/ui/dashboard/customers/CustomerInput';
import UnitInput from '@/app/ui/dashboard/units/UnitInput';
import prisma from '@/prisma/client';
import {
  AcademicCapIcon,
  BanknotesIcon,
  BriefcaseIcon,
  BuildingOffice2Icon,
  CalendarDaysIcon,
  CheckCircleIcon,
  DevicePhoneMobileIcon,
  EnvelopeIcon,
  FlagIcon,
  IdentificationIcon,
  MapPinIcon,
  SparklesIcon,
  TagIcon,
  UserCircleIcon,
  UserIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';
import {
  Block,
  CurrencyEnum,
  CustomerStatus,
  CustomerType,
  UnitStatus,
  UnitType,
} from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { TbBed } from 'react-icons/tb';

interface Props {
  params: { id: string };
}

const statusColors = {
  VACANT: {
    color: 'bg-green-300',
    Icon: CheckCircleIcon, // Note the capital 'I' in Icon, indicating a component
  },
  OCCUPIED: {
    color: 'bg-blue-300',
    Icon: TbBed,
  },
  MAINTENANCE: {
    color: 'bg-red-300',
    Icon: WrenchScrewdriverIcon,
  },
  RESERVED: {
    color: 'bg-orange-300',
    Icon: CalendarDaysIcon,
  },
};

export default async function UnitViewPage({
  params,
}: {
  params: { id: string };
}) {
  const handleEditUnit = editUnit.bind(null, params.id);

  const unit = await prisma.unit.findUnique({
    where: {
      id: params.id,
    },
  });
  return (
    <form action={handleEditUnit}>
      <div className=" flex flex-col rounded-md bg-gray-50 p-4 md:p-6">
        <div className="flex flex-wrap gap-6">
          <div className="flex-1/4 flex">
            <div className="flex flex-col">
              <div className=" flex items-center justify-center rounded-[50%] border border-gray-400">
                <Image
                  src="/BluePrint.png"
                  alt="bluePrint"
                  width={200}
                  height={200}
                  priority
                  className="overflow-hidden"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-1 flex-col">
            <div className="flex gap-4">
              <div className="flex flex-1 flex-col justify-start">
                {/* Unit Name */}
                <div className="mb-4">
                  <UnitInput
                    htmlFor="name"
                    defaultValue={unit?.name || ''}
                    label="Unit"
                    disabled={true}
                    required={true}
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter unit"
                    icon={<TagIcon />}
                  />
                </div>

                {/* Monthly Rate */}
                <div className="mb-4">
                  <UnitInput
                    htmlFor="monthlyRate"
                    defaultValue={unit?.monthlyRate.toString() || '0'}
                    label="Monthly rate"
                    disabled={true}
                    required={true}
                    id="monthlyRate"
                    name="monthlyRate"
                    type="number"
                    placeholder="Monthly rate"
                    step="0.01"
                    icon={<TagIcon />}
                  />
                </div>
                {/* daily rate */}
                <div className="mb-4">
                  <UnitInput
                    htmlFor="dailyRate"
                    defaultValue={unit?.dailyRate.toString() || '0'}
                    label="Daily rate"
                    disabled={true}
                    required={true}
                    id="dailyRate"
                    name="dailyRate"
                    type="number"
                    placeholder="Daily rate"
                    step="0.01"
                    icon={<TagIcon />}
                  />
                </div>
              </div>
              <div className="flex flex-1 flex-col justify-start">
                {/* Type */}
                <div className="mb-4">
                  <label className="mb-2 block text-sm font-medium">
                    Choose Type
                  </label>
                  <div className="relative">
                    <select
                      required
                      id="type"
                      name="type"
                      className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                      aria-describedby="type-error"
                      disabled={true}
                      defaultValue={unit?.type}
                    >
                      <option value="" disabled>
                        Select a unit type
                      </option>
                      {Object.values(UnitType).map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    <FlagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                  </div>
                </div>
                {/* block */}
                <div className="mb-4">
                  <label className="mb-2 block text-sm font-medium">
                    Choose a Block
                  </label>
                  <div className="relative">
                    <select
                      id="block"
                      name="block"
                      className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                      aria-describedby="block-error"
                      disabled={true}
                      defaultValue={unit?.block}
                      required
                    >
                      <option value="" disabled>
                        Select a unit block
                      </option>
                      {Object.values(Block).map((block) => (
                        <option key={block} value={block}>
                          {block}
                        </option>
                      ))}
                    </select>
                    <BuildingOffice2Icon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                  </div>
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
                      defaultValue={unit?.currency}
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
            </div>
            <fieldset className="flex">
              <legend className="mb-2 block text-sm font-medium">
                Set the unit status
              </legend>
              <div className=" w-full rounded-md border border-gray-200 bg-white px-[14px] py-3">
                <div className="flex flex-wrap justify-between gap-2">
                  {Object.values(UnitStatus).map((status) => {
                    const StatusIcon = statusColors[status].Icon; // Capitalize the variable name
                    return (
                      <div key={status} className="flex items-center">
                        <input
                          disabled={true}
                          required
                          id={status}
                          name="status"
                          type="radio"
                          value={status}
                          defaultChecked={status === unit?.status} // Set default checked for VACANT
                          className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                        />
                        <label
                          htmlFor={status}
                          className={`ml-2 flex cursor-pointer items-center gap-1.5 rounded-full ${statusColors[status].color} px-3 py-1.5 text-xs font-medium`}
                        >
                          {status} <StatusIcon className="h-4 w-4" />
                          {/* {status} <UserIcon className="h-4 w-4" /> */}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            </fieldset>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/units"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
          <button type="submit">Update</button>
          {/* <Button type="submit">Create Invoice</Button> */}
        </div>
      </div>
    </form>
  );
}
