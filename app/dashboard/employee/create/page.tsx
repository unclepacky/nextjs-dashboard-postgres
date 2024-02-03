import Link from 'next/link';
import {
  AcademicCapIcon,
  BriefcaseIcon,
  CheckCircleIcon,
  DevicePhoneMobileIcon,
  EnvelopeIcon,
  FlagIcon,
  IdentificationIcon,
  SparklesIcon,
  UserCircleIcon,
  UserIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';
import { countryList } from '@/app/lib/nationality';
import { addCustomer, addEmployee } from '@/app/lib/actions';
import { Department } from '@prisma/client';
import { TbBed } from 'react-icons/tb';
import Image from 'next/image';

const statusColors = {
  RECEPTION: {
    color: 'bg-green-300',
    Icon: CheckCircleIcon, // Note the capital 'I' in Icon, indicating a component
  },
  MAINTENANCE: {
    color: 'bg-blue-300',
    Icon: TbBed,
  },
  CLEANING: {
    color: 'bg-red-300',
    Icon: WrenchScrewdriverIcon,
  },
};
export default async function EmployeeAddPage() {
  return (
    <form action={addEmployee}>
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
                  className="overflow-hidden"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-1 flex-col">
            <div className="flex gap-4">
              <div className="flex flex-1 flex-col justify-start">
                {/* Employee Name */}
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      required
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter full name"
                      className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    />
                    <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                  </div>
                </div>
                {/* Phone number */}
                <div className="mb-4">
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-medium"
                  >
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
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium"
                  >
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
              <div className="flex flex-1 flex-col justify-start">
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
                      defaultValue="Lebanon"
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
                  <label
                    htmlFor="passport"
                    className="mb-2 block text-sm font-medium"
                  >
                    Passport number
                  </label>
                  <div className="relative">
                    <input
                      required
                      id="passport"
                      name="passport"
                      type="text"
                      placeholder="Enter passport number"
                      className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    />
                    <IdentificationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                  </div>
                </div>
                {/* Since date */}
                <div className="mb-4">
                  <label
                    htmlFor="startDate"
                    className="mb-2 block text-sm font-medium"
                  >
                    Date Started
                  </label>
                  <div className="relative">
                    <input
                      required
                      id="startDate"
                      name="startDate"
                      type="date"
                      placeholder="Enter the start Date"
                      className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    />
                    <IdentificationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                  </div>
                </div>
              </div>
            </div>
            {/* Employee deparment */}
            <fieldset className="flex">
              <legend className="mb-2 block text-sm font-medium">
                Set the department
              </legend>
              <div className=" w-full rounded-md border border-gray-200 bg-white px-[14px] py-3">
                <div className="flex flex-wrap justify-between gap-2">
                  {Object.values(Department).map((dep) => {
                    const StatusIcon = statusColors[dep].Icon;
                    return (
                      <div key={dep} className="flex items-center">
                        <input
                          required
                          id={dep}
                          name="department"
                          type="radio"
                          value={dep}
                          className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                        />
                        <label
                          htmlFor={dep}
                          className={`ml-2 flex cursor-pointer items-center gap-1.5 rounded-full ${statusColors[dep].color} px-3 py-1.5 text-xs font-medium`}
                        >
                          {dep} <UserIcon className="h-4 w-4" />
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
            href="/dashboard/employee"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
          <button type="submit">Create Employee</button>
          {/* <Button type="submit">Create Invoice</Button> */}
        </div>
      </div>
    </form>
  );
}
