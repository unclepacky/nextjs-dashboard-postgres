import React from 'react';
import MenuItem from './MenuItem';

import { unitDropDownMenu } from '@/app/lib/menu';

export default function Items() {
  return (
    <div
      // className=" absolute -bottom-5 left-5 z-[2001] overflow-hidden overscroll-contain rounded-md opacity-[1]"
      className=" absolute left-0 top-8 z-[2001] overflow-hidden overscroll-contain rounded-xl opacity-[1]"
      // style={{ transform: 'translate(130px, 210px)' }}
    >
      <ul
        className="m-0 -mt-[7px] w-[150px] p-2 text-sm outline-none"
        role="menu"
        tabIndex={-1}
      >
        {unitDropDownMenu.map((item) => (
          <li
            key={item.label}
            role="menuitem"
            tabIndex={-1}
            className="flex h-10 cursor-pointer items-center rounded-md px-2 py-0 outline-none "
          >
            <MenuItem menuItem={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
