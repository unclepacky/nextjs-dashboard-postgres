import { viewCustomer } from '@/app/lib/actions';
import { countryList } from '@/app/lib/nationality';
import CustomerInput from '@/app/ui/dashboard/customers/CustomerInput';
import prisma from '@/prisma/client';
import {
  AcademicCapIcon,
  BriefcaseIcon,
  DevicePhoneMobileIcon,
  EnvelopeIcon,
  FlagIcon,
  IdentificationIcon,
  MapPinIcon,
  SparklesIcon,
  UserCircleIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { CustomerStatus, CustomerType, UnitStatus } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  params: { id: string };
}

export default async function ViewCustomerPage({
  params,
}: {
  params: { id: string };
}) {
  const handleViewCustomer = viewCustomer.bind(null, params.id);

  const customer = await prisma.customers.findUnique({
    where: {
      id: params.id,
    },
  });

  return (
    <form action={handleViewCustomer}>
      <div className=" flex flex-col rounded-md bg-gray-50 p-4 md:p-6">
        <div className="flex flex-wrap gap-6">
          <div className="flex-1/4 flex">
            <div className="flex flex-col">
              <div className=" flex items-center justify-center rounded-[50%] border border-gray-400">
                <Image
                  src="/avatar.png"
                  alt="avatar"
                  width={200}
                  height={200}
                  priority
                  // layout="fill"
                  // objectFit="cover"
                  // className="pointer-events-none"
                  className="overflow-hidden"
                />
              </div>
              <div className="relative">
                <CustomerInput
                  htmlFor=""
                  label=""
                  disabled={true}
                  defaultValue={customer?.name || ''}
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter first name"
                  icon={<UserCircleIcon />}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-1 flex-col">
            <div className="flex gap-4">
              <div className="flex flex-1 flex-col justify-start">
                {/* First Name */}
                <div className="mb-4">
                  <CustomerInput
                    htmlFor="firstName"
                    label="First Name"
                    disabled={true}
                    defaultValue={customer?.firstName || ''}
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="Enter first name"
                    icon={<UserCircleIcon />}
                  />
                </div>

                {/* Last Name */}
                <div className="mb-4">
                  <CustomerInput
                    htmlFor="lastName"
                    label="Last Name"
                    disabled={true}
                    defaultValue={customer?.lastName || ''}
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Enter last name"
                    icon={<UserCircleIcon />}
                  />
                </div>
                {/* Phone */}
                <div className="mb-4">
                  <CustomerInput
                    htmlFor="phone"
                    label="Mobile"
                    disabled={true}
                    defaultValue={customer?.phone || ''}
                    id="phone"
                    name="phone"
                    type="text"
                    placeholder="Enter your mobile"
                    icon={<DevicePhoneMobileIcon />}
                  />
                </div>
              </div>
              <div className="flex flex-1 flex-col justify-start">
                {/* Email */}
                <div className="mb-4">
                  <CustomerInput
                    htmlFor="email"
                    label="Email"
                    disabled={true}
                    defaultValue={customer?.email || ''}
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Enter your email"
                    icon={<EnvelopeIcon />}
                  />
                </div>
                {/* Nationality */}
                <div className="mb-4">
                  <label className="mb-2 block text-sm font-medium">
                    Choose Nationality
                  </label>
                  <div className="relative">
                    <select
                      id="nationality"
                      name="nationality"
                      className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                      aria-describedby="customer-error"
                      defaultValue={customer?.nationality}
                      disabled
                    >
                      <option value="" disabled>
                        Select a country
                      </option>
                      {countryList.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                    <FlagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                  </div>
                </div>

                {/* Passport number */}
                <div className="mb-4">
                  <CustomerInput
                    htmlFor="passport"
                    label="Passport number"
                    disabled={true}
                    defaultValue={customer?.passport || ''}
                    id="passport"
                    name="passport"
                    type="text"
                    placeholder="Enter your passport"
                    icon={<IdentificationIcon />}
                  />
                </div>
              </div>
              <div className="flex flex-1 flex-col justify-start">
                {/* Occupation */}
                <div className="mb-4">
                  <CustomerInput
                    htmlFor="occupation"
                    label="Occupation"
                    disabled={true}
                    defaultValue={customer?.occupation || ''}
                    id="occupation"
                    name="occupation"
                    type="text"
                    placeholder="Enter your occupation"
                    icon={<BriefcaseIcon />}
                  />
                </div>
                {/* Status */}
                <div className="mb-4">
                  <label className="mb-2 block text-sm font-medium">
                    Status
                  </label>
                  <div className="relative">
                    <select
                      id="status"
                      name="status"
                      className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                      aria-describedby="customer-error"
                      defaultValue={customer?.status}
                      disabled
                    >
                      <option value="" disabled>
                        Select a status
                      </option>
                      {Object.values(CustomerStatus).map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                    <FlagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                  </div>
                </div>

                {/* Address */}
                <div className="mb-4">
                  <CustomerInput
                    htmlFor="address"
                    label="Address"
                    disabled={true}
                    defaultValue={customer?.address || ''}
                    id="address"
                    name="address"
                    type="text"
                    placeholder="Enter your address"
                    icon={<MapPinIcon />}
                  />
                </div>
              </div>
            </div>
            <fieldset className="flex">
              <legend className="mb-2 block text-sm font-medium">
                Set the customer type
              </legend>
              <div className=" w-full rounded-md border border-gray-200 bg-white px-[14px] py-3">
                <div className="flex flex-wrap justify-between gap-2">
                  <div className="flex items-center">
                    <input
                      disabled
                      required
                      id="general"
                      name="type"
                      type="radio"
                      value="GENERAL"
                      defaultChecked={customer?.type === 'GENERAL'}
                      className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                    />
                    <label
                      htmlFor="general"
                      className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-blue-300 px-3 py-1.5 text-xs font-medium "
                    >
                      General <UserIcon className="h-4 w-4" />
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      disabled
                      required
                      id="student"
                      name="type"
                      type="radio"
                      value="STUDENT"
                      defaultChecked={customer?.type === 'STUDENT'}
                      className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                    />
                    <label
                      htmlFor="student"
                      className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                    >
                      Student <AcademicCapIcon className="h-4 w-4" />
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      disabled
                      required
                      id="corporate"
                      name="type"
                      type="radio"
                      value="CORPORATE"
                      defaultChecked={customer?.type === 'CORPORATE'}
                      className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                    />
                    <label
                      htmlFor="corporate"
                      className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-500 px-3 py-1.5 text-xs font-medium text-white"
                    >
                      Corporate <BriefcaseIcon className="h-4 w-4" />
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      disabled
                      required
                      id="vip"
                      name="type"
                      type="radio"
                      value="VIP"
                      defaultChecked={customer?.type === 'VIP'}
                      className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                    />
                    <label
                      htmlFor="vip"
                      className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-amber-300 px-3 py-1.5 text-xs font-medium"
                    >
                      VIP <SparklesIcon className="h-4 w-4" />
                    </label>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/customers"
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
