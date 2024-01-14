import { BuildingOffice2Icon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import ThemeSwitcher from './ThemeSwitcher';

export default function Header() {
  return (
    <header className="">
      <Link href="/">
        <span className="z-header fixed left-6 top-5 hidden text-xl md:inline-flex">
          <BuildingOffice2Icon width={25} height={25} className="" />
        </span>
      </Link>
      <nav className="h-header relative m-auto flex select-none items-center px-4 py-0 md:px-6">
        <div className="z-10 flex min-w-0 flex-1 items-center pr-6">
          <ol className="m-0 flex max-w-full items-center p-0">
            <li className="hidden h-5 w-6 min-w-0 flex-shrink-0 flex-grow-0 text-sm md:flex"></li>
            <li className=" mx-1.5 my-0 hidden flex-shrink-0 flex-grow-0 md:flex">
              <span className="flex-shrink-0 text-xl">
                <BuildingOffice2Icon width={25} height={25} className="" />
              </span>
            </li>
            <li className="flex min-w-0 flex-grow-0 text-sm">
              <div className=" flex flex-initial flex-row items-center justify-start gap-0 ">
                <div className="flex w-full items-center">
                  <Link href="/" className="min-w-0 max-w-full">
                    <div className="flex flex-row items-center justify-start gap-0">
                      <span className="ease custom-img relative inline-block h-8 w-8 flex-shrink-0 cursor-pointer overflow-hidden rounded-full border align-top transition duration-200">
                        <Image
                          src="/avatar.png"
                          width={32}
                          height={32}
                          alt="profile pic"
                          className="h-full w-full max-w-full text-transparent"
                        />
                      </span>
                      <p className=" px-2 text-sm font-bold">Uncle Packy</p>
                      <div>
                        <span className="flex  h-5  items-center  justify-center whitespace-nowrap rounded-full px-1.5 py-0 text-xs font-semibold capitalize ">
                          Reception
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
                <button
                  type="button"
                  className="ml-1 h-10 w-7 max-w-full flex-shrink-0 items-center justify-center rounded-md border-transparent bg-none p-0 text-xs font-semibold shadow-sm "
                >
                  <span className="inline-block overflow-ellipsis whitespace-nowrap px-2 py-0 ">
                    <svg
                      aria-hidden="true"
                      fill="none"
                      height="16"
                      strokeWidth="1.5"
                      viewBox="0 0 16 24"
                      className=""
                    >
                      <path d="M13 8.517L8 3 3 8.517M3 15.48l5 5.517 5-5.517"></path>
                    </svg>
                  </span>
                </button>
              </div>
            </li>
          </ol>
        </div>
        <div className="z-10 flex min-w-0 flex-shrink-0 flex-grow-0 items-center justify-end">
          <div className="flex items-center">
            <div className="flex items-center">
              <button className="m-0 h-8 rounded-md border-2 px-2 py-0 text-sm font-normal ">
                <span className="overflow-hidden overflow-ellipsis whitespace-nowrap px-2 py-0">
                  Feedback
                </span>
              </button>
            </div>
            <div
              className="mx-2 my-0 flex items-center "
              style={{ transition: 'none 0s ease 0s' }}
            >
              <Link
                href="\"
                className=" text-button-txtlight cursor-pointer rounded-full px-3 py-2 text-sm outline-none "
                style={{ transition: 'color.2s ease' }}
              >
                Changelog
              </Link>
              <Link
                href="\"
                className=" text-button-txtlight cursor-pointer rounded-full px-3 py-2 text-sm outline-none "
                style={{ transition: 'color.2s ease' }}
              >
                Help
              </Link>
              <Link
                href="\"
                className=" text-button-txtlight cursor-pointer rounded-full px-3 py-2 text-sm outline-none"
                style={{ transition: 'color.2s ease' }}
              >
                Docs
              </Link>
            </div>
            <div className="flex flex-row items-center justify-start gap-2 p-0">
              <div>
                <button
                  className=" relative ml-auto grid h-8 w-max min-w-[32px] place-items-center rounded-full p-[5px] outline-none"
                  style={{
                    transitionProperty: 'box-shadow',
                    transitionDuration: '.15s',
                    transitionTimingFunction: 'ease',
                    border: '1px solid hsla(0, 0%, 100%,0.14)',
                    backfaceVisibility: 'hidden',
                    transform: 'translateZ(0)',
                  }}
                >
                  <span className="flex items-center">
                    <div className="grid place-items-center">
                      <svg
                        height="16"
                        strokeLinejoin="round"
                        viewBox="0 0 16 16"
                        width="16"
                        style={{
                          width: '16px',
                          height: '16px',
                          color: 'hsla(0, 0%, 63%,1)',
                        }}
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M7.9925 0C4.95079 0 2.485 2.46579 2.485 5.5075V8.22669C2.485 8.77318 2.21321 9.28388 1.75992 9.58912L1.33108 9.8779L1 10.1009V10.5V11.25V12H1.75H14.25H15V11.25V10.5V10.0986L14.666 9.87596L14.2306 9.58565C13.7741 9.28137 13.5 8.76913 13.5 8.22059V5.5075C13.5 2.46579 11.0342 0 7.9925 0ZM3.985 5.5075C3.985 3.29422 5.77922 1.5 7.9925 1.5C10.2058 1.5 12 3.29422 12 5.5075V8.22059C12 9.09029 12.36 9.91233 12.9801 10.5H3.01224C3.62799 9.91235 3.985 9.09303 3.985 8.22669V5.5075ZM10.7486 13.5H9.16778L9.16337 13.5133C9.09591 13.716 8.94546 13.9098 8.72067 14.0501C8.52343 14.1732 8.27577 14.25 8.00002 14.25C7.72426 14.25 7.47661 14.1732 7.27936 14.0501C7.05458 13.9098 6.90412 13.716 6.83666 13.5133L6.83225 13.5H5.25143L5.41335 13.9867C5.60126 14.5516 5.99263 15.0152 6.48523 15.3226C6.92164 15.5949 7.44461 15.75 8.00002 15.75C8.55542 15.75 9.07839 15.5949 9.5148 15.3226C10.0074 15.0152 10.3988 14.5516 10.5867 13.9867L10.7486 13.5Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </div>
                  </span>
                </button>
              </div>
              <div className="relative inline-flex">
                <div className="inline-flex max-w-full outline-none">
                  <div className="cursor-pointer">
                    <button
                      className="m-0 cursor-pointer rounded-full border-0 bg-transparent p-0"
                      style={{
                        appearance: 'unset',
                        textAlign: 'unset',
                        font: 'unset',
                      }}
                    >
                      <span
                        className="custom-img-right relative inline-block h-8 w-8 overflow-hidden rounded-full border-2 align-top"
                        role="img"
                        style={{
                          transition: 'border .2s ease,background .2s ease',
                        }}
                      >
                        <Image
                          alt="unclepacky"
                          title="unclepacky"
                          loading="eager"
                          width="32"
                          height="32"
                          className="h-full w-full max-w-full"
                          src="/avatar.png"
                          style={{ color: 'transparent' }}
                        />
                      </span>
                    </button>
                  </div>
                </div>
                <div className="popover_menu__X_Gc9" role="menu"></div>
              </div>
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
