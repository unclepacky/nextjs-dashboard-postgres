'use client';
import DropDown from '@/app/(tools)/dropdown/DropDown';
import CustomIcon from '@/app/(tools)/icons/CustomIcon';
import { customerStatement } from '@/app/lib/actions';
import prisma from '@/prisma/client';
import { EllipsisHorizontalIcon, FlagIcon } from '@heroicons/react/24/outline';
import { Customers } from '@prisma/client';
import Link from 'next/link';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { IconType } from 'react-icons';

interface Props {
  //   icon: IconType;
  customers: Customers[];
}

export default function CardStatement({ customers }: Props) {
  const [selectedCustomer, setSelectedCustomer] = useState<string>('');

  function handleSelectChange(event: ChangeEvent<HTMLSelectElement>): void {
    setSelectedCustomer(event.target.value);
  }

  //   const customers = await prisma.customers.findMany({
  //     orderBy: {
  //       name: 'asc',
  //     },
  //   });

  return (
    <form
      className="hover-box-shadow relative flex h-[176px] flex-col items-stretch justify-between rounded-lg px-4  py-5 dark:bg-black"
      style={{
        boxShadow: '0 0 0 1px hsla(0,0%,100%,.145),0 4px 6px rgba(0,0,0,.04)',
        transition: 'box-shadow .15s ease',
      }}
    >
      {/* Header */}
      <div className="flex flex-initial flex-col items-stretch justify-start gap-0 p-0 ">
        <section className="flex flex-initial flex-row items-center justify-start gap-4 p-0">
          <div className="flex min-w-0 flex-1 flex-row items-center justify-start gap-4 p-0">
            <div className="-mr-1 self-start">
              <span
                className="relative flex h-9 w-9  items-center justify-center overflow-hidden rounded-[50%] bg-black align-top"
                style={{
                  boxShadow: '0 0 0 1px #fff',
                  border: '1px solid hsla(0, 0%, 30%, 1)',
                }}
              >
                {/* <CustomIcon
                  icon={icon}
                  width="20px"
                  height="20px"
                  color="white"
                  stroke="#444"
                /> */}
              </span>
            </div>
            <div className="flex w-auto min-w-0 flex-1 flex-row items-center justify-start gap-2">
              <div className="flex min-w-0 flex-1 items-center justify-start gap-0">
                <div className="">
                  <label className="block text-sm font-medium">
                    Statement Of Account
                  </label>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* Statement by Customer */}
      <div className="flex flex-initial flex-col items-stretch justify-start gap-0 p-0 ">
        <section className="flex flex-initial flex-row items-center justify-start gap-4 p-0">
          <div className="flex min-w-0 flex-1 flex-row items-center justify-start gap-4 p-0">
            <div className="flex w-auto min-w-0 flex-1 flex-row items-center justify-start gap-2">
              <div className="flex min-w-0 flex-1 flex-col items-stretch justify-start gap-0">
                <div className="mb-4">
                  <div className="relative">
                    <select
                      required
                      id="customerId"
                      name="customerId"
                      className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                      aria-describedby="customerId-error"
                      disabled={false}
                      defaultValue=""
                      onChange={handleSelectChange}
                    >
                      <option value="" disabled>
                        Select Customer
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
            </div>
          </div>
        </section>
      </div>

      <div className="flex justify-end gap-4">
        <Link
          href={`/dashboard/statement/${selectedCustomer}`}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          View
        </Link>
      </div>
    </form>
  );
}
