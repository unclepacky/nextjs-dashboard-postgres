'use client';
import {
  BanknotesIcon,
  CalendarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { CurrencyEnum } from '@prisma/client';
import { curencyRate } from '@/app/lib/actions';

export default function Payment() {
  const [firstAmount, setFirstAmount] = useState('0');
  const [secondAmount, setSecondAmount] = useState('0');
  const [firstCurrency, setFirstCurrency] = useState<CurrencyEnum>('USD');
  const [secondCurrency, setSecondCurrency] = useState<CurrencyEnum>('USD');
  const [firstCurrencyRate, setFirstCurrencyRate] = useState(1);
  const [secondCurrencyRate, setSecondCurrencyRate] = useState(1);

  const totalFirstAmount = parseFloat(
    (firstCurrency === 'USD'
      ? parseFloat(firstAmount) * firstCurrencyRate
      : parseFloat(firstAmount) / firstCurrencyRate
    ).toFixed(2),
  );
  const totalSecondAmount = parseFloat(
    (secondCurrency === 'USD'
      ? parseFloat(secondAmount) * secondCurrencyRate
      : parseFloat(secondAmount) / secondCurrencyRate
    ).toFixed(2),
  );

  const total = (totalFirstAmount + totalSecondAmount).toFixed(2);

  function handleFirstAmountChange(e: ChangeEvent<HTMLInputElement>): void {
    setFirstAmount(e.target.value);
  }
  function handleSecondAmountChange(e: ChangeEvent<HTMLInputElement>): void {
    setSecondAmount(e.target.value);
  }
  function handleFirstCurrencyChange(e: ChangeEvent<HTMLSelectElement>): void {
    setFirstCurrency(e.target.value as CurrencyEnum);
  }
  function handleSecondCurrencyChange(e: ChangeEvent<HTMLSelectElement>): void {
    setSecondCurrency(e.target.value as CurrencyEnum);
  }

  useEffect(() => {
    async function fetchCurrencyRate() {
      const firstRate = await curencyRate(firstCurrency);
      if (firstRate) {
        setFirstCurrencyRate(firstRate);
      }
      const secondRate = await curencyRate(secondCurrency);
      if (secondRate) {
        setSecondCurrencyRate(secondRate);
      }
    }
    fetchCurrencyRate();
  }, [firstCurrency, secondCurrency]);

  return (
    <>
      {/* Starting Date and Currency */}
      <div className="flex justify-between">
        {/* Payment Date */}
        <div className="mb-4">
          <label
            htmlFor="paymentDate"
            className="mb-2 block text-sm font-medium"
          >
            Payment Date
          </label>
          <div className={`relative`}>
            <input
              defaultValue={new Date().toISOString().substring(0, 10)}
              disabled={false}
              required
              id="paymentDate"
              name="paymentDate"
              type="date"
              placeholder="Enter payment date"
              className="block  w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <div className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500">
              <CalendarIcon />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        {/* firstAmount*/}
        <div className="mb-4 flex-1">
          <label
            htmlFor="firstAmount"
            className="mb-2 block text-sm font-medium"
          >
            Amount
          </label>
          <div className="relative">
            <input
              placeholder="Enter amount"
              onChange={(e) => handleFirstAmountChange(e)}
              type="text"
              name="firstAmount"
              id="firstAmount"
              value={firstAmount}
              className="block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <div className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500">
              <UserCircleIcon />
            </div>
          </div>
        </div>
        {/* Currency */}
        <div className="mb-4 flex-1">
          <label className="mb-2 block text-sm font-medium">
            Choose a currency
          </label>
          <div className="relative">
            <select
              id="firstCurrency"
              name="firstCurrency"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="currency-error"
              disabled={false}
              value={firstCurrency}
              onChange={(e) => handleFirstCurrencyChange(e)}
              required
            >
              <option value="" disabled>
                Select a currency
              </option>
              {Object.values(CurrencyEnum).map((cur) => (
                <option key={cur} value={cur}>
                  {cur}
                </option>
              ))}
            </select>
            <BanknotesIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>
        {/*in  USD */}
        <div className="mb-4 flex-1">
          <label htmlFor="amountUsd" className="mb-2 block text-sm font-medium">
            In USD
          </label>
          <div className="relative">
            <input
              readOnly
              type="text"
              name="amountUsd"
              id="amountUsd"
              value={totalFirstAmount}
              className="block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <div className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500">
              <UserCircleIcon />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        {/* Second Amount*/}
        <div className="mb-4 flex-1">
          <label
            htmlFor="secondAmount"
            className="mb-2 block text-sm font-medium"
          >
            Amount
          </label>
          <div className="relative">
            <input
              placeholder="Enter amount"
              onChange={(e) => handleSecondAmountChange(e)}
              type="text"
              name="secondAmount"
              id="secondAmount"
              value={secondAmount}
              className="block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <div className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500">
              <UserCircleIcon />
            </div>
          </div>
        </div>
        {/* Currency */}
        <div className="mb-4 flex-1">
          <label className="mb-2 block text-sm font-medium">
            Choose a currency
          </label>
          <div className="relative">
            <select
              id="secondCurrency"
              name="secondCurrency"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="secondCurrency-error"
              disabled={false}
              value={secondCurrency}
              onChange={(e) => handleSecondCurrencyChange(e)}
              required
            >
              <option value="" disabled>
                Select a currency
              </option>
              {Object.values(CurrencyEnum).map((cur) => (
                <option key={cur} value={cur}>
                  {cur}
                </option>
              ))}
            </select>
            <BanknotesIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>
        {/*Amount in  USD */}
        <div className="mb-4 flex-1">
          <label
            htmlFor="secondAmountUsd"
            className="mb-2 block text-sm font-medium"
          >
            In USD
          </label>
          <div className="relative">
            <input
              readOnly
              type="text"
              name="secondAmountUsd"
              id="secondAmountUsd"
              value={totalSecondAmount}
              className="block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <div className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500">
              <UserCircleIcon />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        {/*Total in  USD */}
        <div className="mb-4 w-1/3">
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
      <span>
        {firstCurrencyRate} and {secondCurrencyRate}
      </span>
    </>
  );
}
