import { UnitDropDownTypes } from '@/app/lib/menu';
import { CiEdit, CiBoxList, CiLogin } from 'react-icons/ci';
import CustomIcon from '../icons/CustomIcon';

export default function MenuItem({
  menuItem,
}: {
  menuItem: UnitDropDownTypes;
}) {
  return (
    <div
      className="-mx-2 my-0 flex h-full cursor-pointer items-center justify-between px-2 py-0 text-sm"
      style={{ width: 'calc(100% + 16px)' }}
    >
      <div>{menuItem.label}</div>
      <div>
        <CustomIcon
          icon={menuItem.icon}
          width="20px"
          height="20px"
          color="white"
          // stroke="#444"
        />
      </div>
    </div>
  );
}

{
  /* <span className="h-4">
        <div className="relative">
          <svg
            height="16"
            strokeLinejoin="round"
            viewBox="0 0 16 16"
            width="16"
            className="dark:text-button-txt"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.00001 0.433594L8.65845 1.64093L10.5908 5.18412L14.5577 5.92698L15.9094 6.18011L14.9646 7.17942L12.192 10.1121L12.7113 14.1144L12.8883 15.4782L11.6459 14.8884L8.00001 13.1577L4.35408 14.8884L3.11173 15.4782L3.28869 14.1144L3.80802 10.1121L1.03538 7.17942L0.0906067 6.18011L1.44233 5.92698L5.40922 5.18412L7.34156 1.64093L8.00001 0.433594ZM8.00001 3.56646L6.55565 6.21487L6.38519 6.52743L6.03525 6.59296L3.07014 7.14822L5.14259 9.34029L5.38718 9.59899L5.34137 9.95205L4.95318 12.9436L7.67838 11.65L8.00001 11.4973L8.32163 11.65L11.0468 12.9436L10.6586 9.95205L10.6128 9.59899L10.8574 9.34029L12.9299 7.14822L9.96476 6.59296L9.61482 6.52743L9.44436 6.21487L8.00001 3.56646Z"
              fill="currentColor"
            ></path>
          </svg>
          <div className="absolute -left-1 -top-1 block h-6 w-6">
            <div className="absolute h-[6px] w-[6px] cursor-pointer text-sm dark:text-purple-700">
              <svg
                fill="none"
                height="6"
                viewBox="0 0 6 6"
                width="6"
                xmlns="http://www.w3.org/2000/svg"
                className="block "
                style={{
                  transition: 'transform var(200ms,.2s) ease-out 50ms',
                  transform: 'translate(6,6) scale(0)',
                }}
              >
                <path
                  d="M2.5 0.5V0H3.5V0.5C3.5 1.60457 4.39543 2.5 5.5 2.5H6V3V3.5H5.5C4.39543 3.5 3.5 4.39543 3.5 5.5V6H3H2.5V5.5C2.5 4.39543 1.60457 3.5 0.5 3.5H0V3V2.5H0.5C1.60457 2.5 2.5 1.60457 2.5 0.5Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <div className="absolute h-[6px] w-[6px] cursor-pointer dark:border-[#333] dark:text-amber-700">
              <svg
                fill="none"
                height="6"
                viewBox="0 0 6 6"
                width="6"
                xmlns="http://www.w3.org/2000/svg"
                className="block "
                style={{
                  transition: 'transform var(200ms,.2s) ease-out 50ms',
                  transform: 'translate(6,6) scale(0)',
                }}
              >
                <path
                  d="M2.5 0.5V0H3.5V0.5C3.5 1.60457 4.39543 2.5 5.5 2.5H6V3V3.5H5.5C4.39543 3.5 3.5 4.39543 3.5 5.5V6H3H2.5V5.5C2.5 4.39543 1.60457 3.5 0.5 3.5H0V3V2.5H0.5C1.60457 2.5 2.5 1.60457 2.5 0.5Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <div className="absolute h-[6px] w-[6px] cursor-pointer dark:text-pink-700">
              <svg
                fill="none"
                height="6"
                viewBox="0 0 6 6"
                width="6"
                xmlns="http://www.w3.org/2000/svg"
                className="block "
                style={{
                  transition: 'transform var(200ms,.2s) ease-out 50ms',
                  transform: 'translate(6,6) scale(0)',
                }}
              >
                <path
                  d="M2.5 0.5V0H3.5V0.5C3.5 1.60457 4.39543 2.5 5.5 2.5H6V3V3.5H5.5C4.39543 3.5 3.5 4.39543 3.5 5.5V6H3H2.5V5.5C2.5 4.39543 1.60457 3.5 0.5 3.5H0V3V2.5H0.5C1.60457 2.5 2.5 1.60457 2.5 0.5Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <div className="absolute h-[6px] w-[6px] cursor-pointer dark:text-teal-700">
              <svg
                fill="none"
                height="6"
                viewBox="0 0 6 6"
                width="6"
                xmlns="http://www.w3.org/2000/svg"
                className="block "
                style={{
                  transition: 'transform var(200ms,.2s) ease-out 50ms',
                  transform: 'translate(6,6) scale(0)',
                }}
              >
                <path
                  d="M2.5 0.5V0H3.5V0.5C3.5 1.60457 4.39543 2.5 5.5 2.5H6V3V3.5H5.5C4.39543 3.5 3.5 4.39543 3.5 5.5V6H3H2.5V5.5C2.5 4.39543 1.60457 3.5 0.5 3.5H0V3V2.5H0.5C1.60457 2.5 2.5 1.60457 2.5 0.5Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <div className="absolute h-[6px] w-[6px] cursor-pointer dark:text-blue-700">
              <svg
                fill="none"
                height="6"
                viewBox="0 0 6 6"
                width="6"
                xmlns="http://www.w3.org/2000/svg"
                className="block "
                style={{
                  transition: 'transform var(200ms,.2s) ease-out 50ms',
                  transform: 'translate(6,6) scale(0)',
                }}
              >
                <path
                  d="M2.5 0.5V0H3.5V0.5C3.5 1.60457 4.39543 2.5 5.5 2.5H6V3V3.5H5.5C4.39543 3.5 3.5 4.39543 3.5 5.5V6H3H2.5V5.5C2.5 4.39543 1.60457 3.5 0.5 3.5H0V3V2.5H0.5C1.60457 2.5 2.5 1.60457 2.5 0.5Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </span> */
}
