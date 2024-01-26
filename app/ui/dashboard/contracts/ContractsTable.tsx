import prisma from '@/prisma/client';
import {
  EllipsisHorizontalIcon,
  EyeIcon,
  FunnelIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import { ContractType, CustomerStatus, CustomerType } from '@prisma/client';
import DropDown from '@/app/(tools)/dropdown/DropDown';
import Link from 'next/link';
import DeleteButton from '../customers/delete-button';
import { ContractColumns } from '@/app/lib/menu';

export default async function ContractsTable({
  type,
  query,
  itemsPerPage,
  currentPage,
}: {
  type?: ContractType;
  query: string;
  itemsPerPage: number;
  currentPage: number;
}) {
  //   const invoices = await fetchFilteredInvoices(query, currentPage);

  const contracts = await prisma.contract.findMany({
    where: {
      AND: [
        {
          unit: {
            name: {
              contains: query,
              mode: 'insensitive', // Optional: makes the search case-insensitive
            },
          },
        },
        {
          customer: {
            name: {
              contains: query,
              mode: 'insensitive', // Optional: makes the search case-insensitive
            },
          },
        },
      ],
      type: type,
    },
    include: {
      unit: true,
      // ContractExtension: {
      //   orderBy: {
      //     startDate: "asc",
      //   },
      // },
      customer: true,
    },
    orderBy: {
      unit: {
        name: 'asc',
      },
      // name: 'asc',
    },
    skip: (currentPage - 1) * itemsPerPage,
    take: itemsPerPage,
  });

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                {ContractColumns.map((col) => (
                  <th
                    key={col.label}
                    scope="col"
                    className="px-4 py-5 font-medium sm:pl-6"
                  >
                    {col.label}
                  </th>
                ))}

                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {contracts?.map((contract) => (
                <tr
                  key={contract.id}
                  className="group relative w-full cursor-pointer border-b py-3 text-sm last-of-type:border-none hover:bg-slate-100 [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{contract.unit.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {contract.customer.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {contract.startDate.toDateString()}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {contract.endDate.toDateString()}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {contract.currency}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {contract.dailyAmount}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {contract.monthlyAmount}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {contract.newMonthlyAmount}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {contract.type}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {contract.isDaily.toString()}
                  </td>

                  <td className=" absolute right-0 hidden whitespace-nowrap rounded-2xl bg-white px-3 py-3 shadow-xl group-hover:flex group-hover:bg-slate-200">
                    <div className="flex items-center justify-center gap-2">
                      <DeleteButton id={contract.id} />
                      <Link
                        href={`/dashboard/customers/edit/${contract.id}`}
                        className="rounded-full border border-transparent p-2 hover:border-gray-400"
                      >
                        <PencilIcon width={18} height={18} />
                      </Link>
                      {/* <EditButton /> */}
                      <Link
                        href={`/dashboard/customers/view/${contract.id}`}
                        className="rounded-full border border-transparent p-2 hover:border-gray-400"
                      >
                        <EyeIcon width={18} height={18} />
                      </Link>
                      {/* <ViewButton id={customer.id} /> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// {customers.length > 0 &&
//     customers.map((customer) => (
//       <div key={customer.id} className="relative flex">
//         <span className="peer block w-1/6 rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500">
//           {customer.firstName}
//         </span>
//         <span className="peer block w-1/6 rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500">
//           {customer.lastName}
//         </span>
//         <span className="peer block w-1/6 rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500">
//           {customer.name}
//         </span>
//         <span className="peer block w-1/6 rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500">
//           {customer.type}
//         </span>
//         <span className="peer block w-1/6 rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500">
//           {customer.status}
//         </span>
//         <div className="peer block w-1/6 rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500"></div>
//       </div>
//     ))}
