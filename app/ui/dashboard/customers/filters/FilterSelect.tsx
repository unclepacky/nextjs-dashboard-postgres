'use client';
import { CustomerType } from '@prisma/client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

// export default function TypeFilter({
//   type,
// }: {
//   type: CustomerType | undefined;
// }) {
//   const types = Object.values(CustomerType);
//   const searchParams = useSearchParams();
//   const pathname = usePathname();
//   const router = useRouter();

//   const safeType = type ?? types[0];
//   const filterType = types.includes(safeType) ? type : undefined;

//   return (
//     <select
//       defaultValue={filterType}
//       onChange={(e) => {
//         const selectedType = e.target.value;
//         const params = new URLSearchParams(searchParams);

//         if (selectedType) {
//           params.set('type', selectedType);
//         } else {
//           params.delete('type');
//         }
//         router.push(`${pathname}?${params.toString()}`);
//       }}
//     >
//       <option value="">Filter by Status...</option>
//       {Object.values(CustomerType).map((type) => (
//         <option key={type} value={type}>
//           {type}
//         </option>
//       ))}
//     </select>
//   );
// }

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
