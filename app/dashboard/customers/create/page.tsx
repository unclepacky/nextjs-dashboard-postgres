import Link from 'next/link';
import {
  AcademicCapIcon,
  AtSymbolIcon,
  BriefcaseIcon,
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  DevicePhoneMobileIcon,
  EnvelopeIcon,
  PhoneIcon,
  SparklesIcon,
  UserCircleIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
// import { Button } from '@/app/ui/button';

export default async function CustomerAddPage() {
  return (
    <form action="">
      <div className=" flex flex-col rounded-md bg-gray-50 p-4 md:p-6">
        {/* CUSTOMER NAME */}
        <div className="flex gap-6">
          <div className="flex w-1/2 flex-wrap items-center justify-between">
            {/* Customer First Name */}
            <div className="mb-4">
              <label
                htmlFor="firstName"
                className="mb-2 block text-sm font-medium"
              >
                First Name
              </label>
              <div className="relative">
                <input
                  required
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Enter first name"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
                <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
              </div>
            </div>
            {/* Customer Last Name */}
            <div className="mb-4">
              <label
                htmlFor="lastName"
                className="mb-2 block text-sm font-medium"
              >
                Last Name
              </label>
              <div className="relative">
                <input
                  required
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Enter last name"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
                <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
              </div>
            </div>
          </div>
          <div className="flex w-1/2 flex-wrap items-center justify-between">
            {/* Phone number */}
            <div className="mb-4">
              <label htmlFor="phone" className="mb-2 block text-sm font-medium">
                Mobile number
              </label>
              <div className="relative">
                <input
                  required
                  id="phone"
                  name="phone"
                  type="text"
                  placeholder="Enter mobile"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
                <DevicePhoneMobileIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
              </div>
            </div>
            {/* email */}
            <div className="mb-4">
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
                Email
              </label>
              <div className="relative">
                <input
                  required
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
                <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Invoice Status */}
        <div className="flex gap-6">
          <fieldset className="flex w-1/2">
            <legend className="mb-2 block text-sm font-medium">
              Set the customer type
            </legend>
            <div className=" w-full rounded-md border border-gray-200 bg-white px-[14px] py-3">
              <div className="flex flex-wrap justify-between gap-2">
                <div className="flex items-center">
                  <input
                    required
                    id="general"
                    name="type"
                    type="radio"
                    value="GENERAL"
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
                    required
                    id="student"
                    name="type"
                    type="radio"
                    value="STUDENT"
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
                    required
                    id="corporate"
                    name="type"
                    type="radio"
                    value="CORPORATE"
                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  />
                  <label
                    htmlFor="paid"
                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-500 px-3 py-1.5 text-xs font-medium text-white"
                  >
                    Corporate <BriefcaseIcon className="h-4 w-4" />
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    required
                    id="vip"
                    name="type"
                    type="radio"
                    value="VIP"
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
          <div className="flex w-1/2 flex-wrap items-center justify-between">
            {/* Business number */}
            <div className="mb-4">
              <label
                htmlFor="business"
                className="mb-2 block text-sm font-medium"
              >
                Business number
              </label>
              <div className="relative">
                <input
                  required
                  id="business"
                  name="business"
                  type="text"
                  placeholder="Enter business number"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
                <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
              </div>
            </div>
            {/* Business number */}
            <div className="mb-4">
              <label
                htmlFor="business"
                className="mb-2 block text-sm font-medium"
              >
                Business number
              </label>
              <div className="relative">
                <input
                  required
                  id="business"
                  name="business"
                  type="text"
                  placeholder="Enter business number"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
                <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/customers"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <button type="submit">Create Invoice</button>
        {/* <Button type="submit">Create Invoice</Button> */}
      </div>
    </form>
  );
}
