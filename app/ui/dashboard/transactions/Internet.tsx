import {
  CalendarIcon,
  CircleStackIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import React, { ChangeEvent, useEffect, useState } from 'react';
import ContractInput from '../contracts/ContractInput';

export default function Internet() {
  const [internetFee, setInternetFee] = useState('0');
  const [kwRate, setKwRate] = useState('0');
  const [startingCounter, setStartingCounter] = useState('0');
  const [endingCounter, setEndingCounter] = useState('0');

  const total = parseFloat(internetFee);

  function handleInternetFeeChange(e: ChangeEvent<HTMLInputElement>): void {
    setInternetFee(e.target.value);
  }

  return (
    <>
      {/* Starting Date */}
      <div className="flex justify-between">
        {/* Starting Date */}
        <div className="mb-4">
          <label
            htmlFor="startingDate"
            className="mb-2 block text-sm font-medium"
          >
            Starting Date
          </label>
          <div className={`relative`}>
            <input
              disabled={false}
              required
              id="startingDate"
              name="startingDate"
              type="date"
              placeholder="Enter Starting Date"
              className="block  w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <div className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500">
              <CalendarIcon />
            </div>
          </div>
        </div>
        {/* Ending Date */}
        <div className="mb-4">
          <label
            htmlFor="endingDate"
            className="mb-2 block text-sm font-medium"
          >
            Ending Date
          </label>
          <div className={`relative`}>
            <input
              disabled={false}
              required
              id="endingDate"
              name="endingDate"
              type="date"
              placeholder="Enter Ending Date"
              className="block  w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <div className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500">
              <CalendarIcon />
            </div>
          </div>
        </div>
      </div>

      {/* internet fee and total */}
      <div className="flex justify-between">
        {/* Internet Fee*/}
        <div className="mb-4">
          <label
            htmlFor="internetFee"
            className="mb-2 block text-sm font-medium"
          >
            Internet
          </label>
          <div className="relative">
            <input
              placeholder="Enter Internet monthly fee"
              onChange={(e) => handleInternetFeeChange(e)}
              type="text"
              name="internetFee"
              id="internetFee"
              value={internetFee}
              className="block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <div className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500">
              <UserCircleIcon />
            </div>
          </div>
        </div>

        {/*Total USD */}
        <div className="mb-4">
          <label htmlFor="total" className="mb-2 block text-sm font-medium">
            Total USD
          </label>
          <div className="relative">
            <input
              readOnly
              type="text"
              name="total"
              id="total"
              value={total}
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
