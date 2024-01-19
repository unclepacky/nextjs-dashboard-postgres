import Link from 'next/link';
import CustomIcon from '@/app/(tools)/icons/CustomIcon';
import { IconType } from 'react-icons';
import DropDown from '@/app/(tools)/dropdown/DropDown';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { BiBell } from 'react-icons/bi'; // Example of importing a react-icon

interface Props {
  icon: IconType;
}

export default function CardOverview({ icon }: Props) {
  const occupancy = 89;
  return (
    <div
      className="hover-box-shadow relative flex h-[176px] flex-col items-stretch justify-between gap-3 rounded-lg px-4  py-5 dark:bg-black"
      style={{
        boxShadow: '0 0 0 1px hsla(0,0%,100%,.145),0 4px 6px rgba(0,0,0,.04)',
        transition: 'box-shadow .15s ease',
      }}
    >
      {/* UNIT HEADER */}
      <div className="UNIT_HEADER flex flex-initial flex-col items-stretch justify-start gap-0 p-0 ">
        <section className="flex flex-initial flex-row items-center justify-start gap-4 p-0">
          <div className="flex min-w-0 flex-1 flex-row items-center justify-start gap-4 p-0">
            <div className="-mr-1 self-start">
              <span
                className="relative flex h-9 w-9  items-center justify-center overflow-hidden rounded-[50%] bg-black align-top"
                style={{
                  boxShadow: '0 0 0 1px #fff',
                  border: '1px solid hsla(0, 0%, 30%, 1)',
                }}
              >
                <CustomIcon
                  icon={icon}
                  width="20px"
                  height="20px"
                  color="white"
                  stroke="#444"
                />
              </span>
            </div>
            <div className="flex w-auto min-w-0 flex-1 flex-row items-center justify-start gap-2">
              <div className="flex min-w-0 flex-1 flex-col items-stretch justify-start gap-0">
                <p className="dark:text-header-text m-0 inline-block min-w-0 max-w-full overflow-hidden overflow-ellipsis whitespace-nowrap break-normal text-sm font-medium">
                  <Link href="\" className="relative z-[2] min-w-0">
                    Total Units : 250
                  </Link>
                </p>
                <p className="dark:text-button-txt m-0 inline-block min-w-0 max-w-full overflow-hidden overflow-ellipsis whitespace-nowrap break-normal text-xs font-medium">
                  Studios: 150 / Suites: 100
                </p>
              </div>
            </div>
          </div>
          <div className="ml-auto flex flex-initial flex-row items-center justify-start gap-4">
            <div className="flex flex-initial flex-row items-center justify-start gap-[10px]">
              <Link href="\" className="relative z-[2] inline-flex">
                <span className="inline-flex items-center gap-2">
                  <div
                    className="relative flex flex-col items-center justify-center"
                    style={{ transform: 'translateZ(0)' }}
                  >
                    <svg
                      fill="none"
                      height="32"
                      strokeWidth="2"
                      viewBox="0 0 100 100"
                      width="32"
                    >
                      <circle
                        style={{
                          opacity: '1',
                          strokeDasharray:
                            'calc( 99 * 2.827433388230814px ) 282.7433388230814',
                          transform:
                            'rotate(calc(1turn - 90deg - ( 0 * 3.6deg * calc(1 - 0 )))) scaleY(-1)',
                          transition: 'all 1s ease 0s',
                          transformOrigin: 'calc( 100px / 2) calc( 100px / 2)',
                        }}
                        cx="50"
                        cy="50"
                        r="45"
                        strokeWidth="10"
                        strokeDashoffset="0"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="gauge_arcSecondary__s11_g"
                        stroke="#ffffff24"
                      ></circle>
                      <circle
                        style={{
                          opacity: '0',
                          strokeDasharray:
                            'calc( 0 * 2.827433388230814px ) 282.7433388230814',
                          transform: 'rotate(calc(-90deg + 0 * 0 * 3.6deg))',
                          transition: '1s ease 0s , stroke 1s ease 0s',
                          transitionProperty: 'stroke-dasharray,transform',
                          transformOrigin: 'calc( 100px / 2) calc( 100px / 2)',
                        }}
                        cx="50"
                        cy="50"
                        r="45"
                        strokeWidth="10"
                        strokeDashoffset="0"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="gauge_arc__UGu7u"
                        stroke="#ff4e42"
                      ></circle>
                    </svg>
                    <div className="absolute flex h-[18px] w-[18px] opacity-0">
                      <span className="flex h-[18px] w-[18px] text-xs font-medium dark:text-[#a1a1a1]">
                        <svg
                          className="flex-shrink-0 gap-2 dark:text-[#444]"
                          style={{
                            color: '#444',
                            width: '18px',
                            height: '18px',
                          }}
                          fill="none"
                          height="24"
                          shapeRendering="geometricPrecision"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          width="24"
                        >
                          <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                </span>
              </Link>
              {/* <DropDown
                menuIcon={<BiBell width={20} height={20} />} */}
              <DropDown
                menuIcon={<EllipsisHorizontalIcon width={20} height={20} />}
              />
              {/* <CardOverview icon={UnitIcon} /> */}
            </div>
          </div>
        </section>
      </div>
      {/* Unit details section */}
      <section className="UNIT-DETAILS-SECTION flex h-full items-center  justify-between gap-2 text-xs">
        <div className="dark:border-header-light h-full  min-w-0 flex-1 whitespace-nowrap rounded-lg border-[1px] px-2 py-3">
          <div className="flex flex-col items-center justify-center gap-2">
            <span>Vacant Studios</span>
            <span className="text-3xl">23</span>
          </div>
        </div>
        <div className="dark:border-header-light h-full  min-w-0 flex-1 whitespace-nowrap rounded-lg border-[1px] px-2 py-3">
          <div className="flex flex-col items-center justify-center gap-2">
            <span>Vacant Suites</span>
            <span className="text-3xl">10</span>
          </div>
        </div>
        <div className="dark:border-header-light h-full min-w-0 flex-1 whitespace-nowrap rounded-lg border-[1px] px-2 py-3">
          <div className="flex flex-col items-center justify-center gap-2">
            <span>Occupancy</span>
            {occupancy < 90 ? (
              <span className="text-3xl dark:text-red-300">{occupancy}%</span>
            ) : (
              <span className="text-3xl dark:text-green-300">{occupancy}%</span>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
