import { UserCircleIcon } from '@heroicons/react/24/outline';
import React, { ReactElement } from 'react';

interface ExtensionInputProps {
  disabled?: boolean;
  required: boolean;
  id: string;
  name: string;
  type: string;
  placeholder: string;
  icon?: ReactElement;
  htmlFor: string;
  label: string;
  step?: string;
  defaultValue?: string;
  defaultChecked?: boolean;
  readOnly?: boolean;
}

export default function ExtensionInput(props: ExtensionInputProps) {
  const isCheckbox = props.type === 'checkbox';

  return (
    <>
      <label htmlFor={props.htmlFor} className="mb-2 block text-sm font-medium">
        {props.label}
      </label>
      {/* <div className={`relative ${isCheckbox ? 'flex items-center' : ''}`}> */}
      <div className={`relative`}>
        <input
          readOnly
          defaultChecked={props.defaultChecked}
          disabled={props.disabled}
          defaultValue={props.defaultValue}
          required={props.required}
          id={props.id}
          name={props.name}
          type={props.type}
          step={props.step}
          placeholder={props.placeholder}
          className={`peer ${
            isCheckbox
              ? 'mr-2 h-[16px] w-[16px] border-gray-400 '
              : 'block w-full rounded-md border-gray-200 py-2 pl-10 '
          }  border  text-sm outline-2 placeholder:text-gray-500`}
        />
        <div className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500">
          {props.icon}
        </div>
      </div>
    </>
  );
}
