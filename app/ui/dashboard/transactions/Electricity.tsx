import {
  CalendarIcon,
  CircleStackIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import React, { ChangeEvent, useEffect, useState } from 'react';
import ContractInput from '../contracts/ContractInput';

export default function Electricity() {
  const [kw, setKw] = useState('0');
  const [kwRate, setKwRate] = useState('0');
  const [startingCounter, setStartingCounter] = useState('0');
  const [endingCounter, setEndingCounter] = useState('0');

  function handleKwChange(e: ChangeEvent<HTMLInputElement>): void {
    setKw(e.target.value);
  }
  function handleKwRateChange(e: ChangeEvent<HTMLInputElement>): void {
    setKwRate(e.target.value);
  }

  function handleStartingCounterChange(e: ChangeEvent<HTMLInputElement>): void {
    setStartingCounter(e.target.value);
  }
  function handleEndingCounterChange(e: ChangeEvent<HTMLInputElement>): void {
    setEndingCounter(e.target.value);
  }
  const total = parseFloat(kw) * parseFloat(kwRate);

  // useEffect(() => {}, [startingCounter, endingCounter, kw, kwRate]);

  return (
    <>
      {/* Starting Date and Counter */}
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
        {/* Starting Counter */}
        <div className="mb-4">
          <label
            htmlFor="startingCounter"
            className="mb-2 block text-sm font-medium"
          >
            Starting Counter
          </label>
          <div className="relative">
            <input
              value={startingCounter}
              onChange={(e) => handleStartingCounterChange(e)}
              type="text"
              name="startingCounter"
              id="startingCounter"
              // value={calculateTimeDifference()}
              className="block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <div className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500">
              <UserCircleIcon />
            </div>
          </div>
        </div>
      </div>
      {/* Ending Date and Counter */}
      <div className="flex justify-between">
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
        {/* Ending Counter */}
        <div className="mb-4">
          <label
            htmlFor="endingCounter"
            className="mb-2 block text-sm font-medium"
          >
            Ending Counter
          </label>
          <div className="relative">
            <input
              value={endingCounter}
              onChange={(e) => handleEndingCounterChange(e)}
              type="text"
              name="endingCounter"
              id="endingCounter"
              className="block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <div className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500">
              <UserCircleIcon />
            </div>
          </div>
        </div>
      </div>
      {/* Diff and Totals */}
      <div className="flex justify-between">
        {/* Total KW*/}
        <div className="mb-4">
          <label htmlFor="kw" className="mb-2 block text-sm font-medium">
            Total Kw
          </label>
          <div className="relative">
            <input
              onChange={(e) => handleKwChange(e)}
              type="text"
              name="kw"
              id="kw"
              // value={parseFloat(endingCounter) - parseFloat(startingCounter)}
              value={kw}
              className="block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <div className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500">
              <UserCircleIcon />
            </div>
          </div>
        </div>
        {/* Kw Rate */}
        <div className="mb-4">
          <label htmlFor="kwRate" className="mb-2 block text-sm font-medium">
            Kw Rate
          </label>
          <div className="relative">
            <input
              type="text"
              name="kwRate"
              id="kwRate"
              value={kwRate}
              onChange={(e) => handleKwRateChange(e)}
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
