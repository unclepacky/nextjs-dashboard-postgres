import { UserCircleIcon } from '@heroicons/react/24/outline';
import React, { ReactElement } from 'react';

interface CustomerInputProps {
  disabled: boolean;
  required?: boolean;
  defaultValue: string;
  id: string;
  name: string;
  type: string;
  placeholder: string;
  icon: ReactElement;
  htmlFor: string;
  label: string;
}

export default function CustomerInput(props: CustomerInputProps) {
  return (
    <>
      <label htmlFor={props.htmlFor} className="mb-2 block text-sm font-medium">
        {props.label}
      </label>
      <div className="relative">
        <input
          disabled={props.disabled}
          defaultValue={props.defaultValue}
          required={props.required}
          id={props.id}
          name={props.name}
          type={props.type}
          placeholder={props.placeholder}
          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
        />
        <div className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500">
          {props.icon}
        </div>
      </div>
    </>
  );
}
