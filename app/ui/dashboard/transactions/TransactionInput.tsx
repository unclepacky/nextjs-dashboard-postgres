'use client';
import { FlagIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { Department, TransactionType } from '@prisma/client';
import React, { ChangeEvent, useEffect, useState } from 'react';
import ContractInput from '../contracts/ContractInput';

interface TransactionInputProps {
  selectedType: TransactionType | '';
  employees: Employee[]; // Add employees directly into TransactionInputProps
}

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

export default function TransactionInput({
  selectedType,
  employees,
}: TransactionInputProps) {
  const hourlyRate = 4; // Assuming an hourly rate of $4 for calculation

  const [totalAmount, setTotalAmount] = useState('0.00');

  // Function to format the current time to HH:mm format
  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const [fromTime, setFromTime] = useState(() => formatTime(new Date()));
  const [tillTime, setTillTime] = useState(() => formatTime(new Date()));

  // Function to calculate time difference in minutes
  const calculateTimeDifference = () => {
    const [fromHours, fromMinutes] = fromTime.split(':').map(Number);
    const [tillHours, tillMinutes] = tillTime.split(':').map(Number);

    const fromDate = new Date();
    fromDate.setHours(fromHours, fromMinutes, 0, 0);

    const tillDate = new Date();
    tillDate.setHours(tillHours, tillMinutes, 0, 0);

    const diff = (tillDate.getTime() - fromDate.getTime()) / 60000; // Difference in minutes

    // Calculate hours and minutes from the difference
    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;
    return `${hours}hr : ${Math.round(minutes)}min`; // Round minutes for display
  };

  // Effect to update total amount whenever fromTime or tillTime changes
  useEffect(() => {
    const diffInMinutes = calculateTimeDifference()
      .split(' : ')
      .reduce(
        (acc, value, index) =>
          acc + (index ? parseInt(value) / 60 : parseInt(value)),
        0,
      );
    const total = (diffInMinutes * hourlyRate).toFixed(2);
    setTotalAmount(total);
  }, [fromTime, tillTime]);

  // Handle change events for the time inputs
  const handleFromTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFromTime(e.target.value);
  };

  const handleTillTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTillTime(e.target.value);
  };

  return (
    <>
      <div className="flex justify-between">
        {/* Transaction Input */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">
            Select Employee
          </label>
          <div className="relative">
            <select
              required
              id="employeeType"
              name="employeeType"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="employeeType-error"
              disabled={false}
              defaultValue=""
            >
              <option value="" disabled>
                Select Employee
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
        {/* Hourly Rate */}
        <div className="mb-4">
          <ContractInput
            htmlFor="hourlyRate"
            label="Hourly Rate"
            disabled={false}
            required={true}
            id="hourlyRate"
            name="hourlyRate"
            type="number"
            placeholder="Enter hourly rate"
            step="0.01"
            defaultValue=""
            icon={<UserCircleIcon />}
          />
        </div>
      </div>
      <div className="flex justify-between">
        {/* From Time */}
        <div className="mb-4">
          <label htmlFor="fromTime" className="mb-2 block text-sm font-medium">
            From Time
          </label>
          <div className="relative">
            <input
              type="time"
              name="fromTime"
              id="fromTime"
              value={fromTime}
              onChange={(e) => handleFromTimeChange(e)}
              className="block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <div className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500">
              <UserCircleIcon />
            </div>
          </div>
        </div>
        {/* Till Time */}
        <div className="mb-4">
          <label htmlFor="fromTime" className="mb-2 block text-sm font-medium">
            Till Time
          </label>
          <div className="relative">
            <input
              type="time"
              name="tillTime"
              id="tillTime"
              value={tillTime}
              onChange={(e) => handleTillTimeChange(e)}
              className="block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <div className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500">
              <UserCircleIcon />
            </div>
          </div>
        </div>
        {/* Difference */}
        <div className="mb-4">
          <label htmlFor="timeDiff" className="mb-2 block text-sm font-medium">
            Time Spent
          </label>
          <div className="relative">
            <input
              readOnly
              type="text"
              name="timeDiff"
              id="timeDiff"
              value={calculateTimeDifference()}
              className="block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <div className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500">
              <UserCircleIcon />
            </div>
          </div>
        </div>
        {/* Total */}
        <div className="mb-4">
          <label htmlFor="fromTime" className="mb-2 block text-sm font-medium">
            Total
          </label>
          <div className="relative">
            <input
              type="Total"
              name="Total"
              id="Total"
              value={totalAmount}
              readOnly
              className="block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <div className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500">
              <UserCircleIcon />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
