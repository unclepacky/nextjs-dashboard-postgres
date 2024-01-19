'use client';

import { ReactElement, useEffect, useRef, useState } from 'react';
import Items from './Items';
import { IconType } from 'react-icons';

interface DropDownProps {
  menuIcon: ReactElement; // TypeScript type annotation for the prop
  type?: string;
}

export default function DropDown({ menuIcon }: DropDownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const itemRefs = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (itemRefs.current && !itemRefs.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        type="submit"
        className="relative z-[2] m-0 flex h-6 w-6 cursor-pointer items-center justify-center rounded-[4px] border-0 bg-none p-0 align-top text-[#888] outline-none hover:bg-red-400 hover:text-white"
        style={{
          transition: 'background .2s,color .2s',
        }}
      >
        <span className="flex items-center justify-center ">
          {menuIcon}
          {/* <svg
            className="h-4 w-4 flex-shrink-0"
            fill="none"
            height="24"
            shapeRendering="geometricPrecision"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            width="24"
            style={{
              color: 'currentcolor',
              width: '16px',
              height: '16px',
            }}
          >
            <circle cx="12" cy="12" r="1" fill="currentColor"></circle>
            <circle cx="19" cy="12" r="1" fill="currentColor"></circle>
            <circle cx="5" cy="12" r="1" fill="currentColor"></circle>
          </svg> */}
        </span>
      </button>
      {isOpen && (
        <div ref={itemRefs}>
          <Items />
        </div>
      )}
    </div>
  );
}
