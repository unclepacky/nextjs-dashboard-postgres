import prisma from '@/prisma/client';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import React from 'react';

export default async function EmployeePage() {
  const employees = await prisma.employee.findMany();
  return (
    <>
      <div>List of Employees Goes here</div>
      {employees.map((emp) => (
        <div key={emp.id}>{emp.name}</div>
      ))}
      <Link href="/dashboard/employee/create">
        <PlusCircleIcon width={50} height={50} />
      </Link>
    </>
  );
}
