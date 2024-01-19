import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';

// const iconMap = {
//   invoices: BanknotesIcon,
//   customers: UserGroupIcon,
//   pending: ClockIcon,
//   collected: InboxIcon,
// };

// const totalPaidInvoices = '12567';
// const totalPendingInvoices = '30574';
// const numberOfInvoices = '20';
// const numberOfCustomers = '205';

const iconMap = {
  invoices: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  collected: InboxIcon,
};

const totalPaidInvoices = '12567';
const totalPendingInvoices = '30574';
const numberOfInvoices = {
  rent: 20540,
  internet: 2200,
  cleaning: 800,
};
const numberOfCustomers = '205';

export default function CardSummary() {
  return (
    <>
      <Card title="Collected" value={totalPaidInvoices} type="collected" />
      <Card title="Pending" value={totalPendingInvoices} type="pending" />
      {/* Pass the numberOfInvoices object as a prop */}
      <Card
        title="Invoices Breakdown"
        value={numberOfInvoices}
        type="invoices"
      />
      <Card
        title="Total Customers"
        value={numberOfCustomers}
        type="customers"
      />
    </>
  );
}
export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string | { [key: string]: number };
  type: 'invoices' | 'customers' | 'pending' | 'collected';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm dark:bg-black">
      <div className="flex p-4 ">
        {Icon ? (
          <Icon className="h-5 w-5 text-gray-700 dark:text-white" />
        ) : null}
        <h3 className="ml-2 text-sm font-medium dark:text-white">{title}</h3>
      </div>
      {/* Check if value is an object and render accordingly */}
      <div className="flex h-28 flex-col  items-center justify-center overflow-hidden truncate  rounded-xl  bg-white dark:bg-[#0a0a0a] dark:text-white">
        <div>
          {type === 'invoices' && typeof value === 'object'
            ? Object.entries(value).map(([key, val]) => (
                <div
                  key={key}
                  className="flex justify-start text-left text-lg capitalize"
                >
                  <p className=" text-lg capitalize">{`${key}: `}</p>
                  <p className=" text-lg capitalize">{`${val}`}</p>
                </div>
              ))
            : /* Render value directly if it's not an object */
              typeof value !== 'object' && (
                <div className="text-2xl">
                  <p>{value}</p>
                </div>
              )}
        </div>
      </div>
    </div>
  );
}
