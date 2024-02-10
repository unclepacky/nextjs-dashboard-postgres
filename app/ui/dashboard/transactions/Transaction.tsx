'use client';
import {
  Block,
  CurrencyEnum,
  Department,
  TransactionType,
  UnitType,
} from '@prisma/client';
import React, { ChangeEvent, useState } from 'react';

import {
  BanknotesIcon,
  BuildingOffice2Icon,
  CalendarDaysIcon,
  CheckCircleIcon,
  FlagIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';
import { TbBed } from 'react-icons/tb';
import TransactionInput from './TransactionInput';
import transactionComponents from '@/app/lib/TransactionComponents';

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

const statusColors = {
  CLEANING: {
    color: 'bg-green-300',
    Icon: CheckCircleIcon, // Note the capital 'I' in Icon, indicating a component
  },
  INTERNET: {
    color: 'bg-blue-300',
    Icon: TbBed,
  },
  ELECTRICITY: {
    color: 'bg-red-300',
    Icon: WrenchScrewdriverIcon,
  },
  MAINTENANCE: {
    color: 'bg-orange-300',
    Icon: CalendarDaysIcon,
  },
  RENT: {
    color: 'bg-orange-300',
    Icon: CalendarDaysIcon,
  },
  PAYMENT: {
    color: 'bg-orange-300',
    Icon: CalendarDaysIcon,
  },
  CREDIT: {
    color: 'bg-orange-300',
    Icon: CalendarDaysIcon,
  },
  DEBIT: {
    color: 'bg-orange-300',
    Icon: CalendarDaysIcon,
  },
  TRANSFER: {
    color: 'bg-orange-300',
    Icon: CalendarDaysIcon,
  },
};

export default function Transaction({ employees }: EmployeeDropDownProps) {
  // State to keep track of the selected type
  const [selectedType, setSelectedType] = useState<TransactionType | ''>(
    'CLEANING',
  );

  const transactionTypeValues = Object.values(TransactionType);

  // Handler to update state and log the selection
  const handleSelectionChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedValue = e.target.value as TransactionType;

    // Check if selectedValue is a valid TransactionType
    if (transactionTypeValues.includes(selectedValue)) {
      setSelectedType(selectedValue);
    } else {
      setSelectedType(''); // Or handle the error as appropriate
    }
  };

  // Dynamically select the component based on the selectedType
  // Only attempt to access the map if selectedType is a valid TransactionType
  const SelectedTransactionComponent = selectedType
    ? transactionComponents[selectedType]
    : null;

  return (
    <>
      <div className="flex flex-1 flex-col justify-start">
        <fieldset className="mb-4">
          <legend className="mb-2 block text-sm font-medium">
            Set the Transaction Type
          </legend>
          <div className=" w-full rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex flex-wrap gap-9">
              {Object.values(TransactionType).map((type) => {
                const StatusIcon = statusColors[type].Icon; // Capitalize the variable name
                return (
                  <div key={type} className="flex w-1/4 items-center">
                    <input
                      disabled={false}
                      required
                      id={type}
                      name="type"
                      type="radio"
                      value={type}
                      checked={selectedType === type}
                      onChange={(e) => handleSelectionChange(e)}
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
      </div>
      {/* Dynamically render the selected component, or null if selectedType is not set */}
      <div className="flex flex-1 flex-col justify-start">
        {SelectedTransactionComponent ? (
          <SelectedTransactionComponent
            selectedType={selectedType as TransactionType}
            employees={employees}
          />
        ) : null}
      </div>
    </>
  );
}
