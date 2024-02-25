'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

export default function FilterSelect({
  options,
  value,
  queryParamName,
  placeholder = 'Filter...',
}: {
  options: { value: string; label: string }[];
  value: string | undefined;
  queryParamName: string;
  placeholder?: string;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <select
      defaultValue={value}
      onChange={(e) => {
        const params = new URLSearchParams(searchParams);
        const selectedValue = e.target.value;
        params.set('page', '1');
        if (selectedValue) {
          params.set(queryParamName, selectedValue);
        } else {
          params.delete(queryParamName);
        }
        router.push(`${pathname}?${params.toString()}`);
      }}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
