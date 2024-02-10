import EmployeeDropDown from '@/app/ui/dashboard/transactions/EmployeeDropDown';
import Transaction from '@/app/ui/dashboard/transactions/Transaction';
import prisma from '@/prisma/client';
import React from 'react';

export default async function page() {
  const employees = await prisma.employee.findMany();
  return (
    <div className="m-2 space-y-2">
      <div
        className="group flex flex-col gap-2 rounded-lg bg-black p-5 text-white"
        tabIndex={1}
      >
        <div className="flex cursor-pointer items-center justify-between"></div>
        <div className="invisible h-auto max-h-0 items-center opacity-0 transition-all group-focus:visible group-focus:max-h-screen group-focus:opacity-100 group-focus:duration-1000">
          <Transaction />
        </div>
      </div>
    </div>
  );
}
