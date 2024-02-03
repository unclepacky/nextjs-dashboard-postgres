'use client';
import { FlagIcon } from '@heroicons/react/24/outline';
import { Department } from '@prisma/client';
import React from 'react';

interface Employee {
  id: string;
  name: string;
  startDate: Date;
  email: string | null;
  phone: string | null;
  passport: string | null;
  nationality: string | null;
  department: Department;
  createdAt: Date;
  updateAt: Date;
}

interface EmployeeDropDownProps {
  employees: Employee[];
}

export default function EmployeeDropDown({ employees }: EmployeeDropDownProps) {
  return (
    <div className="mb-4">
      <label className="mb-2 block text-sm font-medium">Employee</label>
      <div className="relative">
        <select
          required
          id="employeeId"
          name="employeeId"
          className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          aria-describedby="units-error"
          disabled={false}
          defaultValue=""
          onClick={(e) => e.stopPropagation()} // Stop propagation to prevent accordion collapse
        >
          <option value="" disabled>
            Select employee
          </option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.name}
            </option>
          ))}
        </select>
        <FlagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
      </div>
    </div>
  );
}
