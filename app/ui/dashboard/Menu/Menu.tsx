import Link from 'next/link';
import React from 'react';

export default function Menu() {
  return (
    <div
      className="sticky top-0 -mt-[10px] flex flex-initial flex-row items-center justify-start gap-x-0 gap-y-0 overflow-x-auto p-0"
      style={{
        zIndex: 'calc(var(--header-zindex) - 1)',
        boxShadow: 'inset 0 -1px hsla(0,0%,100%,.14)',
      }}
    >
      <div className="flex transform-none items-center px-4 py-0">
        <Link
          className="relative inline-block flex-shrink-0 px-3 py-4 text-sm font-normal"
          href="/dashboard"
        >
          <div
            className="absolute left-0 right-0 top-2 z-[-1] h-8 transform-none rounded-[4px] opacity-0"
            style={{ contain: 'strict', background: 'hsla( 0,0%,12% ,1)' }}
          ></div>
          <div className="absolute bottom-0 left-2 right-2 block h-0 border-b-2 border-white"></div>
          Overview
        </Link>
        <Link
          className="relative inline-block flex-shrink-0 px-3 py-4 text-sm font-normal"
          href="/dashboard/customers"
        >
          <div
            className="absolute left-0 right-0 top-2 z-[-1] h-8 transform-none rounded-[4px] opacity-0"
            style={{ contain: 'strict', background: 'hsla( 0,0%,12% ,1)' }}
          ></div>
          {/* <div className="absolute bottom-0 left-2 right-2 block h-0 border-b-2 border-white"></div> */}
          Customers
        </Link>
        <Link
          className="relative inline-block flex-shrink-0 px-3 py-4 text-sm font-normal"
          href="/dashboard/units"
        >
          <div
            className="absolute left-0 right-0 top-2 z-[-1] h-8 transform-none rounded-[4px] opacity-0"
            style={{ contain: 'strict', background: 'hsla( 0,0%,12% ,1)' }}
          ></div>
          {/* <div className="absolute bottom-0 left-2 right-2 block h-0 border-b-2 border-white"></div> */}
          Units
        </Link>
        <Link
          className="relative inline-block flex-shrink-0 px-3 py-4 text-sm font-normal"
          href="/"
        >
          <div
            className="absolute left-0 right-0 top-2 z-[-1] h-8 transform-none rounded-[4px] opacity-0"
            style={{ contain: 'strict', background: 'hsla( 0,0%,12% ,1)' }}
          ></div>
          {/* <div className="absolute bottom-0 left-2 right-2 block h-0 border-b-2 border-white"></div> */}
          Domains
        </Link>
        <Link
          className="relative inline-block flex-shrink-0 px-3 py-4 text-sm font-normal"
          href="/"
        >
          <div
            className="absolute left-0 right-0 top-2 z-[-1] h-8 transform-none rounded-[4px] opacity-0"
            style={{ contain: 'strict', background: 'hsla( 0,0%,12% ,1)' }}
          ></div>
          {/* <div className="absolute bottom-0 left-2 right-2 block h-0 border-b-2 border-white"></div> */}
          Usage
        </Link>
        <Link
          className="relative inline-block flex-shrink-0 px-3 py-4 text-sm font-normal"
          href="/"
        >
          <div
            className="absolute left-0 right-0 top-2 z-[-1] h-8 transform-none rounded-[4px] opacity-0"
            style={{ contain: 'strict', background: 'hsla( 0,0%,12% ,1)' }}
          ></div>
          {/* <div className="absolute bottom-0 left-2 right-2 block h-0 border-b-2 border-white"></div> */}
          Monitoring
        </Link>
        <Link
          className="relative inline-block flex-shrink-0 px-3 py-4 text-sm font-normal"
          href="/"
        >
          <div
            className="absolute left-0 right-0 top-2 z-[-1] h-8 transform-none rounded-[4px] opacity-0"
            style={{ contain: 'strict', background: 'hsla( 0,0%,12% ,1)' }}
          ></div>
          {/* <div className="absolute bottom-0 left-2 right-2 block h-0 border-b-2 border-white"></div> */}
          Storage
        </Link>
        <Link
          className="relative inline-block flex-shrink-0 px-3 py-4 text-sm font-normal"
          href="/"
        >
          <div
            className="absolute left-0 right-0 top-2 z-[-1] h-8 transform-none rounded-[4px] opacity-0"
            style={{ contain: 'strict', background: 'hsla( 0,0%,12% ,1)' }}
          ></div>
          {/* <div className="absolute bottom-0 left-2 right-2 block h-0 border-b-2 border-white"></div> */}
          Settings
        </Link>
      </div>
    </div>
  );
}
